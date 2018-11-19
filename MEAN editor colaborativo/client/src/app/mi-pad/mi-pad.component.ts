import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private route: ActivatedRoute,private auth: AuthenticationService,public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.auth.profile().subscribe(user=>{
      this.setUsuario(user);
    });

  }

  setUsuario(usuario){
    this.link2 = 'http://localhost:9001/p/'+this.id+'?showControls=false';
    this.link='http://localhost:9001/p/'+usuario.email+'?showControls=false';
    console.log(this.link);
    this.ready = true;
  }

}
