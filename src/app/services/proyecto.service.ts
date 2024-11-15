import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Proyecto } from '../models/Proyecto';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ProyectoporEstadoDTO } from '../models/ProyectoporEstadoDTO';
import { TerrenoporProyectoDTO } from '../models/TerrenoporproyectoDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  private url = `${base_url}/proyecto`;

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
  list(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.url, { headers: this.createAuthorizationHeader() });
  }

  // Get a project by ID
  getById(id: number): Observable<Proyecto> {
    return this.http.get<Proyecto>(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }

  // Create a new project
  create(proyecto: Proyecto): Observable<any> {
    return this.http.post(this.url, proyecto, { headers: this.createAuthorizationHeader() });
  }

  // Update an existing project
  update(proyecto: Proyecto): Observable<any> {
    return this.http.put(this.url, proyecto, { headers: this.createAuthorizationHeader() });
  }

  // Delete a project
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }
  
  getProyectosporEstado(estadoProyecto: string): Observable<ProyectoporEstadoDTO[]> {
    return this.http.get<ProyectoporEstadoDTO[]>(`${this.url}/listar_proyectos_estado/${estadoProyecto}`, { headers: this.createAuthorizationHeader() });
  }

  getTerrenosporProyecto(idProyecto: number): Observable<TerrenoporProyectoDTO[]> {
    return this.http.get<TerrenoporProyectoDTO[]>(`${this.url}/terrenos_por_proyecto/${idProyecto}`, { headers: this.createAuthorizationHeader() });
  }
  

  
}
