import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { Prototipo } from '../../../models/Prototipo';
import { PrototipoService } from '../../../services/prototipo.service';
import Swal from 'sweetalert2';

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
  templateUrl: './listar-prototipo.component.html',
  styleUrls: ['./listar-prototipo.component.css']
})

export class ListarPrototipoComponent implements OnInit {
  dataSource: MatTableDataSource<Prototipo> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'edit', 'delete'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private prototipoService: PrototipoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.prototipoService.list().subscribe((data) => {
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

  editPrototipo(prototipo: Prototipo): void {
    this.router.navigate(['/prototipos/editar', prototipo.idPrototipo]);
  }

  deletePrototipo(prototipoId: number): void {
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
        this.prototipoService.delete(prototipoId).subscribe({
          next: () => {
            Swal.fire(
              'Eliminado!',
              'El prototipo ha sido eliminada.',
              'success'
            );
            this.dataSource.data = this.dataSource.data.filter(prototipo =>
              prototipo.idPrototipo !== prototipoId
            ); // Recarga la lista después de eliminar una evaluación
          },
          error: (err) => {
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el prototipo. Inténtalo de nuevo más tarde.',
              'error'
            );
          }
        });
      }
    });
  }
}