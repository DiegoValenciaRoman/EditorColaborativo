import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { FormGroup, FormControl,ReactiveFormsModule} from '@angular/forms';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.component.html',
  styleUrls: ['./sesiones.component.css']
})



export class SesionesComponent implements OnInit {
  sesionForm= new FormGroup({
  id_sesion: new FormControl(''),
  nombre_sesion: new FormControl(''),
  privacidad: new FormControl('')
  });
  usuario:any;
  filtersLoaded: Promise<boolean>;
  body1 = true;
  resultado: string;
  canAccessSesion = false;
  sesiones = [];
  tuSesion = [];
  constructor(private auth: AuthenticationService,private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
    this.auth.profile().subscribe(user=>{
      console.log(user);
      this.usuario = user;
      this.filtersLoaded = Promise.resolve(true);
      this.auth.sesionOwnerOrPart(this.usuario.email,this.usuario._id).subscribe(response=>{
        console.log(response);
        if(response.length == 0){
          console.log(' no participate ni en mierda');
          this.canAccessSesion = true;
        }else{
          this.tuSesion = response;
          this.canAccessSesion = false;
        }
      });

      this.obtenerSesiones();

    });

  }

  obtenerSesiones(){
    this.auth.obtenerSesiones().subscribe(sesiones=>{
      console.log(sesiones);
      this.sesiones = sesiones;
    });
  }

  modalToggle(){
    this.body1 = true;
    this.resultado='';
  }

  entrarSesion(primeravez,sesion){
    console.log(primeravez,sesion);
  }

  crearSesion(){
    console.log(this.sesionForm.value);
    var sesion = {
      id_sesion:this.sesionForm.value.id_sesion,
      nombre_sesion:this.sesionForm.value.nombre_sesion,
      email:this.usuario.email,
      privacidad:this.sesionForm.value.privacidad,
      editores:[],
      participantes:[this.usuario._id],
      id_pad:''
    };
    console.log(sesion);
    console.log('ahora se creara la sesion');
    this.auth.crearSesion(sesion).subscribe((bien) => {
      this.resultado = JSON.stringify(bien);
      this.body1 = false;
      this.obtenerSesiones();
      //this.router.navigateByUrl('/miPad');
    });
  }

}
