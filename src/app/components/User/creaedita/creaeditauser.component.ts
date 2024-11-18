import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/User';
import { UserService } from '../../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-creaeditauser',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './creaeditauser.component.html',
  styleUrls: ['./creaeditauser.component.css'],
})
export class CrearUserComponent implements OnInit {
  form: FormGroup;
  user: User = new User();
  existingUsers: User[] = [];
  isEditMode = false;
  userId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      nombreCompleto: ['', Validators.required],
      contrasenia: ['', Validators.required],
      enabled: [false, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadExistingUsers();
    this.checkEditMode();
  }

  loadExistingUsers() {
    this.userService.list().subscribe(users => {
      this.existingUsers = users;
    });
  }

  checkEditMode() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.userId = +id;
        this.loadUserData(this.userId);
      }
    });
  }

  loadUserData(id: number) {
    this.userService.getUserById(id).subscribe((user: User) => {
      this.form.patchValue({
        nombreCompleto: user.nombreCompleto,
        contrasenia: user.contrasenia,
        enabled: user.enabled
      });
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const newUsername = this.form.value.nombreCompleto;

      // Validar si el nombre de usuario ya existe en modo de creación
      if (!this.isEditMode && this.existingUsers.some(user => user.nombreCompleto === newUsername)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El nombre de usuario ya está en uso. Por favor, elige otro.',
        });
        return;
      }

      // Crear o actualizar usuario
      this.user.nombreCompleto = newUsername;
      this.user.contrasenia = this.form.value.contrasenia;
      this.user.enabled = this.form.value.enabled;

      if (this.isEditMode && this.userId !== null) {
        // Modo de edición
        this.user.idUsuario = this.userId;
        this.userService.update(this.user).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Usuario Actualizado',
              text: `Usuario ${this.user.nombreCompleto} actualizado exitosamente.`,
            }).then(() => {
              this.router.navigate(['/usuarios']);
            });
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al actualizar el usuario. Inténtalo de nuevo más tarde.',
            });
          }
        });
      } else {
        // Modo de creación
        this.userService.create(this.user).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Usuario Creado',
              text: `Usuario ${this.user.nombreCompleto} creado exitosamente.`,
            }).then(() => {
              this.router.navigate(['/usuarios']);
            });
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al crear el usuario. Inténtalo de nuevo más tarde.',
            });
          }
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Por favor, completa todos los campos requeridos.',
      });
    }
  }
}
