import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ReportesService } from '../../../services/reportes.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Importar MatSnackBar
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../models/Usuario';
import { ProyectoCountDTO } from '../../../models/ProyectoCountDTO'; // Nueva interfaz

Chart.register(...registerables);

@Component({
  selector: 'app-proyectos-por-usuario',
  standalone: true,
  imports: [
    BaseChartDirective,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './proyectos-por-usuario.component.html',
  styleUrls: ['./proyectos-por-usuario.component.css'],
})
export class ProyectosPorUsuarioComponent implements OnInit {
  chartOptions: ChartOptions = {
    responsive: true,
    indexAxis: 'y', // Configurar para gráfico horizontal
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  chartLabels: string[] = []; // Nombres de usuarios
  chartType: ChartType = 'bar'; // Gráfico de tipo barras
  chartLegend = true; // Mostrar leyenda
  chartData: ChartDataset[] = []; // Datos del gráfico

  usuarios: Usuario[] = []; // Lista de usuarios
  selectedUserId: number | null = null; // Usuario seleccionado

  constructor(
    private reportesService: ReportesService,
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios(); // Cargar la lista de usuarios
  }

  // Cargar la lista de usuarios
  cargarUsuarios(): void {
    console.log('Iniciando carga de usuarios...');
    this.reportesService.getUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        console.log('Usuarios obtenidos desde el backend:', usuarios);
        this.usuarios = usuarios;
      },
      error: (error) => {
        console.error('Error al cargar los usuarios:', error);
      },
    });
  }

  // Cargar los proyectos por el usuario seleccionado
  cargarProyectosPorUsuario(): void {
    if (this.selectedUserId) {
      console.log('Cargando proyectos para el usuario con ID:', this.selectedUserId);
      this.reportesService.getProyectosPorUsuario(this.selectedUserId).subscribe({
        next: (data: ProyectoCountDTO[]) => {
          console.log('Datos recibidos del backend para el usuario seleccionado:', data);

          if (data.length > 0) {
            this.chartLabels = data.map((item) => item.nombreUsuario); // Extraer nombres de usuario
            this.chartData = [
              {
                data: data.map((item) => item.cantidadProyectos), // Extraer cantidad de proyectos
                backgroundColor: ['#66BB6A', '#FFA726', '#29B6F6'], // Colores dinámicos
                borderColor: '#3949AB',
                borderWidth: 1,
                label: 'Proyectos por Usuario',
              },
            ];
          } else {
            // Mostrar snackbar si no hay datos
            this.snackBar.open(
              'El usuario seleccionado no tiene proyectos.',
              'Cerrar',
              {
                duration: 3000, // Duración en milisegundos
              }
            );
            this.chartLabels = [];
            this.chartData = [];
          }
        },
        error: (error) => {
          console.error('Error al cargar proyectos por usuario:', error);
        },
      });
    } else {
      console.warn('No se seleccionó un usuario.');
      this.chartLabels = []; // Limpiar el gráfico si no hay usuario seleccionado
      this.chartData = [];
    }
  }
}
