import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  selector: 'app-ramo',
  templateUrl: './ramo.component.html',
  styleUrls: ['./ramo.component.css']
})
export class RamoComponent implements OnInit {
  details: UserDetails;
  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
      this.auth.email = this.details.email;
    }, (err) => {
      console.error(err);
    });
  }


}
