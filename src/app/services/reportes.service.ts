import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { ComentarioCountDTO } from '../models/ComentarioCountDTO';
import { ProyectoCountDTO } from '../models/ProyectoCountDTO';
import { ProyectosCountByEstado } from '../models/ProyectosCountByEstado';
import { TerrenoCountByProyectoDTO } from '../models/TerrenoCountByProyectoDTO'; // Nuevo modelo

@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  private apiBaseUrl = 'http://localhost:8082'; // URL base del backend

  constructor(private http: HttpClient) {}

  // Obtener la lista de usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiBaseUrl}/usuario`);
  }

  // Obtener los comentarios por usuario
  getComentariosPorUsuario(userId: number): Observable<ComentarioCountDTO[]> {
    return this.http.get<ComentarioCountDTO[]>(`${this.apiBaseUrl}/comentario/contar-por-usuario/${userId}`);
  }

  // Obtener los proyectos por usuario
  getProyectosPorUsuario(userId: number): Observable<ProyectoCountDTO[]> {
    return this.http.get<ProyectoCountDTO[]>(`${this.apiBaseUrl}/proyecto/contar-por-usuario/${userId}`);
  }

  // Obtener la cantidad de proyectos por estado
  getProyectosPorEstado(): Observable<ProyectosCountByEstado[]> {
    return this.http.get<ProyectosCountByEstado[]>(`${this.apiBaseUrl}/proyecto/contar_proyectos_estado`);
  }

  // Obtener terrenos por proyecto
  getTerrenosPorProyecto(): Observable<TerrenoCountByProyectoDTO[]> {
    return this.http.get<TerrenoCountByProyectoDTO[]>(`${this.apiBaseUrl}/proyecto/terrenos_proyectos`);
  }
}
