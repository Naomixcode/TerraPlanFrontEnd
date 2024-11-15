import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarPrototipoComponent } from './listar-prototipo/listar-prototipo.component';

@Component({
  selector: 'app-prototipo',
  standalone: true,
  imports: [RouterOutlet, ListarPrototipoComponent],
  templateUrl: './prototipo.component.html',
  styleUrls: ['./prototipo.component.css']
})
export class PrototipoComponent {
  constructor(public route:ActivatedRoute){}
}
