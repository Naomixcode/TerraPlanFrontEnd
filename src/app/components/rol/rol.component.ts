import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { ListarRolComponent } from './listarrol/listarrol.component';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ListarRolComponent],
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css'],
})
export class RolComponent {
  constructor(public route: ActivatedRoute) {}
}
