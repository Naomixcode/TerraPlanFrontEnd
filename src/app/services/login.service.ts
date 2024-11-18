import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(request: JwtRequest) {
    return this.http.post('http://localhost:8082/login', request);
  }

  verificar(): boolean {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      let token = sessionStorage.getItem('token');
      return token != null;
    }
    return false;
  }

  showRole(): string[] {
    const knownRoles = ['ADMIN', 'CLIENTE', 'ARQUITECTO']; // Roles conocidos
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const token = sessionStorage.getItem('token');
      if (!token) {
        return [];
      }
  
      try {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token);
  
        if (!decodedToken || !decodedToken.role) {
          return [];
        }
    
        // Procesar roles concatenados
        const rolesConcatenados = decodedToken.role;
        const roles = knownRoles.filter(role => rolesConcatenados.includes(role));
  
        return roles;
      } catch (error) {
        return [];
      }
    }
    return [];
  }  
}
