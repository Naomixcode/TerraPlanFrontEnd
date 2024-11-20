import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Terreno } from '../../../models/Terreno';
import { Proyecto } from '../../../models/Proyecto';
import { ProyectoService } from '../../../services/proyecto.service';
import { TerrenoService } from '../../../services/terreno.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-creaeditaterreno',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './creaeditaterreno.component.html',
  styleUrls: ['./creaeditaterreno.component.css'],
})
export class CreaEditaTerrenoComponent implements OnInit {
  terrenoForm!: FormGroup;
  isEditMode: boolean = false;
  idTerreno!: number;
  proyectosDisponibles: Proyecto[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private terrenoService: TerrenoService,
    private proyectoService: ProyectoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idTerreno = params['id'];
      this.isEditMode = !!this.idTerreno;
      this.initForm();
      this.loadProyectos();

      if (this.isEditMode) {
        this.loadTerrenoData();
      }
    });
  }

  private initForm(): void {
    this.terrenoForm = this.formBuilder.group({
      idTerreno: [{ value: '', disabled: this.isEditMode }],
      ubicacionTerreno: ['', Validators.required],
      tamanioTerreno: ['', [Validators.required, Validators.min(1)]],
      descripcionTerreno: ['', Validators.required],
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

  private loadTerrenoData(): void {
    this.terrenoService.getTerrenoById(this.idTerreno).subscribe((data) => {
      this.terrenoForm.patchValue({
        idTerreno: data.idTerreno,
        ubicacionTerreno: data.ubicacionTerreno,
        tamanioTerreno: data.tamanioTerreno,
        descripcionTerreno: data.descripcionTerreno,
        idProyecto: data.idProyecto,
      });
    });
  }

  saveTerreno(): void {
    if (this.terrenoForm.valid) {
      const terrenoToSave = this.terrenoForm.getRawValue();

      if (this.isEditMode) {
        this.terrenoService.update(terrenoToSave).subscribe(
          () => {
            this.snackBar.open('Terreno actualizado exitosamente', 'Cerrar', { duration: 3000 });
            this.navigateToTerrenos();
          },
          (error) => {
            console.error('Error al actualizar el terreno:', error);
            this.snackBar.open('Error al actualizar el terreno.', 'Cerrar', { duration: 3000 });
          }
        );
      } else {
        this.terrenoService.create(terrenoToSave).subscribe(
          () => {
            this.snackBar.open('Terreno registrado exitosamente', 'Cerrar', { duration: 3000 });
            this.navigateToTerrenos();
          },
          (error) => {
            console.error('Error al registrar el terreno:', error);
            this.snackBar.open('Error al registrar el terreno.', 'Cerrar', { duration: 3000 });
          }
        );
      }
    } else {
      this.terrenoForm.markAllAsTouched();
    }
  }

  navigateToTerrenos(): void {
    this.router.navigate(['/terrenos']);
  }
}
