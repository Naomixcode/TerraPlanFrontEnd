import { Proyecto } from './Proyecto'; // Asegúrate de que la ruta sea correcta

export class Terreno {
    idTerreno: number = 0; // ID del terreno
    ubicacionTerreno: string = ""; // Ubicación del terreno
    tamanioTerreno: string = ""; // Tamaño del terreno
    descripcionTerreno: string = ""; // Descripción del terreno
    proyecto: Proyecto | null = null; // Proyecto asociado al terreno

    constructor(
        idTerreno: number = 0,
        ubicacionTerreno: string = "",
        tamanioTerreno: string = "",
        descripcionTerreno: string = "",
        proyecto: Proyecto | null = null
    ) {
        this.idTerreno = idTerreno;
        this.ubicacionTerreno = ubicacionTerreno;
        this.tamanioTerreno = tamanioTerreno;
        this.descripcionTerreno = descripcionTerreno;
        this.proyecto = proyecto;
    }
}
