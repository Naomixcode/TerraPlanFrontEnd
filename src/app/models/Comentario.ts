import { User } from './User'; // Asegúrate de que la ruta sea correcta
import { Proyecto } from './Proyecto'; // Ajusta la ruta si es necesario
import { Evaluacion } from './Evaluacion'; // Ajusta la ruta si es necesario

export class Comentario {
    idComentario: number = 0; // ID del comentario
    contenidoComentario: string = ""; // Contenido del comentario
    fechaComentario: Date = new Date(); // Fecha del comentario
    usuario: User | null = null; // Usuario asociado al comentario
    proyecto: Proyecto | null = null; // Proyecto asociado al comentario
    evaluacion: Evaluacion | null = null; // Evaluación asociada al comentario

    constructor(
        idComentario: number = 0,
        contenidoComentario: string = "",
        fechaComentario: Date = new Date(),
        usuario: User | null = null,
        proyecto: Proyecto | null = null,
        evaluacion: Evaluacion | null = null
    ) {
        this.idComentario = idComentario;
        this.contenidoComentario = contenidoComentario;
        this.fechaComentario = fechaComentario;
        this.usuario = usuario;
        this.proyecto = proyecto;
        this.evaluacion = evaluacion;
    }
}
