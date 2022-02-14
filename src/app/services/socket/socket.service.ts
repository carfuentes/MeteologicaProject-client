import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io'; 
import { DataPoint } from '../../interfaces/data-point';

@Injectable({
  providedIn: 'root'
})

export class SocketService {

  constructor(private socket: Socket) { }

  getUpdates(eventName: string): Observable<DataPoint> {
    return this.socket.fromEvent(eventName);
  }
}
