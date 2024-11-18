export class PrototipoMaterial {
    idPrototipoMaterial: number = 0; // ID único de la relación Prototipo-Material
    idPrototipo?: number; // Relación con Prototipo, solo el ID
    descripcionPrototipo?: string; // Descripción del Prototipo (opcional para visualización)
    idMaterial?: number; // Relación con Material, solo el ID
    descripcionMaterial?: string; // Descripción del Material (opcional para visualización)
  }
  