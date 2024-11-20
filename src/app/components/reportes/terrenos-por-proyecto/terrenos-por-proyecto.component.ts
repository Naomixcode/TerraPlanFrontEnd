import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ReportesService } from '../../../services/reportes.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TerrenoCountByProyectoDTO } from '../../../models/TerrenoCountByProyectoDTO';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

Chart.register(...registerables);

@Component({
  selector: 'app-terrenos-por-proyecto',
  standalone: true,
  imports: [
    BaseChartDirective,
    MatSnackBarModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './terrenos-por-proyecto.component.html',
  styleUrls: ['./terrenos-por-proyecto.component.css'],
})
export class TerrenosPorProyectoComponent implements OnInit {
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  chartLabels: string[] = []; // Nombres de proyectos
  chartType: ChartType = 'line'; // Gráfico de líneas
  chartLegend = true; // Mostrar leyenda
  chartData: ChartDataset[] = []; // Datos del gráfico

  constructor(
    private reportesService: ReportesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarTerrenosPorProyecto(); // Cargar los datos de terrenos por proyecto
  }

  cargarTerrenosPorProyecto(): void {
    console.log('Cargando datos de terrenos por proyecto...');
    this.reportesService.getTerrenosPorProyecto().subscribe({
      next: (data: TerrenoCountByProyectoDTO[]) => {
        console.log('Datos recibidos del backend:', data);

        if (data.length > 0) {
          this.chartLabels = data.map((item) => item.proyectoNombre); // Nombres de proyectos
          this.chartData = [
            {
              data: data.map((item) => item.numTerrenos), // Cantidad de terrenos
              label: 'Número de Terrenos',
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: '#4BC0C0',
              pointBackgroundColor: '#4BC0C0',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#4BC0C0',
              fill: true,
              tension: 0.4, // Suavizar la línea
            },
          ];
        } else {
          this.snackBar.open(
            'No hay terrenos asociados a proyectos.',
            'Cerrar',
            { duration: 3000 }
          );
          this.chartLabels = [];
          this.chartData = [];
        }
      },
      error: (error) => {
        console.error('Error al cargar terrenos por proyecto:', error);
      },
    });
  }
}
