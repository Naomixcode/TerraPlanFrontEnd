export class Terreno {
    idTerreno: number = 0;
    ubicacionTerreno: string = '';
    tamanioTerreno: number = 0;
    descripcionTerreno: string = '';
    idProyecto?: number; // Relación con proyecto, solo ID
    nombreProyecto?: string; // Nombre del proyecto, opcional para visualización
  }
  