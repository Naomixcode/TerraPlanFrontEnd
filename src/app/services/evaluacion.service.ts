import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Evaluacion } from '../models/Evaluacion';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class EvaluacionService {
  private url = `${base_url}/evaluacion`; // Ruta del backend para evaluaciones

  // BehaviorSubject para gestionar la lista de evaluaciones
  private evaluacionListSubject = new BehaviorSubject<Evaluacion[]>([]);
  public evaluacionList$ = this.evaluacionListSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Crear encabezados con autenticación
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token'); // Token almacenado
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Listar evaluaciones
  list(): Observable<Evaluacion[]> {
    return this.http
      .get<Evaluacion[]>(this.url, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap((evaluaciones) => this.evaluacionListSubject.next(evaluaciones))
      );
  }

  // Crear evaluación
  create(evaluacion: Evaluacion): Observable<any> {
    return this.http.post<any>(this.url, evaluacion, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((response) => {
        console.log('Evaluación creada exitosamente:', response);
        this.refreshEvaluacionList(); // Refresca la lista después de crear
      }),
      catchError((error) => {
        console.error('Error al crear la evaluación:', error);
        return throwError(() => new Error('No se pudo crear la evaluación. Intente nuevamente.'));
      })
    );
  }

  // Actualizar evaluación
  update(evaluacion: Evaluacion): Observable<any> {
    const url = `${this.url}/${evaluacion.idEvaluacion}`; // Incluye el ID en la URL
    return this.http.put(url, evaluacion, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // Eliminar evaluación
  delete(id: number): Observable<any> {
    return this.http
      .delete(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap(() => this.refreshEvaluacionList()) // Refresca la lista después de eliminar
      );
  }

  // Obtener una evaluación por ID
  getEvaluacionById(id: number): Observable<Evaluacion> {
    return this.http.get<Evaluacion>(`${this.url}/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // Refrescar la lista de evaluaciones
  private refreshEvaluacionList(): void {
    this.list().subscribe(); // Llama a list() para actualizar el BehaviorSubject
  }

  // Obtener la lista actual desde el BehaviorSubject
  getEvaluacionList(): Observable<Evaluacion[]> {
    return this.evaluacionList$;
  }
}
