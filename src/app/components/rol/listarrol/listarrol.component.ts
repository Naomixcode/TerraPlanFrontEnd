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
import { Rol } from '../../../models/Rol';
import { RolService } from '../../../services/rol.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarrol',
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
  providers: [RolService],
  templateUrl: './listarrol.component.html',
  styleUrls: ['./listarrol.component.css'],
})
export class ListarRolComponent implements OnInit {
  roleDataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  paginatedRoles: Rol[] = []; // Roles visibles en la página actual
  pageSize = 5; // Tamaño de página inicial
  currentPage = 0; // Página actual

  @ViewChild(MatPaginator) rolePaginator!: MatPaginator;

  constructor(private rolService: RolService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  // Carga la lista de Roles
  loadRoles(): void {
    this.rolService.list().subscribe((data) => {
      this.roleDataSource.data = data;
      this.updatePaginatedRoles();
    });
  }

  // Actualiza la lista de Roles según la página actual
  updatePaginatedRoles(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedRoles = this.roleDataSource.filteredData.slice(
      startIndex,
      endIndex
    );
  }

  // Filtro para Roles
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.roleDataSource.filter = filterValue.trim().toLowerCase();
    this.currentPage = 0; // Reiniciar a la primera página después de filtrar
    this.updatePaginatedRoles();
  }

  // Maneja el cambio de página
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedRoles();
  }

  // Elimina un Rol por ID
  deleteRole(idRol: number): void {
    this.rolService.delete(idRol).subscribe(() => {
      this.loadRoles(); // Refresca la lista después de eliminar
    });
  }
}
