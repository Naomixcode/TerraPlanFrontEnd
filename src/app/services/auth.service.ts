import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Asegúrate de importar el entorno

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.base}/login`; // Endpoint de login

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password });
  }

  setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  // Método para cerrar sesión
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token'); // Elimina el token del almacenamiento
    }
  }

  // Método para realizar una llamada HTTP que incluye el token
  someHttpCall(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${environment.base}/users`, { headers });
    }   
}
