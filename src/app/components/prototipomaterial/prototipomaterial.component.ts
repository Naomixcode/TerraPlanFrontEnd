import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { ListarPrototipoMaterialComponent } from './listarprototipomaterial/listarprototipomaterial.component';

@Component({
  selector: 'app-prototipomaterial',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ListarPrototipoMaterialComponent],
  templateUrl: './prototipomaterial.component.html',
  styleUrls: ['./prototipomaterial.component.css'],
})
export class PrototipoMaterialComponent {
  constructor(public route: ActivatedRoute) {}
}
