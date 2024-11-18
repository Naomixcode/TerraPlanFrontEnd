export class Evaluacion {
    idEvaluacion: number = 0;
    fechaEvaluacion: Date = new Date();
    resultadoEvaluacion: string = '';
    comentariosEvaluacion: string = '';
    idTerreno?: number; // Relación con el terreno, solo el ID
    descripcionTerreno?: string; // Descripción del terreno
}
  