import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Rol } from '../models/Rol';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private url = `${base_url}/rol`; // Ruta del backend para roles

  // BehaviorSubject para gestionar la lista de roles
  private rolListSubject = new BehaviorSubject<Rol[]>([]); // Lista observable de roles
  public rolList$ = this.rolListSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Crear encabezados con autenticación
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token'); // Token almacenado
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Listar roles
  list(): Observable<Rol[]> {
    return this.http
      .get<Rol[]>(this.url, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap((roles) => this.rolListSubject.next(roles)) // Actualiza el BehaviorSubject
      );
  }

  // Crear rol
  create(rol: Rol): Observable<any> {
    return this.http
      .post(this.url, rol, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap(() => this.refreshRolList()) // Refresca la lista después de crear
      );
  }

  // Actualizar rol
  update(rol: Rol): Observable<any> {
    return this.http
      .put(this.url, rol, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap(() => this.refreshRolList()) // Refresca la lista después de actualizar
      );
  }

  // Eliminar rol
  delete(id: number): Observable<any> {
    return this.http
      .delete(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap(() => this.refreshRolList()) // Refresca la lista después de eliminar
      );
  }

  // Establecer manualmente la lista de roles en el BehaviorSubject
  setRolList(roles: Rol[]): void {
    this.rolListSubject.next(roles);
  }

  // Refrescar la lista de roles
  private refreshRolList(): void {
    this.list().subscribe(); // Llama a list() para actualizar el BehaviorSubject
  }

  // Obtener la lista actual desde el BehaviorSubject
  getRolList(): Observable<Rol[]> {
    return this.rolList$;
  }
}
