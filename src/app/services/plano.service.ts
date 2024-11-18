import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Plano } from '../models/Plano';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class PlanoService {
  private url = `${base_url}/plano`; // Ruta del backend para planos

  // BehaviorSubject para gestionar la lista de planos
  private planoListSubject = new BehaviorSubject<Plano[]>([]);
  public planoList$ = this.planoListSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Crear encabezados con autenticación
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token'); // Token almacenado
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Listar planos
  list(): Observable<Plano[]> {
    return this.http
      .get<Plano[]>(this.url, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap((planos) => this.planoListSubject.next(planos)),
        catchError((error) => {
          console.error('Error al listar planos:', error);
          return throwError(() => new Error('No se pudo obtener la lista de planos.'));
        })
      );
  }

  // Crear plano
  create(plano: Plano): Observable<any> {
    return this.http.post<any>(this.url, plano, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap(() => this.refreshPlanoList()), // Refresca la lista después de crear
      catchError((error) => {
        console.error('Error al crear el plano:', error);
        return throwError(() => new Error('No se pudo crear el plano.'));
      })
    );
  }

  // Actualizar plano
  update(plano: Plano): Observable<any> {
    const url = `${this.url}/${plano.idPlano}`; // Incluye el ID en la URL
    return this.http.put(url, plano, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError((error) => {
        console.error('Error al actualizar el plano:', error);
        return throwError(() => new Error('No se pudo actualizar el plano.'));
      })
    );
  }

  // Eliminar plano
  delete(id: number): Observable<any> {
    return this.http
      .delete(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap(() => this.refreshPlanoList()), // Refresca la lista después de eliminar
        catchError((error) => {
          console.error('Error al eliminar el plano:', error);
          return throwError(() => new Error('No se pudo eliminar el plano.'));
        })
      );
  }

  // Obtener un plano por ID
  getPlanoById(id: number): Observable<Plano> {
    return this.http.get<Plano>(`${this.url}/${id}`, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError((error) => {
        console.error('Error al obtener el plano:', error);
        return throwError(() => new Error('No se pudo obtener el plano.'));
      })
    );
  }

  // Refrescar la lista de planos
  private refreshPlanoList(): void {
    this.list().subscribe(); // Llama a list() para actualizar el BehaviorSubject
  }
}
