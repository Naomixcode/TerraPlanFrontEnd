import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatSelectModule } from '@angular/material/select'; 
import { MatButtonModule } from '@angular/material/button'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import Swal from 'sweetalert2'; 
import { Plano } from '../../../models/Plano';
import { PrototipoService } from '../../../services/prototipo.service';
import { PlanoService } from '../../../services/plano.service';
import { Prototipo } from '../../../models/Prototipo';
import { Terreno } from '../../../models/Terreno';

@Component({
  selector: 'app-creaedita-prototipo',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatInputModule, CommonModule, MatFormFieldModule, 
    MatSelectModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule,
  ],
  templateUrl: './creaedita-prototipo.component.html',
  styleUrl: './creaedita-prototipo.component.css'
})
export class CreaeditaPrototipoComponent implements OnInit {
  form:  FormGroup;
  planos: Plano[]=[];
  isEditMode = false;
  prototipoId: number | null = null;
  constructor(

    private fb: FormBuilder, 
    private planoService:PlanoService,
    private prototipoService: PrototipoService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.form=fb.group({
      idPrototipo: [{value:'',disabled:true}],
      fechaCreacionPrototipo: [null, Validators.required],
      tipoEstructuraPrototipo: [null, Validators.required],
      descripcionPrototipo: [null, Validators.required],
      plano: [null, Validators.required],
    });

  }
  ngOnInit()
  {
    this.loadPlanos();
    this.checkEditMode();
  }
  loadPlanos(){
    this.planoService.list().subscribe(
      (data: Plano[])=>{
        this.planos=data;
      },
      (error)=>{
        console.error('Error al cargar planos',error);
      }
    );
  }
  checkEditMode(){
    this.route.paramMap.subscribe(params=>{
      const prototipoId=params.get('id');
      if(prototipoId){
        this.isEditMode=true;
        this.prototipoId=+prototipoId;
        this.loadPrototipoData(this.prototipoId); // Load evaluacion data when editing
      }
    });
  }
  loadPrototipoData(id: number){
    this.prototipoService.getById(id).subscribe(
      (prototipo:Prototipo)=>{
        this.form.patchValue({
          idPrototipo: prototipo.idPrototipo,
          fechaCreacionPrototipo: prototipo.fechaCreacionPrototipo,
          tipoEstructuraPrototipo: prototipo.tipoEstructuraPrototipo,
          descripcionPrototipo: prototipo.descripcionPrototipo,
          plano: prototipo.plano ? prototipo.plano: null
        });
      }
    );
  }

  onSubmit(){
    if(this.form.valid){
      const planoSeleccionado = this.planos.find(plano => plano.idPlano === this.form.value.plano);

      // Si no se encuentra el plano, creamos uno nuevo con un terreno vacío
      const plano = planoSeleccionado || new Plano(0, "", "", "", new Terreno());
  
      const prototipoData= new Prototipo(
        this.prototipoId ?? 0,
        this.form.getRawValue().fechaCreacionPrototipo,
        this.form.getRawValue().tipoEstructuraPrototipo,
        this.form.getRawValue().descripcionPrototipo,
        plano
      )
      if(this.isEditMode){
        this.prototipoService.update(prototipoData).subscribe( ()=>{
            Swal.fire(
              {
                icon:'success',
                title: 'Prototipo Actualizado',
                text: `Prototipo ${this.form.value.tipoEstructuraPrototipo} actualizado exitosamente `,
              } ).then(() => {
                 this.router.navigate(['/prototipos']);
              });
          },
          (error)=>{
            console.error('Error al actualizar prototipo',error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo prototipo la evaluación. Inténtalo de nuevo.',
            });
          });
       }else{
        this.prototipoService.create(prototipoData).subscribe(()=>{
            Swal.fire(
              {
                icon:'success',
                title: 'Prototipo Creado',
                text: `Prototipo ${this.form.value.tipoEstructuraPrototipo} creado exitosamente`,
              } ).then(() => {
                 this.router.navigate(['/prototipos']);
              });
          },
          (error)=>{
            console.error('Error al crear evaluación',error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo crear el prototipo. Inténtalo de nuevo.',
            });
          });
 
       }
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Por favor, completa todos los campos requeridos.',
      });
    }
  }

}

