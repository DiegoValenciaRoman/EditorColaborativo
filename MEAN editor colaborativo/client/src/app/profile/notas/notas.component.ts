import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../authentication.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {



  notaSchema = {
    email:'',
    nota:''
  }
  notas = [];
  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }


  eliminarNota(id:string){
    this.auth.eliminarNota(id).subscribe(devuelta =>{
      console.log(devuelta);
    });
    this.verNotas();
  }

  guardarNota(){
    this.notaSchema.email = this.auth.email;
    console.log(this.notaSchema);
    this.auth.guardarNota(this.notaSchema).subscribe(() => {
    }, (err) => {
      console.error(err);
    });
  }

  verNotas(){
    this.notas = []
    console.log(this.auth.email);
    this.auth.obtenerNotas(this.auth.email).subscribe(notas=>{
      notas.forEach(nota => {
          console.log(nota.email + ' ' + nota.nota + ' ' +nota._id);
          this.notas.push(nota);
      });
      console.log(this.notas);
    });
  }

}
