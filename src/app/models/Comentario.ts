export class Comentario {
  idComentario: number = 0;
  contenidoComentario: string = '';
  fechaComentario: Date = new Date();
  idUsuario?: number; // Relación con el usuario, solo el ID
  nombreUsuario?: string; // Nombre del usuario, si es necesario para la visualización
  idProyecto?: number; // Relación con el proyecto, solo el ID
  nombreProyecto?: string; // Nombre del proyecto, si es necesario para la visualización
  idEvaluacion?: number; // Relación con la evaluación, solo el ID
  resultadoEvaluacion?: string; // Nombre de la evaluación, si es necesario para la visualización
}
