import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Material } from '../../../models/Material';
import { MaterialService } from '../../../services/material.service';
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

@Component({
  selector: 'app-creaeditamaterial',
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
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './creaeditamaterial.component.html',
  styleUrls: ['./creaeditamaterial.component.css'],
})
export class CreaEditaMaterialComponent implements OnInit {
  materialForm!: FormGroup;
  isEditMode: boolean = false;
  idMaterial!: number;

  // Lista de opciones para el tipo de material
  materialTypes: string[] = [
    'Suelos adecuados',
    'Suelos tolerables',
    'Arena',
    'Grava',
    'Piedra triturada',
    'Arcilla',
    'Limo',
    'Geotextiles',
    'Geomallas',
    'Escorias de alto horno',
    'Cenizas volantes',
    'Residuos de construcción y demolición reciclados',
    'Áridos ligeros de arcilla expandida',
    'Poliestireno expandido (EPS)',
    'Tierra cementada',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private materialService: MaterialService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idMaterial = params['id'];
      this.isEditMode = !!this.idMaterial;
      this.initForm();

      if (this.isEditMode) {
        this.loadMaterialData();
      }
    });
  }

  private initForm(): void {
    this.materialForm = this.formBuilder.group({
      idMaterial: [{ value: '', disabled: this.isEditMode }],
      tipoMaterial: ['', Validators.required],
      costoMaterial: [0, [Validators.required, Validators.min(0)]],
      cantidadMaterial: [0, [Validators.required, Validators.min(0)]],
    });
  }

  private loadMaterialData(): void {
    this.materialService.getMaterialById(this.idMaterial).subscribe((data) => {
      this.materialForm.patchValue({
        idMaterial: data.idMaterial,
        tipoMaterial: data.tipoMaterial,
        costoMaterial: data.costoMaterial,
        cantidadMaterial: data.cantidadMaterial,
      });
    });
  }

  saveMaterial(): void {
    if (this.materialForm.valid) {
      const materialToSave = this.materialForm.getRawValue();

      if (this.isEditMode) {
        this.materialService.update(materialToSave).subscribe(
          () => {
            this.snackBar.open('Material actualizado exitosamente', 'Cerrar', { duration: 3000 });
            this.navigateToMaterials();
          },
          (error) => {
            console.error('Error al actualizar el material:', error);
            this.snackBar.open('Error al actualizar el material.', 'Cerrar', { duration: 3000 });
          }
        );
      } else {
        this.materialService.create(materialToSave).subscribe(
          () => {
            this.snackBar.open('Material registrado exitosamente', 'Cerrar', { duration: 3000 });
            this.navigateToMaterials();
          },
          (error) => {
            console.error('Error al registrar el material:', error);
            this.snackBar.open('Error al registrar el material.', 'Cerrar', { duration: 3000 });
          }
        );
      }
    } else {
      this.materialForm.markAllAsTouched();
    }
  }

  navigateToMaterials(): void {
    this.router.navigate(['/materiales']);
  }
}
