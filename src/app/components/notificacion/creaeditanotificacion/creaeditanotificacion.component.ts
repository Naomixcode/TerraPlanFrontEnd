import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Notificacion } from '../../../models/Notificacion';
import { NotificacionService } from '../../../services/notificacion.service';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-creaeditanotificacion',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,],
  templateUrl: './creaeditanotificacion.component.html',
  styleUrl: './creaeditanotificacion.component.css'
})
export class CreaeditanotificacionComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  listaDispositivos: User[] = [];
  maint: Notificacion = new Notificacion();
  constructor(
    private formBuilder: FormBuilder,
    private dS: UserService,
    private mS: NotificacionService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hfecha: ['', Validators.required],
      htitulo: ['', Validators.required],
      hmensaje: ['', Validators.required],
      husuario: ['', Validators.required],
    });
    this.dS.list().subscribe((data) => {
      this.listaDispositivos = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.maint.fechaNotificacion = this.form.value.hfecha;
      this.maint.tituloNotificacion = this.form.value.htitulo;
      this.maint.mensajeNotificacion = this.form.value.hmensaje;
      this.maint.usuario.idUsuario = this.form.value.husuario;

      this.mS.insert(this.maint).subscribe((data) => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);
        });
      });
      this.router.navigate(['notificaciones']);
    }
  }
}
