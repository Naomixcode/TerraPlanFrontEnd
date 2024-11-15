import { Terreno } from './Terreno'; // Asegúrate de que la ruta sea correcta

export class Evaluacion {
    idEvaluacion: number = 0; // ID de la evaluación
    fechaEvaluacion: Date = new Date(); // Fecha de la evaluación
    resultadoEvaluacion: string = ""; // Resultado de la evaluación
    comentariosEvaluacion: string = ""; // Comentarios de la evaluación
    terreno: Terreno | null = null; // Terreno asociado a la evaluación

    constructor(
        idEvaluacion: number = 0,
        fechaEvaluacion: Date = new Date(),
        resultadoEvaluacion: string = "",
        comentariosEvaluacion: string = "",
        terreno: Terreno | null = null
    ) {
        this.idEvaluacion = idEvaluacion;
        this.fechaEvaluacion = fechaEvaluacion;
        this.resultadoEvaluacion = resultadoEvaluacion;
        this.comentariosEvaluacion = comentariosEvaluacion;
        this.terreno = terreno;
    }
}
