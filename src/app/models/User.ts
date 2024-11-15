import { Role } from './Role'; // Asegúrate de que la ruta sea correcta
import { Proyecto } from './Proyecto'; // Ajusta según la ruta
import { Comentario } from './Comentario'; // Ajusta según la ruta

export class User {
    idUsuario: number = 0; // ID del usuario
    nombreCompleto: string = ""; // Nombre completo del usuario
    contrasenia: string = ""; // Contraseña (considera manejarla de forma segura)
    enabled: boolean = false; // Estado de habilitación
    proyectos: Proyecto[] = []; // Lista de proyectos asociados al usuario
    comentarios: Comentario[] = []; // Lista de comentarios asociados al usuario
    roles: Role[] = []; // Arreglo de roles asociados al usuario

    constructor(
        idUsuario: number = 0,
        nombreCompleto: string = "",
        contrasenia: string = "",
        enabled: boolean = false,
        proyectos: Proyecto[] = [],
        comentarios: Comentario[] = [],
        roles: Role[] = []
    ) {
        this.idUsuario = idUsuario;
        this.nombreCompleto = nombreCompleto;
        this.contrasenia = contrasenia;
        this.enabled = enabled;
        this.proyectos = proyectos;
        this.comentarios = comentarios;
        this.roles = roles;
    }
}
