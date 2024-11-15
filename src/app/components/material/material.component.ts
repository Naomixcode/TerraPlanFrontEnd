import { Component } from '@angular/core';
import { ActivatedRoute,RouterOutlet } from '@angular/router';
import { ListarmaterialComponent } from './listarmaterial/listarmaterial.component';


@Component({
  selector: 'app-material',
  standalone: true,
  imports: [RouterOutlet,ListarmaterialComponent],
  templateUrl: './material.component.html',
  styleUrl: './material.component.css'
})
export class MaterialComponent {
  constructor(public route:ActivatedRoute) {}
}

