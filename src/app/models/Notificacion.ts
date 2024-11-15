import { User } from "./User";
export class Notificacion {
    idNotificacion: number = 0;
    fechaNotificacion: Date = new Date(Date.now());
    mensajeNotificacion: string = "";
    tituloNotificacion: string = "";
    usuario: User = new User();
  }