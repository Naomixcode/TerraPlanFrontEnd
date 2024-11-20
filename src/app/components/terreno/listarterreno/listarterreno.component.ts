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
import { Terreno } from '../../../models/Terreno';
import { TerrenoService } from '../../../services/terreno.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarterreno',
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
  templateUrl: './listarterreno.component.html',
  styleUrls: ['./listarterreno.component.css'],
})
export class ListarTerrenoComponent implements OnInit {
  terrenoDataSource: MatTableDataSource<Terreno> = new MatTableDataSource();
  paginatedTerrenos: Terreno[] = []; // Terrenos visibles en la página actual
  pageSize = 5; // Tamaño de página inicial
  currentPage = 0; // Página actual

  @ViewChild(MatPaginator) terrenoPaginator!: MatPaginator;

  constructor(private terrenoService: TerrenoService) {}

  ngOnInit(): void {
    this.loadTerrenos();
  }

  // Carga la lista de Terrenos
  loadTerrenos(): void {
    this.terrenoService.list().subscribe((data) => {
      this.terrenoDataSource.data = data;
      this.updatePaginatedTerrenos();
    });
  }

  // Actualiza la lista de Terrenos según la página actual
  updatePaginatedTerrenos(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTerrenos = this.terrenoDataSource.filteredData.slice(
      startIndex,
      endIndex
    );
  }

  // Filtro para Terrenos
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.terrenoDataSource.filter = filterValue.trim().toLowerCase();
    this.currentPage = 0; // Reiniciar a la primera página después de filtrar
    this.updatePaginatedTerrenos();
  }

  // Maneja el cambio de página
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedTerrenos();
  }

  // Elimina un Terreno por ID
  deleteTerreno(idTerreno: number): void {
    this.terrenoService.delete(idTerreno).subscribe(() => {
      this.loadTerrenos(); // Refresca la lista después de eliminar
    });
  }
}
