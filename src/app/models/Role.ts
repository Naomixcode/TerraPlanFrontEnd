import { User } from './User'; // Asegúrate de que la ruta sea correcta

export class Role {
    idRol: number = 0; // ID del rol
    nombreRol: string = ""; // Nombre del rol
    descripcionRol: string = ""; //Descripcion del rol
    usuario: User; // Usuario asociado al rol

    constructor(idRol: number = 0, nombreRol: string = "", descripcionRol: string = "", usuario: User) {
        this.idRol = idRol;
        this.nombreRol = nombreRol;
        this.descripcionRol = descripcionRol;
        this.usuario = usuario;
    }
}
