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
import { PrototipoMaterial } from '../../../models/PrototipoMaterial';
import { PrototipoMaterialService } from '../../../services/prototipomaterial.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarprototipomaterial',
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
  templateUrl: './listarprototipomaterial.component.html',
  styleUrls: ['./listarprototipomaterial.component.css'],
})
export class ListarPrototipoMaterialComponent implements OnInit {
  prototipoMaterialDataSource: MatTableDataSource<PrototipoMaterial> = new MatTableDataSource();
  paginatedPrototipoMateriales: PrototipoMaterial[] = []; // Prototipo-Material visibles en la página actual
  pageSize = 5; // Tamaño de página inicial
  currentPage = 0; // Página actual

  @ViewChild(MatPaginator) prototipoMaterialPaginator!: MatPaginator;

  constructor(private prototipoMaterialService: PrototipoMaterialService) {}

  ngOnInit(): void {
    this.loadPrototipoMaterials();
  }

  // Carga la lista de Prototipo-Material
  loadPrototipoMaterials(): void {
    this.prototipoMaterialService.list().subscribe((data) => {
      this.prototipoMaterialDataSource.data = data;
      this.updatePaginatedPrototipoMateriales();
    });
  }

  // Actualiza la lista de Prototipo-Material según la página actual
  updatePaginatedPrototipoMateriales(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPrototipoMateriales = this.prototipoMaterialDataSource.filteredData.slice(
      startIndex,
      endIndex
    );
  }

  // Filtro para Prototipo-Material
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.prototipoMaterialDataSource.filter = filterValue.trim().toLowerCase();
    this.currentPage = 0; // Reiniciar a la primera página después de filtrar
    this.updatePaginatedPrototipoMateriales();
  }

  // Maneja el cambio de página
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedPrototipoMateriales();
  }

  // Elimina un Prototipo-Material por ID
  deletePrototipoMaterial(idPrototipoMaterial: number): void {
    this.prototipoMaterialService.delete(idPrototipoMaterial).subscribe(() => {
      this.loadPrototipoMaterials(); // Refresca la lista después de eliminar
    });
  }
}
