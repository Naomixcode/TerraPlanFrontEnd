import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Proyecto } from '../models/Proyecto';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  private url = `${base_url}/proyecto`; // Ruta del backend para proyectos

  // BehaviorSubject para gestionar la lista de proyectos
  private proyectoListSubject = new BehaviorSubject<Proyecto[]>([]);
  public proyectoList$ = this.proyectoListSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Crear encabezados con autenticación
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token'); // Token almacenado
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Listar proyectos
  list(): Observable<Proyecto[]> {
    return this.http
      .get<Proyecto[]>(this.url, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap((proyectos) => this.proyectoListSubject.next(proyectos))
      );
  }

  // Crear proyecto
  create(proyecto: Proyecto): Observable<any> {
    return this.http.post<any>(this.url, proyecto, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap(response => {
        console.log('Proyecto creado exitosamente:', response);
        this.refreshProyectoList(); // Refresca la lista después de crear
      }),
      catchError(error => {
        console.error('Error al crear el proyecto:', error);
        return throwError(() => new Error('No se pudo crear el proyecto. Intente nuevamente.'));
      })
    );
  }

  // Actualizar proyecto
  update(proyecto: Proyecto): Observable<any> {
    const url = `${this.url}/${proyecto.idProyecto}`; // Incluye el ID en la URL
    return this.http.put(url, proyecto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // Eliminar proyecto
  delete(id: number): Observable<any> {
    return this.http
      .delete(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap(() => this.refreshProyectoList()) // Refresca la lista después de eliminar
      );
  }

  // Obtener un proyecto por ID
  getProyectoById(id: number): Observable<Proyecto> {
    return this.http.get<Proyecto>(`${this.url}/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // Refrescar la lista de proyectos
  private refreshProyectoList(): void {
    this.list().subscribe(); // Llama a list() para actualizar el BehaviorSubject
  }

  // Obtener la lista actual desde el BehaviorSubject
  getProyectoList(): Observable<Proyecto[]> {
    return this.proyectoList$;
  }
}
