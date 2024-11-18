export class Proyecto {
    idProyecto: number = 0;
    nombreProyecto: string = '';
    descripcionProyecto: string = '';
    fechaCreacionProyecto: Date = new Date();
    estadoProyecto: string = '';
    idUsuario?: number; // Relación con el usuario, solo el ID
    nombreUsuario?: string; // Nombre del usuario, si es necesario para la visualización
  }
  