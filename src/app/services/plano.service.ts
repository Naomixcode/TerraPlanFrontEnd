import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Plano } from '../models/Plano';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class PlanoService {
  private url = `${base_url}/plano`;

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
  list(): Observable<Plano[]> {
    return this.http.get<Plano[]>(this.url, { headers: this.createAuthorizationHeader() });
  }

  // Get a project by ID
  getById(id: number): Observable<Plano> {
    return this.http.get<Plano>(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }

  // Create a new project
  create(plano: Plano): Observable<any> {
    return this.http.post(this.url, plano, { headers: this.createAuthorizationHeader() });
  }

  // Update an existing project
  update(plano: Plano): Observable<any> {
    return this.http.put(this.url, plano, { headers: this.createAuthorizationHeader() });
  }

  // Delete a project
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }
}
