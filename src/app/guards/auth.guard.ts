import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        return true; // Permitir acceso
      }
    }
    this.router.navigate(['/login']);
    return false; // Bloquear acceso
  }  
}
