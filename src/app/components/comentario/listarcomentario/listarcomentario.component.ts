import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comentario } from '../../../models/Comentario';
import { ComentarioService } from '../../../services/comentario.service';
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
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listarcomentario',
  standalone: true,
  imports: [MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    RouterModule],
  templateUrl: './listarcomentario.component.html',
  styleUrl: './listarcomentario.component.css'
})
export class ListarcomentarioComponent {
  dataSource: MatTableDataSource<Comentario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6', 'edit', 'delete'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private comentarioService: ComentarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.comentarioService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.error('Error fetching comentarios:', error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editComentario(comentario: Comentario) {
    this.router.navigate(['/comentarios/editar', comentario.idComentario]);
  }

  deleteComentario(comentarioId: number): void {
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
        this.comentarioService.delete(comentarioId).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El comentario ha sido eliminado.', 'success');
            this.dataSource.data = this.dataSource.data.filter(comentario => comentario.idComentario !== comentarioId);
          },
          error: (err) => {
            Swal.fire('Error', 'Hubo un problema al eliminar el comentario. Inténtalo de nuevo más tarde.', 'error');
          }
        });
      }
    });
  }
}
