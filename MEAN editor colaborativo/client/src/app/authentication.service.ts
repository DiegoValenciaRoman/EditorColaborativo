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

  //nuevos metodos 2.0 lets go baby
  public registrarPad_usuarioNuevo(){


  }


}
