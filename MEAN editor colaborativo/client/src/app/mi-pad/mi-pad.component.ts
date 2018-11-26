import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { SocketServiciosService } from '../socket-servicios.service'
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';

@Component({
  selector: 'app-mi-pad',
  templateUrl: './mi-pad.component.html',
  styleUrls: ['./mi-pad.component.css']
})
export class MiPadComponent implements OnInit {

  lista=false;
  ready = false;
  link='';
  link2='';
  id:any;
  participantes = [];
  editores = [];
  owner = false;
  user:any;
  salirReady = false;
  sesionInfo:any;
  message:any;
  readOnly:any;
  constructor(private route: ActivatedRoute,private auth: AuthenticationService,public sanitizer: DomSanitizer,private router: Router
  ,private socketService: SocketServiciosService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.auth.getReadOnlyID(this.id).subscribe(data=>{
      this.readOnly = data.readOnlyID;
    });
    this.auth.profile().subscribe(user=>{
      this.setUsuario(user);
      this.obtenerSesionActual();

    });
    this.socketService
      .getMessages()
      .subscribe((message:any) => {
        this.message = message;
        this.obtenerSesionActual();

      //  this.funcionPrueba(message);
      });
  }
  soyEditor(id){
    console.log(id);
    for(var i=0;i<this.editores.length;i++){
      if(this.editores[i]._id == id){
        return true;
      }
    }
    return false
  }

  obtenerSesionActual(){
    this.auth.obtenerSesion(this.id).subscribe((sesioninfo)=>{
      console.log(sesioninfo);
      this.participantes = sesioninfo.participantes;
      this.sesionInfo = sesioninfo;
      this.editores = sesioninfo.editores;
      if(this.soyEditor(this.user._id)){
        this.link2 = 'http://localhost:9001/p/'+this.id+'?showControls=false&showChat=true&userName='+encodeURIComponent(this.user.email);
      }else{
        console.log(this.readOnly);
        this.link2 = 'http://localhost:9001/p/'+this.readOnly+'?showControls=false&showChat=true&userName='+encodeURIComponent(this.user.email);
      }
      //this.socketService.conectarSala(this.sesionInfo._id);
      console.log(this.sesionInfo.editores);

      if(this.user.email == sesioninfo.email){
        this.owner = true;
        this.link2 = 'http://localhost:9001/p/'+this.id+'?showControls=false&showChat=true&userName='+encodeURIComponent(this.user.email);
      }else{
        this.owner = false;
      }
      this.salirReady = true;
      this.lista = true;
    });
  }

  salirSesion(){
    if(this.owner){
      //eliminar sesion
      this.auth.eliminarSesion(this.sesionInfo._id).subscribe((response)=>{
      console.log('se elimino sesion');
      this.router.navigateByUrl('/sesiones');
    });

    }else{
      this.auth.eliminarDeSesion(this.user._id,this.sesionInfo._id).subscribe((response)=>{
        this.sendMessage(this.sesionInfo._id);
        this.router.navigateByUrl('/sesiones');
      });
      //quitar de participantes
    }
  }

  modificarPermiso(modalidad,id_sesion,id_usuario){
    this.lista=false;
    console.log('hola');
    this.auth.modificarPermiso(modalidad,id_sesion,id_usuario,this.sesionInfo.id_pad).subscribe((response)=>{
      this.obtenerSesionActual();
      this.sendMessage({nombre:'permiso',read : response.readOnlyID,id_usuario:id_usuario});
      this.lista=true;
      console.log(response);
      if(modalidad){

      }else{

      }
      console.log('respuesta');
    });

  }

  sendPermiso(id) {
   this.socketService.sendMessage(id);
  }

  sendMessage(id) {
   this.socketService.sendMessage(id);
  }

  setUsuario(usuario){
    this.user = usuario;

    this.link2 = 'http://localhost:9001/p/'+this.readOnly+'?showControls=false&showChat=true&userName='+encodeURIComponent(usuario.email);
    this.link='http://localhost:9001/p/'+usuario.email+'?showControls=false&showChat=false&userName='+encodeURIComponent(usuario.email);
    console.log(this.link2);
    this.ready = true;
  }

}
