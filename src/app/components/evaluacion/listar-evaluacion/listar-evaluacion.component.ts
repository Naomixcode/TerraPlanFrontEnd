import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Evaluacion } from '../../../models/Evaluacion';
import { EvaluacionService } from '../../../services/evaluacion.service';

@Component({
  selector: 'app-listar-evaluacion',
  standalone: true,
  imports: [
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './listar-evaluacion.component.html',
  styleUrls: ['./listar-evaluacion.component.css']
})

export class ListarEvaluacionComponent implements OnInit {
  dataSource: MatTableDataSource<Evaluacion> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'edit', 'delete'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private evaluacionService: EvaluacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.evaluacionService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.error('Error fetching evaluaciones:', error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editEvaluacion(evaluacion: Evaluacion): void {
    this.router.navigate(['/evaluaciones/editar', evaluacion.idEvaluacion]);
  }

  deleteEvaluacion(evaluacionId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.evaluacionService.delete(evaluacionId).subscribe({
          next: () => {
            Swal.fire(
              'Eliminado!',
              'La evaluación ha sido eliminada.',
              'success'
            );
            this.dataSource.data = this.dataSource.data.filter(evaluacion =>
              evaluacion.idEvaluacion !== evaluacionId
            ); // Recarga la lista después de eliminar una evaluación
          },
          error: (err) => {
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar la evaluación. Inténtalo de nuevo más tarde.',
              'error'
            );
          }
        });
      }
    });
  }
}