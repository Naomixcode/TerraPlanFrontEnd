export class Prototipo {
  idPrototipo: number = 0;
  tipoEstructuraPrototipo: string = '';
  descripcionPrototipo: string = '';
  fechaCreacionPrototipo: Date = new Date();
  idPlano?: number; // Relación con el plano, solo el ID
  descripcionPlano?: string; // Descripción del plano, opcional para visualización
}
