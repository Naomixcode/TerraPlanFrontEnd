import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comentario } from '../models/Comentario';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private url = `${base_url}/comentario`;

  constructor(private http: HttpClient) {}

  // Create authorization header with token
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // List all projects
  list(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.url, { headers: this.createAuthorizationHeader() });
  }

  // Get a project by ID
  getById(id: number): Observable<Comentario> {
    return this.http.get<Comentario>(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }

  // Create a new project
  create(terreno: Comentario): Observable<any> {
    return this.http.post(this.url, terreno, { headers: this.createAuthorizationHeader() });
  }

  // Update an existing project
  update(terreno: Comentario): Observable<any> {
    return this.http.put(this.url, terreno, { headers: this.createAuthorizationHeader() });
  }

  // Delete a project
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }
}
