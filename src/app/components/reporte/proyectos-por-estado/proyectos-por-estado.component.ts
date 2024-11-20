import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ReportesService } from '../../../services/reportes.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Importar MatSnackBar
import { ProyectosCountByEstado } from '../../../models/ProyectosCountByEstado';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-proyectos-por-estado',
  standalone: true,
  imports: [
    BaseChartDirective,
    MatSnackBarModule,
    CommonModule
  ],
  templateUrl: './proyectos-por-estado.component.html',
  styleUrls: ['./proyectos-por-estado.component.css'],
})
export class ProyectosPorEstadoComponent implements OnInit {
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  chartLabels: string[] = []; // Estados de proyectos
  chartType: ChartType = 'bar'; // Gráfico de tipo barras
  chartLegend = true; // Mostrar leyenda
  chartData: ChartDataset[] = []; // Datos del gráfico

  constructor(
    private reportesService: ReportesService,
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarProyectosPorEstado(); // Cargar la data del backend
  }

  // Cargar la cantidad de proyectos por estado
  cargarProyectosPorEstado(): void {
    console.log('Cargando proyectos por estado...');
    this.reportesService.getProyectosPorEstado().subscribe({
      next: (data: ProyectosCountByEstado[]) => {
        console.log('Datos recibidos del backend:', data);

        if (data.length > 0) {
          this.chartLabels = data.map((item) => item.estado); // Extraer nombres de estados
          this.chartData = [
            {
              data: data.map((item) => item.cantidad), // Extraer cantidades por estado
              backgroundColor: ['#66BB6A', '#FFA726', '#29B6F6', '#AB47BC'], // Colores dinámicos
              borderColor: '#3949AB',
              borderWidth: 1,
              label: 'Proyectos por Estado',
            },
          ];
        } else {
          this.snackBar.open(
            'No se encontraron proyectos en ningún estado.',
            'Cerrar',
            {
              duration: 3000,
            }
          );
          this.chartLabels = [];
          this.chartData = [];
        }
      },
      error: (error) => {
        console.error('Error al cargar proyectos por estado:', error);
      },
    });
  }
}
