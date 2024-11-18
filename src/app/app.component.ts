import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TerraPlan';
  roles: string[] = []; // Aquí se almacenan los roles del usuario
  isHomeRoute: boolean = false;

  constructor(private loginService: LoginService, public router: Router) {}

  ngOnInit(): void {
    this.roles = this.loginService.showRole();
    this.checkSession();
  }
  
  // Recuperar roles directamente desde el servicio en lugar de `sessionStorage`
  private checkSession(): void {
    if (!this.loginService.verificar()) {
      this.router.navigate(['/login']);
    } else {
      this.roles = this.loginService.showRole(); // Actualización para usar el servicio
    }
  }  

  isAdmin(): boolean {
    const isAdmin = this.roles.includes('ADMIN');
    return isAdmin;
  }
  
  isClient(): boolean {
    const isClient = this.roles.includes('CLIENTE');
    return isClient;
  }
  
  isArchitect(): boolean {
    const isArchitect = this.roles.includes('ARQUITECTO');
    return isArchitect;
  }  

  // Cerrar sesión y redirigir al login
  cerrar(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
