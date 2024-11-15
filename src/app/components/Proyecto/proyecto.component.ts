import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarProyectoComponent } from './listarproyecto/listarproyecto.component';

@Component({
  selector: 'app-proyecto',
  standalone: true,
  imports: [RouterOutlet, ListarProyectoComponent],
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css'],
})
export class ProyectoComponent {
  constructor(public route: ActivatedRoute) {}
}
