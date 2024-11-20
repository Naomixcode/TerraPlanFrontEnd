import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { ListarPlanoComponent } from './listarplano/listarplano.component';

@Component({
  selector: 'app-plano',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ListarPlanoComponent],
  templateUrl: './plano.component.html',
  styleUrls: ['./plano.component.css'],
})
export class PlanoComponent {
  constructor(public route: ActivatedRoute) {}
}
