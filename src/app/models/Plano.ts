import { Terreno } from './Terreno'; // Asegúrate de que la ruta sea correcta

export class Plano {
    idPlano: number = 0;
    tipoPlano: string = "";
    descripcionPlano: string = "";
    fechaPlano: string = "";
    terreno: Terreno;

    constructor(
        idPlano: number = 0,
        tipoPlano: string = "",
        descripcionPlano: string = "",
        fechaPlano: string = "",
        terreno: Terreno
    ) {
        this.idPlano = idPlano;
        this.tipoPlano = tipoPlano;
        this.descripcionPlano = descripcionPlano;
        this.fechaPlano = fechaPlano;
        this.terreno = terreno;
    }
}
