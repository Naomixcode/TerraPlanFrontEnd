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
import { Permiso } from '../../../models/Permiso';
import { PermisoService } from '../../../services/permiso.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarpermiso',
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
  templateUrl: './listarpermiso.component.html',
  styleUrls: ['./listarpermiso.component.css'],
})
export class ListarPermisoComponent implements OnInit {
  permisoDataSource: MatTableDataSource<Permiso> = new MatTableDataSource();
  paginatedPermisos: Permiso[] = []; // Permisos visibles en la página actual
  pageSize = 5; // Tamaño de página inicial
  currentPage = 0; // Página actual

  @ViewChild(MatPaginator) permisoPaginator!: MatPaginator;

  constructor(private permisoService: PermisoService) {}

  ngOnInit(): void {
    this.loadPermisos();
  }

  // Carga la lista de permisos
  loadPermisos(): void {
    this.permisoService.list().subscribe((data) => {
      this.permisoDataSource.data = data;
      this.updatePaginatedPermisos();
    });
  }

  // Actualiza la lista de permisos según la página actual
  updatePaginatedPermisos(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPermisos = this.permisoDataSource.filteredData.slice(
      startIndex,
      endIndex
    );
  }

  // Filtro para los permisos
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.permisoDataSource.filter = filterValue.trim().toLowerCase();
    this.currentPage = 0; // Reiniciar a la primera página después de filtrar
    this.updatePaginatedPermisos();
  }

  // Maneja el cambio de página
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedPermisos();
  }

  // Elimina un permiso por ID
  deletePermiso(idPermiso: number): void {
    this.permisoService.delete(idPermiso).subscribe(() => {
      this.loadPermisos(); // Refresca la lista después de eliminar
    });
  }
}
