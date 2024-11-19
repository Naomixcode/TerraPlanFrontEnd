import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { ListarMaterialComponent } from './listarmaterial/listarmaterial.component';

@Component({
  selector: 'app-material',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ListarMaterialComponent],
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css'],
})
export class MaterialComponent {
  constructor(public route: ActivatedRoute) {}
}
