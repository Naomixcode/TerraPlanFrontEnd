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
import { Prototipo } from '../../../models/Prototipo';
import { PrototipoService } from '../../../services/prototipo.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarprototipo',
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
  templateUrl: './listarprototipo.component.html',
  styleUrls: ['./listarprototipo.component.css'],
})
export class ListarPrototipoComponent implements OnInit {
  prototipoDataSource: MatTableDataSource<Prototipo> = new MatTableDataSource();
  paginatedPrototipos: Prototipo[] = []; // Prototipos visibles en la página actual
  pageSize = 5; // Tamaño de página inicial
  currentPage = 0; // Página actual

  @ViewChild(MatPaginator) prototipoPaginator!: MatPaginator;

  constructor(private prototipoService: PrototipoService) {}

  ngOnInit(): void {
    this.loadPrototipos();
  }

  // Carga la lista de prototipos
  loadPrototipos(): void {
    this.prototipoService.list().subscribe((data) => {
      this.prototipoDataSource.data = data;
      this.updatePaginatedPrototipos();
    });
  }

  // Actualiza la lista de prototipos según la página actual
  updatePaginatedPrototipos(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPrototipos = this.prototipoDataSource.filteredData.slice(
      startIndex,
      endIndex
    );
  }

  // Filtro para los prototipos
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.prototipoDataSource.filter = filterValue.trim().toLowerCase();
    this.currentPage = 0; // Reiniciar a la primera página después de filtrar
    this.updatePaginatedPrototipos();
  }

  // Maneja el cambio de página
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedPrototipos();
  }

  // Elimina un prototipo por ID
  deletePrototipo(idPrototipo: number): void {
    this.prototipoService.delete(idPrototipo).subscribe(() => {
      this.loadPrototipos(); // Refresca la lista después de eliminar
    });
  }
}
