import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/User'; 
import { Proyecto } from '../../../models/Proyecto';
import { UserService } from '../../../services/user.service'; 
import { ProyectoService } from '../../../services/proyecto.service'; 
import { Router, ActivatedRoute } from '@angular/router'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatSelectModule } from '@angular/material/select'; 
import { MatButtonModule } from '@angular/material/button'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-creaeditaproyecto',
  templateUrl: './creaeditaproyecto.component.html',
  styleUrls: ['./creaeditaproyecto.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, CommonModule, MatFormFieldModule, MatSelectModule, MatButtonModule]
})
export class CrearProyectoComponent implements OnInit {
  form: FormGroup;
  users: User[] = [];
  isEditMode = false;
  projectId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private proyectoService: ProyectoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      idProyecto: [{ value: '', disabled: true }], // Field only for display in edit mode
      nombreProyecto: [null, Validators.required],
      descripcionProyecto: [null, Validators.required],
      estadoProyecto: [null, Validators.required],
      usuarioProyecto: [null, Validators.required],
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
      const projectId = params.get('id');
      if (projectId) {
        this.isEditMode = true;
        this.projectId = +projectId;
        this.loadProjectData(this.projectId); // Load project data when editing
      }
    });
  }

  loadProjectData(id: number) {
    this.proyectoService.getById(id).subscribe((project: Proyecto) => {
      this.form.patchValue({
        idProyecto: project.idProyecto, // Display-only field
        nombreProyecto: project.nombreProyecto,
        descripcionProyecto: project.descripcionProyecto,
        estadoProyecto: project.estadoProyecto,
        usuarioProyecto: project.usuarioProyecto ? project.usuarioProyecto.idUsuario : null
      });
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const projectData = new Proyecto(
        this.projectId ?? 0,
        this.form.getRawValue().nombreProyecto,
        this.form.getRawValue().descripcionProyecto,
        new Date().toISOString().split('T')[0],
        this.form.getRawValue().estadoProyecto,
        this.users.find(user => user.idUsuario === this.form.value.usuarioProyecto) || null,
        [], // Empty terrenos list by default
        []  // Empty comentarios list by default
      );

      if (this.isEditMode) {
        // Update project
        this.proyectoService.update(projectData).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Proyecto Actualizado',
            text: `Proyecto ${this.form.value.nombreProyecto} actualizado exitosamente.`,
          }).then(() => {
            this.router.navigate(['/proyectos']);
          });
        }, (error) => {
          console.error('Error al actualizar el proyecto', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el proyecto. Inténtalo de nuevo.',
          });
        });
      } else {
        // Create new project
        this.proyectoService.create(projectData).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Proyecto Creado',
            text: `Proyecto ${this.form.value.nombreProyecto} creado exitosamente.`,
          }).then(() => {
            this.router.navigate(['/proyectos']);
          });
        }, (error) => {
          console.error('Error al crear el proyecto', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo crear el proyecto. Inténtalo de nuevo.',
          });
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
