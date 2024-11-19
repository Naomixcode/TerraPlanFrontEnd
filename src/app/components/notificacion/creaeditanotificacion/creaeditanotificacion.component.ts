import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Notificacion } from '../../../models/Notificacion';
import { Usuario } from '../../../models/Usuario';
import { NotificacionService } from '../../../services/notificacion.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'appcreaeditanotificacion',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,
    MatDatepickerModule
  ],
  templateUrl: './creaeditanotificacion.component.html',
  styleUrls: ['./creaeditanotificacion.component.css'],
})
export class CreaEditaNotificacionComponent implements OnInit {
  notificationForm!: FormGroup;
  isEditMode: boolean = false;
  idNotificacion!: number;
  usuariosDisponibles: Usuario[] = []; // Lista de usuarios disponibles
  startDate = new Date(); // Fecha de inicio para el DatePicker

  constructor(
    private formBuilder: FormBuilder,
    private notificacionService: NotificacionService,
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.idNotificacion = params['id'];
      this.isEditMode = !!this.idNotificacion;
      this.initForm();
      this.loadUsuarios();

      if (this.isEditMode) {
        this.loadNotificationData();
      }
    });
  }

  private initForm() {
    this.notificationForm = this.formBuilder.group({
      idNotificacion: [{ value: '', disabled: this.isEditMode }], // Deshabilitar en edición
      tituloNotificacion: ['', [Validators.required, Validators.minLength(3)]],
      mensajeNotificacion: ['', [Validators.required, Validators.minLength(10)]],
      fechaNotificacion: ['', Validators.required],
      idUsuario: ['', Validators.required], // Cambiado a ID directo
    });
  }

  private loadUsuarios(): void {
    this.usuarioService.list().subscribe(
      (usuarios) => {
        this.usuariosDisponibles = usuarios;
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  private loadNotificationData(): void {
    this.notificacionService.getNotificacionById(this.idNotificacion).subscribe((data) => {
      console.log('Datos recibidos del backend:', data);
      this.notificationForm.patchValue({
        idNotificacion: data.idNotificacion,
        tituloNotificacion: data.tituloNotificacion,
        mensajeNotificacion: data.mensajeNotificacion,
        fechaNotificacion: data.fechaNotificacion,
        idUsuario: data.idUsuario, // Usar idUsuario directamente
      });
    });
  }

  saveNotification(): void {
    if (this.notificationForm.valid) {
      const notificationToSave = this.notificationForm.getRawValue(); // Los valores ya están alineados con el backend

      if (this.isEditMode) {
        this.notificacionService.update(notificationToSave).subscribe(
          () => {
            this.snackBar.open('Notificación actualizada exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.navigateToNotificaciones();
          },
          (error) => {
            console.error('Error al actualizar la notificación:', error);
            this.snackBar.open('Error al actualizar la notificación.', 'Cerrar', {
              duration: 3000,
            });
          }
        );
      } else {
        this.notificacionService.create(notificationToSave).subscribe(
          () => {
            this.snackBar.open('Notificación registrada exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.navigateToNotificaciones();
          },
          (error) => {
            console.error('Error al registrar la notificación:', error);
            this.snackBar.open('Error al registrar la notificación.', 'Cerrar', {
              duration: 3000,
            });
          }
        );
      }
    } else {
      this.notificationForm.markAllAsTouched();
    }
  }

  navigateToNotificaciones(): void {
    this.router.navigate(['/notificaciones']);
  }
}
