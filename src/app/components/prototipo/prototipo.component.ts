import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { ListarPrototipoComponent } from './listarprototipo/listarprototipo.component';

@Component({
  selector: 'app-prototipo',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ListarPrototipoComponent],
  templateUrl: './prototipo.component.html',
  styleUrls: ['./prototipo.component.css'],
})
export class PrototipoComponent {
  constructor(public route: ActivatedRoute) {}
}
