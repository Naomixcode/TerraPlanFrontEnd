import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarPlanoComponent } from './listarplano/listarplano.component'

@Component({
  selector: 'app-plano',
  standalone: true,
  imports: [RouterOutlet, ListarPlanoComponent],
  templateUrl: './plano.component.html',
  styleUrls: ['./plano.component.css'],
})
export class PlanoComponent {
  constructor(public route: ActivatedRoute) {}
}
