import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { ListarEvaluacionComponent } from './listarevaluacion/listarevaluacion.component';

@Component({
  selector: 'app-evaluacion',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ListarEvaluacionComponent],
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css'],
})
export class EvaluacionComponent {
  constructor(public route: ActivatedRoute) {}
}
