import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Material } from '../models/Material';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  private url = `${base_url}/material`; // Ruta del backend para Material

  private materialListSubject = new BehaviorSubject<Material[]>([]);
  public materialList$ = this.materialListSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Crear encabezados con autenticación
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Listar Material
  list(): Observable<Material[]> {
    return this.http
      .get<Material[]>(this.url, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap((materials) => this.materialListSubject.next(materials))
      );
  }

  // Crear Material
  create(material: Material): Observable<any> {
    return this.http.post<any>(this.url, material, {
      headers: this.createAuthorizationHeader(),
    }).pipe(
      tap(() => this.refreshMaterialList()),
      catchError((error) => {
        console.error('Error al crear el Material:', error);
        return throwError(() => new Error('No se pudo crear el Material. Intente nuevamente.'));
      })
    );
  }

  // Actualizar Material
  update(material: Material): Observable<any> {
    const url = `${this.url}/${material.idMaterial}`;
    return this.http.put(url, material, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // Eliminar Material
  delete(id: number): Observable<any> {
    return this.http
      .delete(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap(() => this.refreshMaterialList())
      );
  }

  // Obtener un Material por ID
  getMaterialById(id: number): Observable<Material> {
    return this.http.get<Material>(`${this.url}/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // Refrescar la lista de Material
  private refreshMaterialList(): void {
    this.list().subscribe();
  }
}
