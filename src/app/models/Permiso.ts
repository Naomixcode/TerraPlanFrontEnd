export class Permiso {
  idPermiso: number = 0;
  nombrePermiso: string = '';
  descripcionPermiso: string = '';
  fechaSubida: Date = new Date();
  idProyecto?: number; // Relación con el proyecto, solo el ID
  nombreProyecto?: string; // Nombre del proyecto, si es necesario para la visualización
}
