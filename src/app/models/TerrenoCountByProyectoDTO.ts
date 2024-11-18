import { Rol } from "./Rol";
import { Notificacion } from "./Notificacion";

export class Usuario {
    idUsuario: number = 0;
    nombreCompleto: string = '';
    contrasenia: string = '';
    enabled: boolean = false;
    roles: Rol[] = [];
    notificaciones: Notificacion[] = [];
  }