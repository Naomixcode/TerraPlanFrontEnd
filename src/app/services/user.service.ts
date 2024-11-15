import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { environment } from '../../environments/environment';  // Asegúrate de que la ruta sea correcta
import { Observable } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${base_url}/usuario`;  // Ruta del backend para los usuarios

  constructor(private http: HttpClient) {}

  // Crear un encabezado con el token de autenticación
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token'); // Suponiendo que guardas el token en localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Listar todos los usuarios
  list(): Observable<User[]> {
    return this.http.get<User[]>(this.url, { headers: this.createAuthorizationHeader() });
  }

  // Registrar un usuario
  create(user: User): Observable<any> {
    return this.http.post(this.url, user, { headers: this.createAuthorizationHeader() });
  }

  // Actualizar un usuario
  update(user: User): Observable<any> {
    return this.http.put(this.url, user, { headers: this.createAuthorizationHeader() });
  }

  // Eliminar un usuario
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }

  // Obtener un usuario por ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }
}
