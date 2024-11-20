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
import { Permiso } from '../../../models/Permiso';
import { Proyecto } from '../../../models/Proyecto';
import { PermisoService } from '../../../services/permiso.service';
import { ProyectoService } from '../../../services/proyecto.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-creaeditapermiso',
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
  templateUrl: './creaeditapermiso.component.html',
  styleUrls: ['./creaeditapermiso.component.css'],
})
export class CreaEditaPermisoComponent implements OnInit {
  permissionForm!: FormGroup;
  isEditMode: boolean = false;
  idPermiso!: number;
  proyectosDisponibles: Proyecto[] = [];
  startDate = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private permisoService: PermisoService,
    private proyectoService: ProyectoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.idPermiso = params['id'];
      this.isEditMode = !!this.idPermiso;
      this.initForm();
      this.loadProyectos();

      if (this.isEditMode) {
        this.loadPermissionData();
      }
    });
  }

  private initForm() {
    this.permissionForm = this.formBuilder.group({
      idPermiso: [{ value: '', disabled: this.isEditMode }],
      nombrePermiso: ['', Validators.required],
      descripcionPermiso: ['', Validators.required],
      fechaSubida: ['', Validators.required],
      idProyecto: ['', Validators.required],
    });
  }

  private loadProyectos(): void {
    this.proyectoService.list().subscribe(
      (proyectos) => {
        this.proyectosDisponibles = proyectos;
      },
      (error) => {
        console.error('Error al cargar proyectos:', error);
      }
    );
  }

  private loadPermissionData(): void {
    this.permisoService.getPermisoById(this.idPermiso).subscribe((data) => {
      this.permissionForm.patchValue({
        idPermiso: data.idPermiso,
        nombrePermiso: data.nombrePermiso,
        descripcionPermiso: data.descripcionPermiso,
        fechaSubida: data.fechaSubida,
        idProyecto: data.idProyecto,
      });
    });
  }

  savePermission(): void {
    if (this.permissionForm.valid) {
      const permissionToSave = this.permissionForm.getRawValue();

      if (this.isEditMode) {
        this.permisoService.update(permissionToSave).subscribe(
          () => {
            this.snackBar.open('Permiso actualizado exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.navigateToPermissions();
          },
          (error) => {
            console.error('Error al actualizar el permiso:', error);
            this.snackBar.open('Error al actualizar el permiso.', 'Cerrar', {
              duration: 3000,
            });
          }
        );
      } else {
        this.permisoService.create(permissionToSave).subscribe(
          () => {
            this.snackBar.open('Permiso registrado exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.navigateToPermissions();
          },
          (error) => {
            console.error('Error al registrar el permiso:', error);
            this.snackBar.open('Error al registrar el permiso.', 'Cerrar', {
              duration: 3000,
            });
          }
        );
      }
    } else {
      this.permissionForm.markAllAsTouched();
    }
  }

  navigateToPermissions(): void {
    this.router.navigate(['/permisos']);
  }
}
