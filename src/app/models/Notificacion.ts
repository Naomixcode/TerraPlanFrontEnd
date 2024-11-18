export class Notificacion {
  idNotificacion: number = 0;
  tituloNotificacion: string = '';
  mensajeNotificacion: string = '';
  fechaNotificacion: Date = new Date();
  idUsuario?: number;
  nombreUsuario?: string;
}
