import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Prototipo } from '../../../models/Prototipo';
import { Material } from '../../../models/Material';
import { PrototipoMaterial } from '../../../models/PrototipoMaterial';
import { PrototipoService } from '../../../services/prototipo.service';
import { MaterialService } from '../../../services/material.service';
import { PrototipoMaterialService } from '../../../services/prototipomaterial.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-creaeditaprototipomaterial',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    ReactiveFormsModule
  ],
  templateUrl: './creaeditaprototipomaterial.component.html',
  styleUrls: ['./creaeditaprototipomaterial.component.css'],
})
export class CreaEditaPrototipoMaterialComponent implements OnInit {
  prototipoMaterialForm!: FormGroup;
  isEditMode: boolean = false;
  idPrototipoMaterial!: number;
  prototiposDisponibles: Prototipo[] = [];
  materialesDisponibles: Material[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private prototipoMaterialService: PrototipoMaterialService,
    private prototipoService: PrototipoService,
    private materialService: MaterialService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idPrototipoMaterial = params['id'];
      this.isEditMode = !!this.idPrototipoMaterial;
      this.initForm();
      this.loadPrototipos();
      this.loadMateriales();

      if (this.isEditMode) {
        this.loadPrototipoMaterialData();
      }
    });
  }

  private initForm(): void {
    this.prototipoMaterialForm = this.formBuilder.group({
      idPrototipoMaterial: [{ value: '', disabled: this.isEditMode }],
      idPrototipo: ['', Validators.required],
      idMaterial: ['', Validators.required],
    });
  }

  private loadPrototipos(): void {
    this.prototipoService.list().subscribe(
      (prototipos) => {
        this.prototiposDisponibles = prototipos;
      },
      (error) => {
        console.error('Error al cargar prototipos:', error);
      }
    );
  }

  private loadMateriales(): void {
    this.materialService.list().subscribe(
      (materiales) => {
        this.materialesDisponibles = materiales;
      },
      (error) => {
        console.error('Error al cargar materiales:', error);
      }
    );
  }

  private loadPrototipoMaterialData(): void {
    this.prototipoMaterialService.getPrototipoMaterialById(this.idPrototipoMaterial).subscribe((data) => {
      this.prototipoMaterialForm.patchValue({
        idPrototipoMaterial: data.idPrototipoMaterial,
        idPrototipo: data.idPrototipo,
        idMaterial: data.idMaterial,
      });
    });
  }

  savePrototipoMaterial(): void {
    if (this.prototipoMaterialForm.valid) {
      const prototipoMaterialToSave = this.prototipoMaterialForm.getRawValue();

      if (this.isEditMode) {
        this.prototipoMaterialService.update(prototipoMaterialToSave).subscribe(
          () => {
            this.snackBar.open('Prototipo Material actualizado exitosamente', 'Cerrar', { duration: 3000 });
            this.navigateToPrototipoMateriales();
          },
          (error) => {
            console.error('Error al actualizar el Prototipo Material:', error);
            this.snackBar.open('Error al actualizar el Prototipo Material.', 'Cerrar', { duration: 3000 });
          }
        );
      } else {
        this.prototipoMaterialService.create(prototipoMaterialToSave).subscribe(
          () => {
            this.snackBar.open('Prototipo Material registrado exitosamente', 'Cerrar', { duration: 3000 });
            this.navigateToPrototipoMateriales();
          },
          (error) => {
            console.error('Error al registrar el Prototipo Material:', error);
            this.snackBar.open('Error al registrar el Prototipo Material.', 'Cerrar', { duration: 3000 });
          }
        );
      }
    } else {
      this.prototipoMaterialForm.markAllAsTouched();
    }
  }

  navigateToPrototipoMateriales(): void {
    this.router.navigate(['/prototipos-material']);
  }
}
