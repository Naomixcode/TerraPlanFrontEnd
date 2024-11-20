import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Plano } from '../../../models/Plano';
import { Prototipo } from '../../../models/Prototipo';
import { PrototipoService } from '../../../services/prototipo.service';
import { PlanoService } from '../../../services/plano.service';
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
  selector: 'app-creaeditaprototipo',
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
  templateUrl: './creaeditaprototipo.component.html',
  styleUrls: ['./creaeditaprototipo.component.css'],
})
export class CreaEditaPrototipoComponent implements OnInit {
  prototipoForm!: FormGroup;
  isEditMode: boolean = false;
  idPrototipo!: number;
  planosDisponibles: Plano[] = [];
  startDate = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private prototipoService: PrototipoService,
    private planoService: PlanoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idPrototipo = params['id'];
      this.isEditMode = !!this.idPrototipo;
      this.initForm();
      this.loadPlanos();

      if (this.isEditMode) {
        this.loadPrototipoData();
      }
    });
  }

  private initForm(): void {
    this.prototipoForm = this.formBuilder.group({
      idPrototipo: [{ value: '', disabled: this.isEditMode }],
      tipoEstructuraPrototipo: ['', Validators.required],
      descripcionPrototipo: ['', Validators.required],
      fechaCreacionPrototipo: ['', Validators.required],
      idPlano: ['', Validators.required],
    });
  }

  private loadPlanos(): void {
    this.planoService.list().subscribe(
      (planos) => {
        this.planosDisponibles = planos;
      },
      (error) => {
        console.error('Error al cargar planos:', error);
      }
    );
  }

  private loadPrototipoData(): void {
    this.prototipoService.getPrototipoById(this.idPrototipo).subscribe((data) => {
      this.prototipoForm.patchValue({
        idPrototipo: data.idPrototipo,
        tipoEstructuraPrototipo: data.tipoEstructuraPrototipo,
        descripcionPrototipo: data.descripcionPrototipo,
        fechaCreacionPrototipo: data.fechaCreacionPrototipo,
        idPlano: data.idPlano,
      });
    });
  }

  savePrototipo(): void {
    if (this.prototipoForm.valid) {
      const prototipoToSave = this.prototipoForm.getRawValue();

      if (this.isEditMode) {
        this.prototipoService.update(prototipoToSave).subscribe(
          () => {
            this.snackBar.open('Prototipo actualizado exitosamente', 'Cerrar', { duration: 3000 });
            this.navigateToPrototipos();
          },
          (error) => {
            console.error('Error al actualizar el prototipo:', error);
            this.snackBar.open('Error al actualizar el prototipo.', 'Cerrar', { duration: 3000 });
          }
        );
      } else {
        this.prototipoService.create(prototipoToSave).subscribe(
          () => {
            this.snackBar.open('Prototipo registrado exitosamente', 'Cerrar', { duration: 3000 });
            this.navigateToPrototipos();
          },
          (error) => {
            console.error('Error al registrar el prototipo:', error);
            this.snackBar.open('Error al registrar el prototipo.', 'Cerrar', { duration: 3000 });
          }
        );
      }
    } else {
      this.prototipoForm.markAllAsTouched();
    }
  }

  navigateToPrototipos(): void {
    this.router.navigate(['/prototipos']);
  }
}
