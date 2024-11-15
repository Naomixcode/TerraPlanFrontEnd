import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarRoleComponent } from './listarrole/listarrole.component';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [RouterOutlet, ListarRoleComponent],
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent {
  constructor(public route: ActivatedRoute) {}
}
