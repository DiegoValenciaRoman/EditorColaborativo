import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,ReactiveFormsModule} from '@angular/forms';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.component.html',
  styleUrls: ['./sesiones.component.css']
})
export class SesionesComponent implements OnInit {

  sesiones = [];
  sesionForm= new FormGroup({
  id_sesion: new FormControl(''),
  nombre_sesion: new FormControl(''),
  privacidad: new FormControl('')
  });
  usuario = {}
  filtersLoaded: Promise<boolean>;
  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.profile().subscribe(user=>{
      console.log(user);
      this.usuario = user;
      this.filtersLoaded = Promise.resolve(true)
    });
  }

  obtenerSesiones(){

  }

  crearSesion(){
    console.log(this.sesionForm.value);
    var sesion = {
      id_sesion:this.sesionForm.value.id_sesion,
      nombre_sesion:this.sesionForm.value.nombre_sesion,
      email:this.usuario.email,
      privacidad:this.sesionForm.value.privacidad,
      editores:[],
      participantes:[],
      id_pad:''
    };
    console.log(sesion);
  }

}
