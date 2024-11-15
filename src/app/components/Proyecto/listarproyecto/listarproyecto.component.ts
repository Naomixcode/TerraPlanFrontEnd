import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Proyecto } from '../../../models/Proyecto';
import { ProyectoService } from '../../../services/proyecto.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router'; // Import RouterModule instead of Router

import Swal from 'sweetalert2';

@Component({
  selector: 'app-listarproyecto',
  standalone: true,
  imports: [
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    RouterModule // Import RouterModule here
  ],
  templateUrl: './listarproyecto.component.html',
  styleUrls: ['./listarproyecto.component.css']
})
export class ListarProyectoComponent implements OnInit {
  dataSource: MatTableDataSource<Proyecto> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'edit', 'delete'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private proyectoService: ProyectoService,
    private router: Router // Make sure to inject Router here
  ) {}

  ngOnInit(): void {
    this.proyectoService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.error('Error fetching proyectos:', error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editProyecto(project: Proyecto) {
    this.router.navigate(['/proyectos/editar', project.idProyecto]);
  }

  deleteProyecto(proyectoId: number): void {
    console.log('Eliminando proyecto con ID:', proyectoId);
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Eliminando proyecto con ID:', proyectoId);
        this.proyectoService.delete(proyectoId).subscribe({
          next: () => {
            Swal.fire(
              '¡Eliminado!',
              'El proyecto ha sido eliminado.',
              'success'
            );
            // Actualizar la lista de proyectos después de eliminar
            this.dataSource.data = this.dataSource.data.filter(proyecto => 
              proyecto.idProyecto !== proyectoId);
          },
          error: (err) => {
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el proyecto. Inténtalo de nuevo más tarde.',
              'error'
            );
          }
        });
      }
    });
  }
}
