import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Material } from '../../../models/Material';
import { MaterialService } from '../../../services/material.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-listarmaterial',
  standalone: true,
  imports: [MatTableModule, MatIconModule,RouterModule, MatPaginatorModule, CommonModule],
  templateUrl: './listarmaterial.component.html',
  styleUrl: './listarmaterial.component.css',
})
export class ListarmaterialComponent implements OnInit {
  dataSource: MatTableDataSource<Material> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'accion01','accion02'];
  cantidadRegistros: number=0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dS: MaterialService) {}
  
  ngOnInit(): void {
    this.dS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.cantidadRegistros = data.length;
    });
  }

  eliminar(id: number) {
    this.dS.delete(id).subscribe((data) => {
      this.dS.list().subscribe((data) => {
        this.dS.setList(data);
      });
    });
  }
}
