import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Permiso } from '../models/Permiso';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class PermisoService {
  private url = `${base_url}/permiso`;
  private listaCambio = new Subject<Permiso[]>();

  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  list() {
    return this.http.get<Permiso[]>(this.url, { headers: this.createAuthorizationHeader() });
  }
  insert(de: Permiso) {
    return this.http.post(this.url, de, { headers: this.createAuthorizationHeader() });
  }
  //get y set

  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Permiso[]) {
    this.listaCambio.next(listaNueva);
  }
}