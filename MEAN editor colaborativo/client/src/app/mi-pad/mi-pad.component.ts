import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';

@Component({
  selector: 'app-mi-pad',
  templateUrl: './mi-pad.component.html',
  styleUrls: ['./mi-pad.component.css']
})
export class MiPadComponent implements OnInit {

  ready = false;
  usuario={};
  link='';
  link2='';
  id:any;
  participantes = [];
  owner = false;
  user:any;
  salirReady = false;
  sesionInfo:any;
  constructor(private route: ActivatedRoute,private auth: AuthenticationService,public sanitizer: DomSanitizer,private router: Router ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.auth.profile().subscribe(user=>{
      this.setUsuario(user);
      this.obtenerSesionActual();
    });

  }

  obtenerSesionActual(){
    this.auth.obtenerSesion(this.id).subscribe((sesioninfo)=>{
      console.log(sesioninfo);
      this.participantes = sesioninfo.participantes;
      this.sesionInfo = sesioninfo;
      if(this.user.email == sesioninfo.email){
        this.owner = true;
      }else{
        this.owner = false;
      }
      this.salirReady = true;
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
        this.router.navigateByUrl('/sesiones');
      });
      //quitar de participantes
    }
  }

  setUsuario(usuario){
    this.user = usuario;
    this.link2 = 'http://localhost:9001/p/'+this.id+'?showControls=false';
    this.link='http://localhost:9001/p/'+usuario.email+'?showControls=false';
    console.log(this.link);
    this.ready = true;
  }

}
