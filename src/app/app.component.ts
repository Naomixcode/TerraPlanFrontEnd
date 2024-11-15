import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatButton,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TerraPlanFrontEnd';
  showNavbar: boolean = true;
  showUserMenu: boolean = false;
  showRoleMenu: boolean = false;
  showProyectoMenu: boolean = false;
  showPlanoMenu: boolean = false;
  showPermisoMenu: boolean = false;
  showNotificacionMenu: boolean = false;
  showMaterialMenu: boolean =false;
  showEvaluacionesoMenu: boolean = false;
  showPrototiposMenu: boolean = false;
  showReportesMenu: boolean = false;
  showComentarioMenu: boolean = false;
  

   // Nueva propiedad para el menú de Planos

  constructor(private authService: AuthService, private router: Router) {
    // Suscribirse a los eventos de navegación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = event.url !== '/login';
      }
    });
  }

  onLogout() {
    this.authService.logout();
    console.log('Usuario ha salido');
    this.router.navigate(['/login']);
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
    if (this.showUserMenu) {
      this.showRoleMenu = false;
      this.showProyectoMenu = false;
      this.showPlanoMenu = false;
    }
  }

  toggleRoleMenu() {
    this.showRoleMenu = !this.showRoleMenu;
    if (this.showRoleMenu) {
      this.showUserMenu = false;
      this.showProyectoMenu = false;
      this.showPlanoMenu = false;
    }
  }

  toggleProyectoMenu() {
    this.showProyectoMenu = !this.showProyectoMenu;
    if (this.showProyectoMenu) {
      this.showUserMenu = false;
      this.showRoleMenu = false;
      this.showPlanoMenu = false;
    }
  }

  togglePlanoMenu() {
    this.showPlanoMenu = !this.showPlanoMenu; // Activa o desactiva el menú de Planos
    if (this.showPlanoMenu) {
      this.showUserMenu = false;
      this.showRoleMenu = false;
      this.showProyectoMenu = false;
    }
  }

  toggleMaterialMenu() {
    this.showMaterialMenu = !this.showMaterialMenu;
    if (this.showMaterialMenu) {
      this.showUserMenu = false;
      this.showRoleMenu = false;
      this.showPlanoMenu = false;
    }
  }
  togglePermisoMenu() {
    this.showPermisoMenu = !this.showPermisoMenu;
    if (this.showPermisoMenu) {
      this.showUserMenu = false;
      this.showRoleMenu = false;
      this.showPlanoMenu = false;
    }
  }
  toggleNotificacionMenu() {
    this.showNotificacionMenu = !this.showNotificacionMenu;
    if (this.showNotificacionMenu) {
      this.showUserMenu = false;
      this.showRoleMenu = false;
      this.showPlanoMenu = false;
    }
  }
  toggleEvaluacionesMenu() {
    this.showEvaluacionesoMenu = !this.showEvaluacionesoMenu;
    if (this.showEvaluacionesoMenu) {
      this.showUserMenu = false;
      this.showRoleMenu = false;
      this.showPlanoMenu = false;
    }
  }
  togglePrototipoMenu() {
    this.showPrototiposMenu = !this.showPrototiposMenu;
    if (this.showPrototiposMenu) {
      this.showUserMenu = false;
      this.showRoleMenu = false;
      this.showPlanoMenu = false;
    }
  }
  toggleReportesMenu() {
    this.showReportesMenu  = !this.showReportesMenu ;
    if (this.showReportesMenu ) {
      this.showUserMenu = false;
      this.showRoleMenu = false;
      this.showPlanoMenu = false;
    }
  }
  toggleComentarioMenu(){
    this.showComentarioMenu  = !this.showComentarioMenu ;
    if (this.showReportesMenu ) {
      this.showUserMenu = false;
      this.showRoleMenu = false;
      this.showPlanoMenu = false;
    }
  }

}
