import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { ListarTerrenoComponent } from './listarterreno/listarterreno.component';

@Component({
  selector: 'app-terreno',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ListarTerrenoComponent],
  templateUrl: './terreno.component.html',
  styleUrls: ['./terreno.component.css'],
})
export class TerrenoComponent {
  constructor(public route: ActivatedRoute) {}
}
