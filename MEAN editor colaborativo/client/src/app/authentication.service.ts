import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import {URLSearchParams} from '@angular/http';

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}
export interface email {
  email: string;
}

@Injectable()
export class AuthenticationService {
  private token: string;
  email:string;
  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`http://localhost:3000/api/${type}`, user);
    } else {
      base = this.http.get(`http://localhost:3000/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public guardarNota(nota){
    let base;
    console.log(nota);
    base = this.http.post(`http://localhost:3000/api/guardarNota`, nota);
    const request = base.pipe(
      map((data) => {
        console.log(data);
        return data;
      })
    );
    return request;
  }

  public obtenerNotas(nota){
    let base;
    var notaq = {email : nota} ;
    base = this.http.post(`http://localhost:3000/api/nota`, notaq);
    const request = base.pipe(
      map((data) => {
        console.log(data);
        return data;
      })
    );
    return request;
  }

  public eliminarNota(id){
    let base;
    var idjson = { notaid : id };
    base = this.http.post(`http://localhost:3000/api/eliminarNota`,idjson);
    const request = base.pipe(
      map((data) => {
        console.log(data);
        return data;
      })
    );
    return request;
  }

  public crearSesion(sesionInfo){
    let base;
    base = this.http.post(`http://localhost:3000/api/crearSesion`, sesionInfo);
    const request = base.pipe(
      map((data) => {
        console.log(data+' se realizo la peticion');
        return data;
      })
    );
    return request;

  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  public logout(): void {
    this.token = '';
    this.email = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  public agregarUsuarioSesion(id_sesion,id_usuario){
    let base;
    var objeto = {id_sesion:id_sesion,id_usuario:id_usuario};
    base = this.http.post(`http://localhost:3000/api/entrarSesion`, objeto);
    const request = base.pipe(
      map((data) => {
        return data;
      })
    );
    return request;

  }

  public sesionOwnerOrPart(email,id){
    let base;
    var userinfo = {id:id,email:email};
    base = this.http.post(`http://localhost:3000/api/sesionOwnerOrPart`, userinfo);
    const request = base.pipe(
      map((data) => {
        console.log(data+' se realizo la peticion');
        return data;
      })
    );
    return request;

  }


  public obtenerSesion(id){
    let base;
    base = this.http.post(`http://localhost:3000/api/obtenerSesion`, {id_sesion:id});
    const request = base.pipe(
      map((data) => {
        return data;
      })
    );
    return request;
  }

  public eliminarDeSesion(id_user,id_sesion){
    var objeto = {
      id_user : id_user,
      id_sesion : id_sesion
    }
    let base;
    base = this.http.post(`http://localhost:3000/api/eliminarDeSesion`, objeto);
    const request = base.pipe(
      map((data) => {
        return data;
      })
    );
    return request;

  }

  public eliminarSesion(id){
    let base;
    base = this.http.post(`http://localhost:3000/api/eliminarSesion`, {id_sesion:id});
    const request = base.pipe(
      map((data) => {
        return data;
      })
    );
    return request;
  }

  public obtenerSesiones(){
    console.log('se llama al a funcion');
    let base;
    base = this.http.post(`http://localhost:3000/api/obtenerSesiones`, {});
    const request = base.pipe(
      map((data) => {
        console.log('se pidieron las sesiones y se devolvio' + data);
        return data;
      })
    );
    return request;
  }


}
