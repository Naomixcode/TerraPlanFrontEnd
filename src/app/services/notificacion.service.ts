import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Notificacion } from '../models/Notificacion';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  private url = `${base_url}/notificacion`; // Ruta del backend para notificaciones

  // BehaviorSubject para gestionar la lista de notificaciones
  private notificacionListSubject = new BehaviorSubject<Notificacion[]>([]);
  public notificacionList$ = this.notificacionListSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Crear encabezados con autenticación
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token'); // Token almacenado
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Listar notificaciones
  list(): Observable<Notificacion[]> {
    return this.http
      .get<Notificacion[]>(this.url, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap((notificaciones) => this.notificacionListSubject.next(notificaciones))
      );
  }

// Crear notificación
create(notificacion: Notificacion): Observable<any> {
    return this.http.post<any>(this.url, notificacion, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap(response => {
        console.log('Notificación creada exitosamente:', response); // Log para depuración
        this.refreshNotificacionList(); // Refresca la lista después de crear
      }),
      catchError(error => {
        console.error('Error al crear la notificación:', error); // Log de errores
        return throwError(() => new Error('No se pudo crear la notificación. Intente nuevamente.'));
      })
    );
  }
  

  // Actualizar notificación
  update(notificacion: Notificacion): Observable<any> {
    const url = `${this.url}/${notificacion.idNotificacion}`; // Incluye el ID en la URL
    return this.http.put(url, notificacion, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // Eliminar notificación
  delete(id: number): Observable<any> {
    return this.http
      .delete(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap(() => this.refreshNotificacionList()) // Refresca la lista después de eliminar
      );
  }

  // Obtener una notificación por ID
  getNotificacionById(id: number): Observable<Notificacion> {
    return this.http.get<Notificacion>(`${this.url}/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // Refrescar la lista de notificaciones
  private refreshNotificacionList(): void {
    this.list().subscribe(); // Llama a list() para actualizar el BehaviorSubject
  }

  // Obtener la lista actual desde el BehaviorSubject
  getNotificacionList(): Observable<Notificacion[]> {
    return this.notificacionList$;
  }
}
