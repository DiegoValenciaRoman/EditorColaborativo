import { Directive,Renderer2,ElementRef,ViewChild, Component, OnInit,ChangeDetectorRef} from '@angular/core';
import {FormBuilder,Validators } from '@angular/forms';
import { AuthenticationService, UserDetails } from '../authentication.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-carpeta',
  templateUrl: './carpeta.component.html',
  styleUrls: ['./carpeta.component.css']
})

export class CarpetaComponent implements OnInit {

  busqueda:string='';
  listo=false;
  formGroup = this.fb.group({
    file: [null, Validators.required]
  });
  user;
  url = '';
  filename='';
  result:any;
  date:any;
  archivos:any;
  array_carpetas:any;
  array_archivos:any;
  //variable donde se deja el archivo seleccionado
  actual;
  //variable donde se deja el texto decodificado del archivo para luego ser mostrado en el modal
  modalText;
  filtersLoaded: Promise<boolean>;

  constructor(private sanitizer:DomSanitizer,private fb: FormBuilder,private cd: ChangeDetectorRef,private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.user=user;
      this.auth.email = user.email;
      this.auth.user = user;
      this.obtenerCarpeta(this.user.email);
      this.filtersLoaded = Promise.resolve(true);
    }, (err) => {
      console.error(err);
    });
  }


  buscar(){
    console.log(this.busqueda);
    this.auth.darPermisoCarpeta({email_owner:this.user.email,email_permiso:this.busqueda}).subscribe((respuesta)=>{
      console.log(respuesta);
    });
  }

  guardarArchivo(){
    this.auth.guardarArchivo({email:this.user.email,nombre_archivo:this.filename,file:this.result,modificacion:this.date}).subscribe((respuesta)=>{
      console.log(respuesta);
      this.obtenerCarpeta(this.user.email);
    });

  }

  mostrarArchivo(archivo){
    console.log(archivo);
    console.log( String.fromCharCode(...archivo.data.data));
    this.actual = archivo;
    var oMyBlob = new Blob([String.fromCharCode(...archivo.data.data)], {type : 'text/plain'}); // the blob
    this.url = URL.createObjectURL(oMyBlob);
    this.modalText = String.fromCharCode(...archivo.data.data);
    this.listo=true;
  }

  mostrarArchivos(i){
    this.array_archivos = this.array_carpetas[i].archivos;
    console.log(this.array_archivos);
  }

  obtenerCarpeta(email){
    this.auth.obtenerCarpeta(email).subscribe((respuesta)=>{
      console.log(respuesta);
      this.array_carpetas = respuesta;
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    let reader2 = new FileReader();


    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader2.readAsBinaryString(file);
      /*reader.onload = () => {
        console.log(reader.result);
        this.formGroup.patchValue({
          file: reader.result
        });
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };*/

      reader2.onload = () =>{
        var codificado = btoa(reader2.result);
        var rightNow = new Date();
        console.log(typeof reader2.result);
        console.log(atob(codificado));
        console.log(file.name);
        //variables que se mandaran
        this.filename = file.name;
        this.result = reader2.result;
        this.date = rightNow.toISOString().replace(/T/g," Hora: " );
        console.log(this.date);
        //--------------
        this.formGroup.patchValue({
          file: reader2.result
        });
        var oMyBlob = new Blob([reader2.result], {type : 'text/plain'}); // the blob
        this.url = URL.createObjectURL(oMyBlob);
        this.cd.markForCheck();

      }
    }
  }



}
