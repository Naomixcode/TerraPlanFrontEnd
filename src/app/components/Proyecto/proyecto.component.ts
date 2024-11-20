import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { ListarProyectoComponent } from './listarproyecto/listarproyecto.component';

@Component({
  selector: 'app-proyecto',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ListarProyectoComponent],
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css'],
})
export class ProyectoComponent {
  constructor(public route: ActivatedRoute) {}
}
