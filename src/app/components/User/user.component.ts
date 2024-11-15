import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListaruserComponent } from './listaruser/listaruser.component';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, ListaruserComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  constructor(public route: ActivatedRoute) {}
}
