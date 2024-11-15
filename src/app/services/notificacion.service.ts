import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Notificacion } from '../models/Notificacion';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  private url = `${base_url}/notificacion`;
  private listaCambio = new Subject<Notificacion[]>();

  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  
  list() {
    return this.http.get<Notificacion[]>(this.url, { headers: this.createAuthorizationHeader() });
  }
  insert(de: Notificacion) {
    return this.http.post(this.url, de,{ headers: this.createAuthorizationHeader() });
  }
  //get y set

  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Notificacion[]) {
    this.listaCambio.next(listaNueva);
  }
}