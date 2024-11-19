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
import { Notificacion } from '../../../models/Notificacion';
import { NotificacionService } from '../../../services/notificacion.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarnotificacion',
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
  templateUrl: './listarnotificacion.component.html',
  styleUrls: ['./listarnotificacion.component.css'],
})
export class ListarNotificacionComponent implements OnInit {
  notificationDataSource: MatTableDataSource<Notificacion> = new MatTableDataSource();
  paginatedNotificaciones: Notificacion[] = []; // Notificaciones visibles en la página actual
  pageSize = 5; // Tamaño de página inicial
  currentPage = 0; // Página actual

  @ViewChild(MatPaginator) notificationPaginator!: MatPaginator;

  constructor(private notificacionService: NotificacionService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  // Carga la lista de notificaciones
  loadNotifications(): void {
    this.notificacionService.list().subscribe((data) => {
      this.notificationDataSource.data = data;
      this.updatePaginatedNotificaciones();
    });
  }

  // Actualiza la lista de notificaciones según la página actual
  updatePaginatedNotificaciones(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedNotificaciones = this.notificationDataSource.filteredData.slice(
      startIndex,
      endIndex
    );
  }

  // Filtro para las notificaciones
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.notificationDataSource.filter = filterValue.trim().toLowerCase();
    this.currentPage = 0; // Reiniciar a la primera página después de filtrar
    this.updatePaginatedNotificaciones();
  }

  // Maneja el cambio de página
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedNotificaciones();
  }

  // Elimina una notificación por ID
  deleteNotification(idNotificacion: number): void {
    this.notificacionService.delete(idNotificacion).subscribe(() => {
      this.loadNotifications(); // Refresca la lista después de eliminar
    });
  }
}
