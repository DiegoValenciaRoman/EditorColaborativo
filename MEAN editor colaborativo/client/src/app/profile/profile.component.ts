import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { SocketServiciosService } from '../socket-servicios.service';
@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  details: UserDetails;

  constructor(private auth: AuthenticationService, private socketService: SocketServiciosService) {}

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
      this.auth.email = this.details.email;
    }, (err) => {
      console.error(err);
    });
  }
}
