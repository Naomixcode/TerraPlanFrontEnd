import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Terreno } from '../../../models/Terreno';
import { Plano } from '../../../models/Plano';
import { PlanoService } from '../../../services/plano.service';
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
  selector: 'app-creaeditaplano',
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
  templateUrl: './creaeditaplano.component.html',
  styleUrls: ['./creaeditaplano.component.css'],
})
export class CreaEditaPlanoComponent implements OnInit {
  planoForm!: FormGroup;
  isEditMode: boolean = false;
  idPlano!: number;
  terrenosDisponibles: Terreno[] = [];
  startDate = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private planoService: PlanoService,
    private terrenoService: TerrenoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idPlano = params['id'];
      this.isEditMode = !!this.idPlano;
      this.initForm();
      this.loadTerrenos();

      if (this.isEditMode) {
        this.loadPlanoData();
      }
    });
  }

  private initForm(): void {
    this.planoForm = this.formBuilder.group({
      idPlano: [{ value: '', disabled: this.isEditMode }],
      tipoPlano: ['', Validators.required],
      descripcionPlano: ['', Validators.required],
      fechaPlano: ['', Validators.required],
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

  private loadPlanoData(): void {
    this.planoService.getPlanoById(this.idPlano).subscribe((data) => {
      this.planoForm.patchValue({
        idPlano: data.idPlano,
        tipoPlano: data.tipoPlano,
        descripcionPlano: data.descripcionPlano,
        fechaPlano: data.fechaPlano,
        idTerreno: data.idTerreno,
      });
    });
  }

  savePlano(): void {
    if (this.planoForm.valid) {
      const planoToSave = this.planoForm.getRawValue();

      if (this.isEditMode) {
        this.planoService.update(planoToSave).subscribe(
          () => {
            this.snackBar.open('Plano actualizado exitosamente', 'Cerrar', { duration: 3000 });
            this.navigateToPlanos();
          },
          (error) => {
            console.error('Error al actualizar el plano:', error);
            this.snackBar.open('Error al actualizar el plano.', 'Cerrar', { duration: 3000 });
          }
        );
      } else {
        this.planoService.create(planoToSave).subscribe(
          () => {
            this.snackBar.open('Plano registrado exitosamente', 'Cerrar', { duration: 3000 });
            this.navigateToPlanos();
          },
          (error) => {
            console.error('Error al registrar el plano:', error);
            this.snackBar.open('Error al registrar el plano.', 'Cerrar', { duration: 3000 });
          }
        );
      }
    } else {
      this.planoForm.markAllAsTouched();
    }
  }

  navigateToPlanos(): void {
    this.router.navigate(['/planos']);
  }
}
