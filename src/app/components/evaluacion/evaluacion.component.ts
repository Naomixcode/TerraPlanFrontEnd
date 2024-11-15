import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarEvaluacionComponent } from './listar-evaluacion/listar-evaluacion.component';

@Component({
  selector: 'app-evaluacion',
  standalone: true,
  imports: [RouterOutlet,ListarEvaluacionComponent],
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent {
  constructor(public route:ActivatedRoute){}

}
