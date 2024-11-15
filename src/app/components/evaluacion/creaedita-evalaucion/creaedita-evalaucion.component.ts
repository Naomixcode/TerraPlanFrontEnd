import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Terreno } from '../../../models/Terreno'; 
import { TerrenoService } from '../../../services/terreno.service'; 
import { Router, ActivatedRoute } from '@angular/router'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatSelectModule } from '@angular/material/select'; 
import { MatButtonModule } from '@angular/material/button'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import Swal from 'sweetalert2'; 
import { EvaluacionService } from '../../../services/evaluacion.service';
import { Evaluacion } from '../../../models/Evaluacion';

@Component({
  selector: 'app-creaedita-evalaucion',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatInputModule, CommonModule, MatFormFieldModule, 
    MatSelectModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule
  ],
  templateUrl: './creaedita-evalaucion.component.html',
  styleUrl: './creaedita-evalaucion.component.css'
})
export class CreaeditaEvalaucionComponent implements OnInit {
  form:  FormGroup;
  terrenos: Terreno[]=[];
  isEditMode = false;
  evaluacionId: number | null = null;
  constructor(
    private fb: FormBuilder, 
    private terrenoService: TerrenoService,
    private evaluacionService: EvaluacionService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.form=fb.group({
      idEvaluacion: [{value:'',disabled:true}],
      fechaEvaluacion: [null, Validators.required],
      comentarioEvaluacion: [null, Validators.required],
      resultadoEvaluacion: [null, Validators.required],
      terreno: [null, Validators.required],
    });

  }
  ngOnInit()
  {
    this.loadTerrenos();
    this.checkEditMode();
  }
  loadTerrenos(){
    this.terrenoService.list().subscribe(
      (data: Terreno[])=>{
        this.terrenos=data;
      },
      (error)=>{
        console.error('Error al cargar terrenos',error);
      }
    );
  }
  checkEditMode(){
    this.route.paramMap.subscribe(params=>{
      const evaluacionId=params.get('id');
      if(evaluacionId){
        this.isEditMode=true;
        this.evaluacionId=+evaluacionId;
        this.loadEvaluacionData(this.evaluacionId); // Load evaluacion data when editing
      }
    });
  }
  loadEvaluacionData(id: number){
    this.evaluacionService.getById(id).subscribe(
      (evaluacion:Evaluacion)=>{
        this.form.patchValue({
          idEvaluacion: evaluacion.idEvaluacion,
          fechaEvaluacion: evaluacion.fechaEvaluacion,
          comentarioEvaluacion: evaluacion.comentariosEvaluacion,
          resultadoEvaluacion: evaluacion.resultadoEvaluacion,
          terreno: evaluacion.terreno ? evaluacion.terreno:null
        });
      }
    );
  }

  onSubmit(){
    if(this.form.valid){
      const evaluacionData= new Evaluacion(
        this.evaluacionId ?? 0,
        this.form.getRawValue().fechaEvaluacion,
        this.form.getRawValue().comentarioEvaluacion,
        this.form.getRawValue().resultadoEvaluacion,
        this.terrenos.find(terreno=>terreno.idTerreno ===this.form.value.terreno)|| new Terreno()

      )
      if(this.isEditMode){
        this.evaluacionService.update(evaluacionData).subscribe( ()=>{
            Swal.fire(
              {
                icon:'success',
                title: 'Evaluación Actualizada',
                text: `Evaluacion ${this.form.value.comentarioEvaluacion} actualizado exitosamente `,
              } ).then(() => {
                 this.router.navigate(['/evaluaciones']);
              });
          },
          (error)=>{
            console.error('Error al actualizar evaluación',error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo actualizar la evaluación. Inténtalo de nuevo.',
            });
          });
       }else{
        this.evaluacionService.create(evaluacionData).subscribe(()=>{
            Swal.fire(
              {
                icon:'success',
                title: 'Evaluación Creada',
                text: `Evaluacion ${this.form.value.comentarioEvaluacion} creado exitosamente`,
              } ).then(() => {
                 this.router.navigate(['/evaluaciones']);
              });
          },
          (error)=>{
            console.error('Error al crear evaluación',error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo crear la evaluación. Inténtalo de nuevo.',
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
