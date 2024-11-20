import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { ListarPermisoComponent } from './listarpermiso/listarpermiso.component';

@Component({
  selector: 'app-proyecto',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ListarPermisoComponent],
  templateUrl: './permiso.component.html',
  styleUrls: ['./permiso.component.css'],
})
export class PermisoComponent {
  constructor(public route: ActivatedRoute) {}
}
