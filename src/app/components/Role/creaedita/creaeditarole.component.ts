import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/Usuario'; 
import { Role } from '../../../models/Rol'; 
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/usuario.service'; 
import { RoleService } from '../../../services/rol.service'; 
import { Router, ActivatedRoute } from '@angular/router'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatSelectModule } from '@angular/material/select'; 
import { MatButtonModule } from '@angular/material/button'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-creaeditarole',
  templateUrl: './creaeditarole.component.html',
  styleUrls: ['./creaeditarole.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule]
})
export class CrearRoleComponent implements OnInit {
  form: FormGroup;
  users: User[] = [];
  roles: string[] = ['Admin', 'Usuario'];
  isEditMode = false;
  roleId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombreRol: [null, Validators.required],
      descripcionRol: [null, Validators.required],
      usuario: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.loadUsers();
    this.checkEditMode();
  }

  loadUsers() {
    this.userService.list().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error al cargar usuarios', error);
      }
    );
  }

  checkEditMode() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.roleId = +id;
        this.loadRoleData(this.roleId);
      }
    });
  }

  loadRoleData(id: number) {
    this.roleService.getById(id).subscribe((role: Role) => {
      this.form.patchValue({
        nombreRol: role.nombreRol,
        descripcionRol: role.descripcionRol,
        usuario: role.usuario ? role.usuario.idUsuario : null
      });
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const userId = this.form.value.usuario;
  
      this.userService.getUserById(userId).subscribe(user => {
        if (!user) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario no encontrado.',
          });
          return;
        }
  
        if (this.isEditMode) {
          const updatedRole = new Role(this.roleId ?? 0, this.form.value.nombreRol, this.form.value.descripcionRol, user);

          this.roleService.update(updatedRole).subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'Rol Actualizado',
              text: `Rol ${this.form.value.nombreRol} actualizado exitosamente.`,
            }).then(() => {
              this.router.navigate(['/rol']);
            });
          }, (error) => {
            console.error('Error al actualizar el rol', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo actualizar el rol. Inténtalo de nuevo.',
            });
          });
        } else {
          this.roleService.list().subscribe(roles => {
            const existingRole = roles.find(role => role.usuario && role.usuario.idUsuario === user.idUsuario);

            if (existingRole) {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `El usuario ya tiene el rol ${existingRole.nombreRol}. No puede tener más de un rol.`,
              });
            } else {
              const newRole = new Role(0, this.form.value.nombreRol, this.form.value.descripcionRol, user);

              this.roleService.create(newRole).subscribe(() => {
                Swal.fire({
                  icon: 'success',
                  title: 'Éxito',
                  text: `Rol ${this.form.value.nombreRol} creado exitosamente.`,
                }).then(() => {
                  this.router.navigate(['/rol']);
                });
              }, (error) => {
                console.error('Error al crear el rol', error);
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'No se pudo crear el rol. Inténtalo de nuevo.',
                });
              });
            }
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Por favor, completa todos los campos requeridos.',
      });
    }
  }
}
