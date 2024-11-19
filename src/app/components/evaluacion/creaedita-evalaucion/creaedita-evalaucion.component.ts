import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Evaluacion } from '../../../models/Evaluacion';
import { Terreno } from '../../../models/Terreno';
import { EvaluacionService } from '../../../services/evaluacion.service';
import { TerrenoService } from '../../../services/terreno.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-creaeditaevaluacion',
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatOptionModule,
  ],
  templateUrl: './creaeditaevaluacion.component.html',
  styleUrls: ['./creaeditaevaluacion.component.css'],
})
export class CreaEditaEvaluacionComponent implements OnInit {
  evaluationForm!: FormGroup;
  isEditMode: boolean = false;
  idEvaluacion!: number;
  terrenosDisponibles: Terreno[] = [];
  startDate = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private evaluacionService: EvaluacionService,
    private terrenoService: TerrenoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idEvaluacion = params['id'];
      this.isEditMode = !!this.idEvaluacion;
      this.initForm();
      this.loadTerrenos();

      if (this.isEditMode) {
        this.loadEvaluationData();
      }
    });
  }

  private initForm(): void {
    this.evaluationForm = this.formBuilder.group({
      idEvaluacion: [{ value: '', disabled: this.isEditMode }],
      fechaEvaluacion: ['', Validators.required],
      resultadoEvaluacion: ['', Validators.required],
      comentariosEvaluacion: ['', Validators.required],
      idTerreno: ['', Validators.required],
    });
  }

  private loadTerrenos(): void {
    this.terrenoService.list().subscribe(
      (terrenos) => {
        this.terrenosDisponibles = terrenos;
      },
      (error) => {
        console.error('Error al cargar terrenos:', error);
      }
    );
  }

  private loadEvaluationData(): void {
    this.evaluacionService.getEvaluacionById(this.idEvaluacion).subscribe((data) => {
      this.evaluationForm.patchValue({
        idEvaluacion: data.idEvaluacion,
        fechaEvaluacion: data.fechaEvaluacion,
        resultadoEvaluacion: data.resultadoEvaluacion,
        comentariosEvaluacion: data.comentariosEvaluacion,
        idTerreno: data.idTerreno,
      });
    });
  }

  saveEvaluation(): void {
    if (this.evaluationForm.valid) {
      const evaluationToSave = this.evaluationForm.getRawValue();

      if (this.isEditMode) {
        this.evaluacionService.update(evaluationToSave).subscribe(
          () => {
            this.snackBar.open('Evaluación actualizada exitosamente', 'Cerrar', { duration: 3000 });
            this.navigateToEvaluations();
          },
          (error) => {
            console.error('Error al actualizar la evaluación:', error);
            this.snackBar.open('Error al actualizar la evaluación.', 'Cerrar', { duration: 3000 });
          }
        );
      } else {
        this.evaluacionService.create(evaluationToSave).subscribe(
          () => {
            this.snackBar.open('Evaluación registrada exitosamente', 'Cerrar', { duration: 3000 });
            this.navigateToEvaluations();
          },
          (error) => {
            console.error('Error al registrar la evaluación:', error);
            this.snackBar.open('Error al registrar la evaluación.', 'Cerrar', { duration: 3000 });
          }
        );
      }
    } else {
      this.evaluationForm.markAllAsTouched();
    }
  }

  navigateToEvaluations(): void {
    this.router.navigate(['/evaluaciones']);
  }
}
