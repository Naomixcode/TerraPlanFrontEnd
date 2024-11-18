import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Prototipo } from '../models/Prototipo';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class PrototipoService {
  private url = `${base_url}/prototipo`; // Ruta del backend para prototipos

  // BehaviorSubject para gestionar la lista de prototipos
  private prototipoListSubject = new BehaviorSubject<Prototipo[]>([]);
  public prototipoList$ = this.prototipoListSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Crear encabezados con autenticación
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token'); // Token almacenado
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Listar prototipos
  list(): Observable<Prototipo[]> {
    return this.http
      .get<Prototipo[]>(this.url, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap((prototipos) => this.prototipoListSubject.next(prototipos))
      );
  }

  // Crear prototipo
  create(prototipo: Prototipo): Observable<any> {
    return this.http.post<any>(this.url, prototipo, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap((response) => {
        console.log('Prototipo creado exitosamente:', response);
        this.refreshPrototipoList(); // Refresca la lista después de crear
      }),
      catchError((error) => {
        console.error('Error al crear el prototipo:', error);
        return throwError(() => new Error('No se pudo crear el prototipo. Intente nuevamente.'));
      })
    );
  }

  // Actualizar prototipo
  update(prototipo: Prototipo): Observable<any> {
    const url = `${this.url}/${prototipo.idPrototipo}`; // Incluye el ID en la URL
    return this.http.put(url, prototipo, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // Eliminar prototipo
  delete(id: number): Observable<any> {
    return this.http
      .delete(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap(() => this.refreshPrototipoList()) // Refresca la lista después de eliminar
      );
  }

  // Obtener un prototipo por ID
  getPrototipoById(id: number): Observable<Prototipo> {
    return this.http.get<Prototipo>(`${this.url}/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // Refrescar la lista de prototipos
  private refreshPrototipoList(): void {
    this.list().subscribe(); // Llama a list() para actualizar el BehaviorSubject
  }

  // Obtener la lista actual desde el BehaviorSubject
  getPrototipoList(): Observable<Prototipo[]> {
    return this.prototipoList$;
  }
}
