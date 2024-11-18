import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Comentario } from '../models/Comentario';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private url = `${base_url}/comentario`; // Ruta del backend para comentarios

  // BehaviorSubject para gestionar la lista de comentarios
  private comentarioListSubject = new BehaviorSubject<Comentario[]>([]);
  public comentarioList$ = this.comentarioListSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Crear encabezados con autenticación
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token'); // Token almacenado
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Listar comentarios
  list(): Observable<Comentario[]> {
    return this.http
      .get<Comentario[]>(this.url, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap((comentarios) => this.comentarioListSubject.next(comentarios))
      );
  }

  // Crear comentario
  create(comentario: Comentario): Observable<any> {
    return this.http.post<any>(this.url, comentario, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap(response => {
        console.log('Comentario creado exitosamente:', response);
        this.refreshComentarioList(); // Refresca la lista después de crear
      }),
      catchError(error => {
        console.error('Error al crear el comentario:', error);
        return throwError(() => new Error('No se pudo crear el comentario. Intente nuevamente.'));
      })
    );
  }

  // Actualizar comentario
  update(comentario: Comentario): Observable<any> {
    const url = `${this.url}/${comentario.idComentario}`; // Incluye el ID en la URL
    return this.http.put(url, comentario, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // Eliminar comentario
  delete(id: number): Observable<any> {
    return this.http
      .delete(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap(() => this.refreshComentarioList()) // Refresca la lista después de eliminar
      );
  }

  // Obtener un comentario por ID
  getComentarioById(id: number): Observable<Comentario> {
    return this.http.get<Comentario>(`${this.url}/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // Refrescar la lista de comentarios
  private refreshComentarioList(): void {
    this.list().subscribe(); // Llama a list() para actualizar el BehaviorSubject
  }

  // Obtener la lista actual desde el BehaviorSubject
  getComentarioList(): Observable<Comentario[]> {
    return this.comentarioList$;
  }
}
