import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PrototipoMaterial } from '../models/PrototipoMaterial';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class PrototipomaterialService {
  private url = `${base_url}/prototipo_material`;
  private listaCambio = new Subject<PrototipoMaterial[]>();

  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  list() {
    return this.http.get<PrototipoMaterial[]>(this.url, { headers: this.createAuthorizationHeader() });
  }
  insert(de: PrototipoMaterial) {
    return this.http.post(this.url, de, { headers: this.createAuthorizationHeader() });
  }
  //get y set

  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: PrototipoMaterial[]) {
    this.listaCambio.next(listaNueva);
  }
}
