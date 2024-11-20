import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Proyecto } from '../../../models/Proyecto';
import { Usuario } from '../../../models/Usuario';
import { ProyectoService } from '../../../services/proyecto.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-creaeditaproyecto',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,
    MatDatepickerModule,
  ],
  templateUrl: './creaeditaproyecto.component.html',
  styleUrls: ['./creaeditaproyecto.component.css'],
})
export class CreaEditaProyectoComponent implements OnInit {
  projectForm!: FormGroup;
  isEditMode: boolean = false;
  idProyecto!: number;
  usuariosDisponibles: Usuario[] = [];
  estadosDisponibles: string[] = ['Activo', 'Inactivo', 'Completado'];
  startDate = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private proyectoService: ProyectoService,
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.idProyecto = params['id'];
      this.isEditMode = !!this.idProyecto;
      this.initForm();
      this.loadUsuarios();

      if (this.isEditMode) {
        this.loadProjectData();
      }
    });
  }

  private initForm() {
    this.projectForm = this.formBuilder.group({
      idProyecto: [{ value: '', disabled: this.isEditMode }],
      nombreProyecto: ['', [Validators.required, Validators.minLength(3)]],
      descripcionProyecto: ['', Validators.required],
      fechaCreacionProyecto: ['', Validators.required],
      estadoProyecto: ['', Validators.required],
      idUsuario: ['', Validators.required],
    });
  }

  private loadUsuarios(): void {
    this.usuarioService.list().subscribe(
      (usuarios) => {
        this.usuariosDisponibles = usuarios;
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  private loadProjectData(): void {
    this.proyectoService.getProyectoById(this.idProyecto).subscribe((data) => {
      this.projectForm.patchValue({
        idProyecto: data.idProyecto,
        nombreProyecto: data.nombreProyecto,
        descripcionProyecto: data.descripcionProyecto,
        fechaCreacionProyecto: data.fechaCreacionProyecto,
        estadoProyecto: data.estadoProyecto,
        idUsuario: data.idUsuario,
      });
    });
  }

  saveProject(): void {
    if (this.projectForm.valid) {
      const projectToSave = this.projectForm.getRawValue();

      if (this.isEditMode) {
        this.proyectoService.update(projectToSave).subscribe(
          () => {
            this.snackBar.open('Proyecto actualizado exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.navigateToProjects();
          },
          (error) => {
            console.error('Error al actualizar el proyecto:', error);
            this.snackBar.open('Error al actualizar el proyecto.', 'Cerrar', {
              duration: 3000,
            });
          }
        );
      } else {
        this.proyectoService.create(projectToSave).subscribe(
          () => {
            this.snackBar.open('Proyecto registrado exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.navigateToProjects();
          },
          (error) => {
            console.error('Error al registrar el proyecto:', error);
            this.snackBar.open('Error al registrar el proyecto.', 'Cerrar', {
              duration: 3000,
            });
          }
        );
      }
    } else {
      this.projectForm.markAllAsTouched();
    }
  }

  navigateToProjects(): void {
    this.router.navigate(['/proyectos']);
  }
}
