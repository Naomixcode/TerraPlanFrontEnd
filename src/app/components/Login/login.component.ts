import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; // Opcional, para el contenedor
import Swal from 'sweetalert2'; // Importa SweetAlert2

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule // Opcional, para el contenedor
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        if (response && response.jwttoken) {
          this.authService.setToken(response.jwttoken);
          this.router.navigate(['/usuarios']);
        }
      },
      error => {
        console.error('Error durante el inicio de sesión', error);
        // Usar SweetAlert2 para mostrar un mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
        });
      }
    );
  }
}
