import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketServiciosService {

  private url = 'http://localhost:3001';
  private socket;

  constructor() {
    this.socket = io(this.url);
   }

   public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

}
