import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarpermisoComponent } from './listarpermiso/listarpermiso.component';

@Component({
  selector: 'app-permiso',
  standalone: true,
  imports: [ListarpermisoComponent, RouterOutlet],
  templateUrl: './permiso.component.html',
  styleUrl: './permiso.component.css'
})
export class PermisoComponent {
  constructor(public route: ActivatedRoute) {}
}


