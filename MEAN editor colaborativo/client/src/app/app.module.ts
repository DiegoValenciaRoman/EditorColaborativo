import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationService } from './authentication.service';
import { SocketServiciosService } from './socket-servicios.service';
import { AuthGuardService } from './auth-guard.service';
import { NotasComponent } from './profile/notas/notas.component';
import { RamoComponent } from './ramo/ramo.component';
import { MiPadComponent } from './mi-pad/mi-pad.component';
import { SesionesComponent } from './sesiones/sesiones.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ListaComponent } from './mi-pad/lista/lista.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path : 'ramo', component: RamoComponent, canActivate:[AuthGuardService]},
  { path : 'miPad/:id', component: MiPadComponent, canActivate:[AuthGuardService]},
  { path : 'sesiones', component: SesionesComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NotasComponent,
    RamoComponent,
    MiPadComponent,
    SesionesComponent,
    ListaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    SocketServiciosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
