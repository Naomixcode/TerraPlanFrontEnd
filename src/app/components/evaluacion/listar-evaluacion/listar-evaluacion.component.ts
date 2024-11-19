import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card'; // Importar MatCardModule
import { CommonModule } from '@angular/common';
import { Evaluacion } from '../../../models/Evaluacion';
import { EvaluacionService } from '../../../services/evaluacion.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarevaluacion',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './listarevaluacion.component.html',
  styleUrls: ['./listarevaluacion.component.css'],
})
export class ListarEvaluacionComponent implements OnInit {
  evaluacionDataSource: MatTableDataSource<Evaluacion> = new MatTableDataSource();
  paginatedEvaluaciones: Evaluacion[] = []; // Evaluaciones visibles en la página actual
  pageSize = 5; // Tamaño de página inicial
  currentPage = 0; // Página actual

  @ViewChild(MatPaginator) evaluacionPaginator!: MatPaginator;

  constructor(private evaluacionService: EvaluacionService) {}

  ngOnInit(): void {
    this.loadEvaluaciones();
  }

  // Carga la lista de evaluaciones
  loadEvaluaciones(): void {
    this.evaluacionService.list().subscribe((data) => {
      this.evaluacionDataSource.data = data;
      this.updatePaginatedEvaluaciones();
    });
  }

  // Actualiza la lista de evaluaciones según la página actual
  updatePaginatedEvaluaciones(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEvaluaciones = this.evaluacionDataSource.filteredData.slice(
      startIndex,
      endIndex
    );
  }

  // Filtro para las evaluaciones
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.evaluacionDataSource.filter = filterValue.trim().toLowerCase();
    this.currentPage = 0; // Reiniciar a la primera página después de filtrar
    this.updatePaginatedEvaluaciones();
  }

  // Maneja el cambio de página
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedEvaluaciones();
  }

  // Elimina una evaluación por ID
  deleteEvaluacion(idEvaluacion: number): void {
    this.evaluacionService.delete(idEvaluacion).subscribe(() => {
      this.loadEvaluaciones(); // Refresca la lista después de eliminar
    });
  }
}
