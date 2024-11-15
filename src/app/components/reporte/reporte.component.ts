import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReporteproyectoporestadoComponent } from './reporteproyectoporestado/reporteproyectoporestado.component';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [RouterOutlet, ReporteproyectoporestadoComponent],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent {
  constructor(public route: ActivatedRoute) {}
}
