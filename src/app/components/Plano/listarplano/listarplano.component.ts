import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Plano } from '../../../models/Plano';
import { PlanoService } from '../../../services/plano.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarplano',
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
  templateUrl: './listarplano.component.html',
  styleUrls: ['./listarplano.component.css'],
})
export class ListarPlanoComponent implements OnInit {
  planoDataSource: MatTableDataSource<Plano> = new MatTableDataSource();
  paginatedPlanos: Plano[] = []; // Planos visibles en la página actual
  pageSize = 5; // Tamaño de página inicial
  currentPage = 0; // Página actual

  @ViewChild(MatPaginator) planoPaginator!: MatPaginator;

  constructor(private planoService: PlanoService) {}

  ngOnInit(): void {
    this.loadPlanos();
  }

  // Carga la lista de planos
  loadPlanos(): void {
    this.planoService.list().subscribe((data) => {
      this.planoDataSource.data = data;
      this.updatePaginatedPlanos();
    });
  }

  // Actualiza la lista de planos según la página actual
  updatePaginatedPlanos(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPlanos = this.planoDataSource.filteredData.slice(
      startIndex,
      endIndex
    );
  }

  // Filtro para los planos
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.planoDataSource.filter = filterValue.trim().toLowerCase();
    this.currentPage = 0; // Reiniciar a la primera página después de filtrar
    this.updatePaginatedPlanos();
  }

  // Maneja el cambio de página
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedPlanos();
  }

  // Elimina un plano por ID
  deletePlano(idPlano: number): void {
    this.planoService.delete(idPlano).subscribe(() => {
      this.loadPlanos(); // Refresca la lista después de eliminar
    });
  }
}
