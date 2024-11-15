import { Proyecto } from "./Proyecto";

export class Permiso {
    idPermiso: number = 0;
    descripcionPermiso: string = "";
    fechaSubida: Date = new Date(Date.now());
    nombrePermiso: string = "";
    proyecto: Proyecto= new Proyecto();
  }