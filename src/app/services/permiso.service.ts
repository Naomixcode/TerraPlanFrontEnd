import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Permiso } from '../models/Permiso';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class PermisoService {
  private url = `${base_url}/permiso`; // Ruta del backend para permisos

  // BehaviorSubject para gestionar la lista de permisos
  private permisoListSubject = new BehaviorSubject<Permiso[]>([]);
  public permisoList$ = this.permisoListSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Crear encabezados con autenticación
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token'); // Token almacenado
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Listar permisos
  list(): Observable<Permiso[]> {
    return this.http
      .get<Permiso[]>(this.url, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap((permisos) => this.permisoListSubject.next(permisos))
      );
  }

  // Crear permiso
  create(permiso: Permiso): Observable<any> {
    return this.http.post<any>(this.url, permiso, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap(response => {
        console.log('Permiso creado exitosamente:', response);
        this.refreshPermisoList(); // Refresca la lista después de crear
      }),
      catchError(error => {
        console.error('Error al crear el permiso:', error);
        return throwError(() => new Error('No se pudo crear el permiso. Intente nuevamente.'));
      })
    );
  }

  // Actualizar permiso
  update(permiso: Permiso): Observable<any> {
    const url = `${this.url}/${permiso.idPermiso}`; // Incluye el ID en la URL
    return this.http.put(url, permiso, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // Eliminar permiso
  delete(id: number): Observable<any> {
    return this.http
      .delete(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap(() => this.refreshPermisoList()) // Refresca la lista después de eliminar
      );
  }

  // Obtener un permiso por ID
  getPermisoById(id: number): Observable<Permiso> {
    return this.http.get<Permiso>(`${this.url}/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // Refrescar la lista de permisos
  private refreshPermisoList(): void {
    this.list().subscribe(); // Llama a list() para actualizar el BehaviorSubject
  }

  // Obtener la lista actual desde el BehaviorSubject
  getPermisoList(): Observable<Permiso[]> {
    return this.permisoList$;
  }
}
