import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../../../services/proyecto.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table'; // Importar módulo de tabla de Angular Material

@Component({
  selector: 'app-reporteproyectoporestado',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatTableModule],
  templateUrl: './reporteproyectoporestado.component.html',
  styleUrl: './reporteproyectoporestado.component.css'
})
export class ReporteproyectoporestadoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaEstados: { value: string; viewValue: string }[] = [
    { value: 'Activo', viewValue: 'Activo' },
    { value: 'En Espera', viewValue: 'En Espera' },
    { value: 'Completado', viewValue: 'Completado' }
  ];
  
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'estado']; // Columnas de la tabla
  proyectos: any[] = []; // Datos de los proyectos a mostrar en la tabla

  constructor(
    private dS: ProyectoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      selectedEstado: ['Activo'] // Valor por defecto
    });

    this.obtenerProyectosPorEstado(this.form.get('selectedEstado')?.value);

    // Actualizar la tabla cuando se cambie el estado seleccionado
    this.form.get('selectedEstado')?.valueChanges.subscribe(value => {
      console.log('Estado seleccionado:', value); // Depuración
      this.obtenerProyectosPorEstado(value);
    });
  }

  // Función para obtener los proyectos por estado
  obtenerProyectosPorEstado(estadoProyecto: string): void {
    console.log('Obteniendo proyectos para el estado:', estadoProyecto); // Depuración
    this.dS.getProyectosporEstado(estadoProyecto).subscribe((data: any[]) => {
      console.log('Datos recibidos:', data); // Depuración
      this.proyectos = data; // Asignar los proyectos al arreglo para la tabla
    });
  }
}
