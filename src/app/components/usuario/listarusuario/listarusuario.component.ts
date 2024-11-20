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
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarusuario',
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
  templateUrl: './listarusuario.component.html',
  styleUrls: ['./listarusuario.component.css'],
})
export class ListarUsuarioComponent implements OnInit {
  userDataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  paginatedUsers: Usuario[] = []; // Usuarios visibles en la página actual
  pageSize = 5; // Tamaño de página inicial
  currentPage = 0; // Página actual

  @ViewChild(MatPaginator) userPaginator!: MatPaginator;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Carga la lista de Usuarios
  loadUsers(): void {
    this.usuarioService.list().subscribe((data) => {
      this.userDataSource.data = data;
      this.updatePaginatedUsers();
    });
  }

  // Actualiza la lista de Usuarios según la página actual
  updatePaginatedUsers(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.userDataSource.filteredData.slice(
      startIndex,
      endIndex
    );
  }

  // Filtro para Usuarios
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userDataSource.filter = filterValue.trim().toLowerCase();
    this.currentPage = 0; // Reiniciar a la primera página después de filtrar
    this.updatePaginatedUsers();
  }

  // Maneja el cambio de página
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedUsers();
  }

  // Elimina un Usuario por ID
  deleteUser(idUsuario: number): void {
    this.usuarioService.delete(idUsuario).subscribe(() => {
      this.loadUsers(); // Refresca la lista después de eliminar
    });
  }
}
