import { Component, OnInit, ViewChild } from '@angular/core';
import { Role } from '../../../models/Role'; 
import { RoleService } from '../../../services/rol.service'; 
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listarrole',
  standalone: true,
  imports: [
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './listarrole.component.html',
  styleUrls: ['./listarrole.component.css']
})
export class ListarRoleComponent implements OnInit {
  dataSource: MatTableDataSource<Role> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'edit', 'delete'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private roleService: RoleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roleService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.error('Error fetching roles:', error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editRole(role: Role): void {
    // Navegar a la ruta de edición con el ID del rol
    this.router.navigate(['/rol/editar', role.idRol]);
  }

  deleteRole(roleId: number): void {
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
        this.roleService.delete(roleId).subscribe({
          next: () => {
            Swal.fire(
              '¡Eliminado!',
              'El rol ha sido eliminado.',
              'success'
            );
            this.dataSource.data = this.dataSource.data.filter(role => role.idRol !== roleId);
          },
          error: () => {
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el rol. Inténtalo de nuevo más tarde.',
              'error'
            );
          }
        });
      }
    });
  }
}
