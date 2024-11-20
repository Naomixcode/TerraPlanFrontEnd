import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { ListarUsuarioComponent } from './listarusuario/listarusuario.component';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ListarUsuarioComponent], // Incluye CommonModule y el componente necesario
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent {
  constructor(public route: ActivatedRoute) {}
}
