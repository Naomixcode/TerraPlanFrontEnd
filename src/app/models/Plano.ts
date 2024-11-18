export class Plano {
    idPlano: number = 0;
    tipoPlano: string = '';
    descripcionPlano: string = '';
    fechaPlano: Date = new Date();
    idTerreno?: number; // Relación con el terreno, solo ID
    descripcionTerreno?: string; // Descripción del terreno
  }
  