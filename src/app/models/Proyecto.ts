import { User } from './User'; // Asegúrate de que la ruta sea correcta
import { Terreno } from './Terreno'; // Ajusta la ruta si es necesario
import { Comentario } from './Comentario'; // Ajusta la ruta si es necesario

export class Proyecto {
    idProyecto: number = 0; // ID del proyecto
    nombreProyecto: string = ""; // Nombre del proyecto
    descripcionProyecto: string = ""; // Descripción del proyecto
    fechaCreacionProyecto: string = new Date().toISOString().split('T')[0]; // Fecha en formato 'yyyy-MM-dd'
    estadoProyecto: string = ""; // Estado del proyecto
    usuarioProyecto: User | null = null; // Usuario asociado al proyecto
    terrenos: Terreno[] = []; // Lista de terrenos asociados
    comentarios: Comentario[] = []; // Lista de comentarios asociados

    constructor(
        idProyecto: number = 0,
        nombreProyecto: string = "",
        descripcionProyecto: string = "",
        fechaCreacionProyecto: string = new Date().toISOString().split('T')[0], // Envía solo la fecha
        estadoProyecto: string = "",
        usuarioProyecto: User | null = null,
        terrenos: Terreno[] = [],
        comentarios: Comentario[] = []
    ) {
        this.idProyecto = idProyecto;
        this.nombreProyecto = nombreProyecto;
        this.descripcionProyecto = descripcionProyecto;
        this.fechaCreacionProyecto = fechaCreacionProyecto;
        this.estadoProyecto = estadoProyecto;
        this.usuarioProyecto = usuarioProyecto;
        this.terrenos = terrenos;
        this.comentarios = comentarios;
    }
}
