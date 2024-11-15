import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Terreno } from '../../../models/Terreno'; 
import { Plano } from '../../../models/Plano';
import { TerrenoService } from '../../../services/terreno.service'; 
import { PlanoService } from '../../../services/plano.service'; 
import { Router, ActivatedRoute } from '@angular/router'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatSelectModule } from '@angular/material/select'; 
import { MatButtonModule } from '@angular/material/button'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-creaeditaplano',
  templateUrl: './creaeditaplano.component.html',
  styleUrls: ['./creaeditaplano.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule, MatInputModule, CommonModule, MatFormFieldModule, 
    MatSelectModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule
  ]
})
export class CrearPlanoComponent implements OnInit {
  form: FormGroup;
  terrenos: Terreno[] = [];
  isEditMode = false;
  planoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private terrenoService: TerrenoService,
    private planoService: PlanoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      idPlano: [{ value: '', disabled: true }], // Field only for display in edit mode
      tipoPlano: [null, Validators.required],
      descripcionPlano: [null, Validators.required],
      fechaPlano: [null, Validators.required],
      terreno: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.loadTerrenos();
    this.checkEditMode();
  }

  loadTerrenos() {
    this.terrenoService.list().subscribe(
      (data: Terreno[]) => {
        this.terrenos = data;
      },
      (error) => {
        console.error('Error al cargar terrenos', error);
      }
    );
  }

  checkEditMode() {
    this.route.paramMap.subscribe(params => {
      const planoId = params.get('id');
      if (planoId) {
        this.isEditMode = true;
        this.planoId = +planoId;
        this.loadPlanoData(this.planoId); // Load plano data when editing
      }
    });
  }

  loadPlanoData(id: number) {
    this.planoService.getById(id).subscribe((plano: Plano) => {
      this.form.patchValue({
        idPlano: plano.idPlano,
        tipoPlano: plano.tipoPlano,
        descripcionPlano: plano.descripcionPlano,
        fechaPlano: plano.fechaPlano,
        terreno: plano.terreno ? plano.terreno.idTerreno : null
      });
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const planoData = new Plano(
        this.planoId ?? 0,
        this.form.getRawValue().tipoPlano,
        this.form.getRawValue().descripcionPlano,
        this.form.getRawValue().fechaPlano,
        this.terrenos.find(terreno => terreno.idTerreno === this.form.value.terreno) || new Terreno()
      );

      if (this.isEditMode) {
        this.planoService.update(planoData).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Plano Actualizado',
            text: `Plano ${this.form.value.tipoPlano} actualizado exitosamente.`,
          }).then(() => {
            this.router.navigate(['/planos']);
          });
        }, (error) => {
          console.error('Error al actualizar el plano', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el plano. Inténtalo de nuevo.',
          });
        });
      } else {
        this.planoService.create(planoData).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Plano Creado',
            text: `Plano ${this.form.value.tipoPlano} creado exitosamente.`,
          }).then(() => {
            this.router.navigate(['/planos']);
          });
        }, (error) => {
          console.error('Error al crear el plano', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo crear el plano. Inténtalo de nuevo.',
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
