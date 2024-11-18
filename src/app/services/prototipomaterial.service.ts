import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PrototipoMaterial } from '../models/PrototipoMaterial';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class PrototipoMaterialService {
  private url = `${base_url}/prototipos-material`; // Ruta del backend para PrototipoMaterial

  private prototipoMaterialListSubject = new BehaviorSubject<PrototipoMaterial[]>([]);
  public prototipoMaterialList$ = this.prototipoMaterialListSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Crear encabezados con autenticación
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Listar PrototipoMaterial
  list(): Observable<PrototipoMaterial[]> {
    return this.http
      .get<PrototipoMaterial[]>(this.url, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap((prototipoMaterials) => this.prototipoMaterialListSubject.next(prototipoMaterials))
      );
  }

  // Crear PrototipoMaterial
  create(prototipoMaterial: PrototipoMaterial): Observable<any> {
    return this.http.post<any>(this.url, prototipoMaterial, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap(() => this.refreshPrototipoMaterialList()),
      catchError((error) => {
        console.error('Error al crear el PrototipoMaterial:', error);
        return throwError(() => new Error('No se pudo crear el PrototipoMaterial. Intente nuevamente.'));
      })
    );
  }

  // Actualizar PrototipoMaterial
  update(prototipoMaterial: PrototipoMaterial): Observable<any> {
    const url = `${this.url}/${prototipoMaterial.idPrototipoMaterial}`;
    return this.http.put(url, prototipoMaterial, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // Eliminar PrototipoMaterial
  delete(id: number): Observable<any> {
    return this.http
      .delete(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap(() => this.refreshPrototipoMaterialList())
      );
  }

  // Obtener un PrototipoMaterial por ID
  getPrototipoMaterialById(id: number): Observable<PrototipoMaterial> {
    return this.http.get<PrototipoMaterial>(`${this.url}/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // Refrescar la lista de PrototipoMaterial
  private refreshPrototipoMaterialList(): void {
    this.list().subscribe();
  }
}
