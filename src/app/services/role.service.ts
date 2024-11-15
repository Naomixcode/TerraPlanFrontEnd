import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from '../models/Role'; // Asegúrate de que la ruta sea correcta
import { environment } from '../../environments/environment'; // Cambia la ruta si es necesario

const base_url = environment.base; // Asumiendo que tienes un archivo de entorno que define la base_url

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private url = `${base_url}/rol`; // URL de tu API para los roles

  constructor(private http: HttpClient) {}
 
  // Crear un encabezado con el token de autenticación
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token'); // Suponiendo que guardas el token en localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  list(): Observable<Role[]> {
    return this.http.get<Role[]>(this.url, { headers: this.createAuthorizationHeader() }).pipe(
      tap(data => console.log('Roles obtenidos:', data)) // Agregar este log para ver la respuesta
    );
  }  
  // Registrar un role
  create(role: Role): Observable<any> {
    return this.http.post(this.url, role, { headers: this.createAuthorizationHeader() });
  }

  // Actualizar un role
  update(role: Role): Observable<any> {
    return this.http.put(this.url, role, { headers: this.createAuthorizationHeader() });
  }

  // Eliminar un role
  delete(id: number): Observable<any> {
    console.log('Eliminando rol en:', `${this.url}/${id}`);
    return this.http.delete(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }

  // Obtener un rol por ID
  getById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }
}
