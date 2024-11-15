import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Plano } from '../../../models/Plano';
import { PlanoService } from '../../../services/plano.service';
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
  selector: 'app-listarplano',
  standalone: true,
  imports: [
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './listarplano.component.html',
  styleUrls: ['./listarplano.component.css']
})
export class ListarPlanoComponent implements OnInit {
  dataSource: MatTableDataSource<Plano> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'edit', 'delete'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private planoService: PlanoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.planoService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.error('Error fetching planos:', error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editPlano(plano: Plano) {
    this.router.navigate(['/planos/editar', plano.idPlano]);
  }

  deletePlano(planoId: number): void {
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
        this.planoService.delete(planoId).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El plano ha sido eliminado.', 'success');
            this.dataSource.data = this.dataSource.data.filter(plano => plano.idPlano !== planoId);
          },
          error: (err) => {
            Swal.fire('Error', 'Hubo un problema al eliminar el plano. Inténtalo de nuevo más tarde.', 'error');
          }
        });
      }
    });
  }
}
