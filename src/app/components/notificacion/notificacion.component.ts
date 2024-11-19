import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { ListarNotificacionComponent } from './listarnotificacion/listarnotificacion.component';

@Component({
  selector: 'app-notificacion',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ListarNotificacionComponent], // Incluye CommonModule y el componente necesario
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css'],
})
export class NotificacionComponent {
  constructor(public route: ActivatedRoute) {}
}
