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
import { Material } from '../../../models/Material';
import { MaterialService } from '../../../services/material.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarmaterial',
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
  templateUrl: './listarmaterial.component.html',
  styleUrls: ['./listarmaterial.component.css'],
})
export class ListarMaterialComponent implements OnInit {
  materialDataSource: MatTableDataSource<Material> = new MatTableDataSource();
  paginatedMaterials: Material[] = []; // Materiales visibles en la página actual
  pageSize = 5; // Tamaño de página inicial
  currentPage = 0; // Página actual

  constructor(private materialService: MaterialService) {}

  ngOnInit(): void {
    this.loadMaterials();
  }

  // Carga la lista de Materiales
  loadMaterials(): void {
    this.materialService.list().subscribe((data) => {
      this.materialDataSource.data = data;
      this.updatePaginatedMaterials();
    });
  }

  // Actualiza la lista de Materiales según la página actual
  updatePaginatedMaterials(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedMaterials = this.materialDataSource.filteredData.slice(
      startIndex,
      endIndex
    );
  }

  // Filtro para Materiales
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.materialDataSource.filter = filterValue.trim().toLowerCase();
    this.currentPage = 0; // Reiniciar a la primera página después de filtrar
    this.updatePaginatedMaterials();
  }

  // Devuelve la clase CSS según el tipo de material
  getCardClass(tipoMaterial: string): string {
    const classMap: { [key: string]: string } = {
      'Suelos adecuados': 'material-suelos-adecuados',
      'Suelos tolerables': 'material-suelos-tolerables',
      Arena: 'material-arena',
      Grava: 'material-grava',
      'Piedra triturada': 'material-piedra-triturada',
      Arcilla: 'material-arcilla',
      Limo: 'material-limo',
      Geotextiles: 'material-geotextiles',
      Geomallas: 'material-geomallas',
      'Escorias de alto horno': 'material-escorias',
      'Cenizas volantes': 'material-cenizas',
      'Residuos de construcción y demolición reciclados': 'material-residuos',
      'Áridos ligeros de arcilla expandida': 'material-aridos',
      'Poliestireno expandido (EPS)': 'material-eps',
      'Tierra cementada': 'material-tierra-cementada',
    };

    return classMap[tipoMaterial] || 'material-default';
  }

  // Maneja el cambio de página
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedMaterials();
  }

  // Elimina un Material por ID
  deleteMaterial(idMaterial: number): void {
    this.materialService.delete(idMaterial).subscribe(() => {
      this.loadMaterials(); // Refresca la lista después de eliminar
    });
  }
}
