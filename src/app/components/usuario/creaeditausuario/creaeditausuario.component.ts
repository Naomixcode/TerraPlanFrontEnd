import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-creaeditausuario',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './creaeditausuario.component.html',
  styleUrls: ['./creaeditausuario.component.css'],
})
export class CreaEditaUsuarioComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode: boolean = false;
  idUsuario!: number;
  rolesDisponibles: string[] = ['ADMIN', 'CLIENTE', 'ARQUITECTO']; // Roles disponibles en el sistema

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.idUsuario = params['id'];
      this.isEditMode = !!this.idUsuario;
      this.initForm();
  
      if (this.isEditMode) {
        this.usuarioService.getUserById(this.idUsuario).subscribe((data) => {
          console.log('Datos recibidos del backend:', data); // Verifica los datos recuperados
          this.userForm.patchValue({
            idUsuario: data.idUsuario,
            nombreCompleto: data.nombreCompleto,
            contrasenia: data.contrasenia, // Recupera la contraseña del backend
            enabled: data.enabled,
          });
          this.userForm.setControl(
            'roles',
            this.formBuilder.array(data.roles || []) // Asegúrate de asignar roles aunque sea un array vacío
          );
          this.userForm.get('idUsuario')?.disable(); // Deshabilita el ID
        });
      }
    });
  }  

  private initForm() {
    this.userForm = this.formBuilder.group({
      idUsuario: [''],
      nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
      contrasenia: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]],
      enabled: [true],
      roles: this.formBuilder.array([]), // Roles como un FormArray
    });
  }

  // Métodos para gestionar roles dinámicamente
  get roles(): FormArray {
    return this.userForm.get('roles') as FormArray;
  }

  addRole(role: string): void {
    if (!this.roles.value.includes(role)) {
      this.roles.push(this.formBuilder.control(role));
    }
  }

  removeRole(index: number): void {
    this.roles.removeAt(index);
  }

  saveUser(): void {
    if (this.userForm.valid) {
      const userToSave: Usuario = this.userForm.getRawValue();
  
      if (this.isEditMode) {
        userToSave.idUsuario = this.idUsuario; // Asigna el ID del usuario
  
        this.usuarioService.update(userToSave).subscribe(
          () => {
            this.snackBar.open('Usuario actualizado exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/usuarios']);
          },
          (error) => {
            console.error('Error al actualizar usuario:', error);
            this.snackBar.open('Error al actualizar el usuario.', 'Cerrar', {
              duration: 3000,
            });
          }
        );
      } else {
        this.usuarioService.create(userToSave).subscribe(
          () => {
            this.snackBar.open('Usuario registrado exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/usuarios']);
          },
          (error) => {
            console.error('Error al registrar usuario:', error);
            this.snackBar.open('Error al registrar el usuario.', 'Cerrar', {
              duration: 3000,
            });
          }
        );
      }
    } else {
      this.userForm.markAllAsTouched();
    }
  }  
}
