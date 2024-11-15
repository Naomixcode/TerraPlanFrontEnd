import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Prototipo } from '../models/Prototipo';
import { Observable } from 'rxjs';

const base_url= environment.base;
@Injectable({
  providedIn: 'root'
})
export class PrototipoService {
  private url= `${base_url}/prototipo`
  constructor(private http:HttpClient) { }
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  list(): Observable<Prototipo[]> {
    return this.http.get<Prototipo[]>(this.url, { headers: this.createAuthorizationHeader() });
  }

  // Get a project by ID
  getById(id: number): Observable<Prototipo> {
    return this.http.get<Prototipo>(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }

  // Create a new project
  create(prototipo: Prototipo): Observable<any> {
    return this.http.post(this.url, prototipo, { headers: this.createAuthorizationHeader() });
  }

  // Update an existing project
  update(prototipo: Prototipo): Observable<any> {
    return this.http.put(this.url, prototipo, { headers: this.createAuthorizationHeader() });
  }

  // Delete a project
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }
}
