import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Terreno } from '../models/Terreno';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class TerrenoService {
  private url = `${base_url}/terreno`; // Ruta del backend para terrenos

  private terrenoListSubject = new BehaviorSubject<Terreno[]>([]);
  public terrenoList$ = this.terrenoListSubject.asObservable();

  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token'); // Token almacenado
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Listar terrenos
  list(): Observable<Terreno[]> {
    return this.http.get<Terreno[]>(this.url, { headers: this.createAuthorizationHeader() }).pipe(
      tap((terrenos) => this.terrenoListSubject.next(terrenos)),
      catchError((error) => {
        console.error('Error al listar terrenos:', error);
        return throwError(() => new Error('No se pudo listar los terrenos.'));
      })
    );
  }

  // Crear terreno
  create(terreno: Terreno): Observable<any> {
    return this.http.post<any>(this.url, terreno, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap(() => this.refreshTerrenoList()),
      catchError((error) => {
        console.error('Error al crear el terreno:', error);
        return throwError(() => new Error('No se pudo crear el terreno.'));
      })
    );
  }

  // Actualizar terreno
  update(terreno: Terreno): Observable<any> {
    const url = `${this.url}/${terreno.idTerreno}`;
    return this.http.put(url, terreno, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      catchError((error) => {
        console.error('Error al actualizar el terreno:', error);
        return throwError(() => new Error('No se pudo actualizar el terreno.'));
      })
    );
  }

  // Eliminar terreno
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() }).pipe(
      tap(() => this.refreshTerrenoList()),
      catchError((error) => {
        console.error('Error al eliminar el terreno:', error);
        return throwError(() => new Error('No se pudo eliminar el terreno.'));
      })
    );
  }

  // Obtener terreno por ID
  getTerrenoById(id: number): Observable<Terreno> {
    return this.http.get<Terreno>(`${this.url}/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // Refrescar lista de terrenos
  private refreshTerrenoList(): void {
    this.list().subscribe();
  }

  // Obtener cantidad de terrenos por ubicación
  getTerrenosPorDepartamento(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/terrenos_departamento`, {
      headers: this.createAuthorizationHeader(),
    });
  }
}
