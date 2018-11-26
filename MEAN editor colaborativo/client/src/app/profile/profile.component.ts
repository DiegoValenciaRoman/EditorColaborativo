import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { SocketServiciosService } from '../socket-servicios.service';
@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  details: UserDetails;
  message:string;
  messages: string[] = [];
  constructor(private auth: AuthenticationService/*,private socketService: SocketServiciosService*/) {}

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
      this.auth.email = this.details.email;
      this.auth.user = user;
    }, (err) => {
      console.error(err);
    });

  /*  this.socketService
      .getMessages()
      .subscribe((message: string) => {
        this.messages.push(message);
      });*/
  }


}
