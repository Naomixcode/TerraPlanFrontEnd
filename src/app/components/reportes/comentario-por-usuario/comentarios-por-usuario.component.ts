import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ReportesService } from '../../../services/reportes.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Importar MatSnackBar
import { Usuario } from '../../../models/Usuario';
import { ComentarioCountDTO } from '../../../models/ComentarioCountDTO';

Chart.register(...registerables);

@Component({
  selector: 'app-comentarios-por-usuario',
  standalone: true,
  imports: [
    BaseChartDirective,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule, // Importar MatSnackBarModule
    CommonModule,
    FormsModule,
  ],
  templateUrl: './comentarios-por-usuario.component.html',
  styleUrls: ['./comentarios-por-usuario.component.css'],
})
export class ComentariosPorUsuarioComponent implements OnInit {
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  chartLabels: string[] = []; // Nombres de usuarios
  chartType: ChartType = 'doughnut'; // Gráfico de tipo rosquilla
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

  // Cargar los comentarios por el usuario seleccionado
  cargarComentariosPorUsuario(): void {
    if (this.selectedUserId) {
      console.log('Cargando comentarios para el usuario con ID:', this.selectedUserId);
      this.reportesService.getComentariosPorUsuario(this.selectedUserId).subscribe({
        next: (data: ComentarioCountDTO[]) => {
          console.log('Datos recibidos del backend para el usuario seleccionado:', data);

          if (data.length > 0) {
            this.chartLabels = data.map((item) => item.nombreUsuario); // Extraer nombres de usuario
            this.chartData = [
              {
                data: data.map((item) => item.cantidadComentarios), // Extraer cantidad de comentarios
                backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'], // Colores dinámicos
                borderColor: '#3949AB',
                borderWidth: 1,
              },
            ];
          } else {
            // Mostrar snackbar si no hay datos
            this.snackBar.open(
              'El usuario seleccionado no tiene comentarios.',
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
          console.error('Error al cargar comentarios por usuario:', error);
        },
      });
    } else {
      console.warn('No se seleccionó un usuario.');
      this.chartLabels = []; // Limpiar el gráfico si no hay usuario seleccionado
      this.chartData = [];
    }
  }
}
