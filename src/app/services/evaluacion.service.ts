import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Evaluacion } from '../models/Evaluacion';
import { Observable } from 'rxjs';

const base_url= environment.base;

@Injectable({
  providedIn: 'root'
})

export class EvaluacionService {
  private url= `${base_url}/evaluacion`

  constructor(private http:HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  list(): Observable<Evaluacion[]> {
    return this.http.get<Evaluacion[]>(this.url, { headers: this.createAuthorizationHeader() });
  }

  // Get a project by ID
  getById(id: number): Observable<Evaluacion> {
    return this.http.get<Evaluacion>(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }

  // Create a new project
  create(evaluacion: Evaluacion): Observable<any> {
    return this.http.post(this.url, evaluacion, { headers: this.createAuthorizationHeader() });
  }

  // Update an existing project
  update(evaluacion: Evaluacion): Observable<any> {
    return this.http.put(this.url, evaluacion, { headers: this.createAuthorizationHeader() });
  }

  // Delete a project
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }
}
