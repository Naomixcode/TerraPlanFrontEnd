import { Plano } from './Plano';

export class Prototipo {
    idPrototipo: number = 0; // ID de la evaluación
    fechaCreacionPrototipo: Date = new Date(); // Fecha de la evaluación
    tipoEstructuraPrototipo: string = ""; // Resultado de la evaluación
    descripcionPrototipo: string = ""; // Comentarios de la evaluación
    plano: Plano | null = null; // Terreno asociado a la evaluación

    constructor(
        idPrototipo: number = 0,
        fechaCreacionPrototipo: Date = new Date(),
        tipoEstructuraPrototipo: string = "",
        descripcionPrototipo: string = "",
        plano: Plano | null = null
    ) {
        this.idPrototipo = idPrototipo;
        this.fechaCreacionPrototipo = fechaCreacionPrototipo;
        this.tipoEstructuraPrototipo = tipoEstructuraPrototipo;
        this.descripcionPrototipo = descripcionPrototipo;
        this.plano = plano;
    }
}
