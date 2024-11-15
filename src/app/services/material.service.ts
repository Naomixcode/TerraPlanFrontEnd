import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Material } from '../models/Material';
import { Subject } from 'rxjs';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private url = `${base_url}/material`;
  private listaCambio = new Subject<Material[]>();

  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  list() {
    return this.http.get<Material[]>(this.url, { headers: this.createAuthorizationHeader() });
  }

  insert(ma: Material) {
    return this.http.post(this.url, ma, { headers: this.createAuthorizationHeader() });
  }

  //get y set
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Material[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }

  listId(id: number) {
    return this.http.get<Material>(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }

  update(m: Material) {
    return this.http.put(this.url, m, { headers: this.createAuthorizationHeader() });
  }
}
