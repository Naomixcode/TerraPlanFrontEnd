import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Usuario } from '../models/Usuario';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = `${base_url}/usuario`; // Ruta del backend para usuarios

  // BehaviorSubject para gestionar la lista de usuarios
  private usuarioListSubject = new BehaviorSubject<Usuario[]>([]); // Lista observable de usuarios
  public usuarioList$ = this.usuarioListSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Crear encabezados con autenticación
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token'); // Token almacenado
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Listar usuarios
  list(): Observable<Usuario[]> {
    return this.http
      .get<Usuario[]>(this.url, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap((usuarios) => this.usuarioListSubject.next(usuarios)) // Actualiza el BehaviorSubject
      );
  }

  // Crear usuario
  create(usuario: Usuario): Observable<any> {
    return this.http
      .post(this.url, usuario, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap(() => this.refreshUsuarioList()) // Refresca la lista después de crear
      );
  }

  // Actualizar usuario
  update(usuario: Usuario): Observable<any> {
    const url = `${this.url}/${usuario.idUsuario}`; // Incluye el ID en la URL
    return this.http.put(url, usuario, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // Eliminar usuario
  delete(id: number): Observable<any> {
    return this.http
      .delete(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() })
      .pipe(
        tap(() => this.refreshUsuarioList()) // Refresca la lista después de eliminar
      );
  }

  // Obtener un usuario por ID
  getUserById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }  

  // Establecer manualmente la lista de usuarios en el BehaviorSubject
  setUsuarioList(usuarios: Usuario[]): void {
    this.usuarioListSubject.next(usuarios);
  }

  // Refrescar la lista de usuarios
  private refreshUsuarioList(): void {
    this.list().subscribe(); // Llama a list() para actualizar el BehaviorSubject
  }

  // Obtener la lista actual desde el BehaviorSubject
  getUsuarioList(): Observable<Usuario[]> {
    return this.usuarioList$;
  }
}
