import { Material } from "./Material"
import { Prototipo } from "./Prototipo"

export class PrototipoMaterial{
    PrototipoMaterialId: number=0
    prototipo: Prototipo
    material: Material

    constructor( PrototipoMaterialId: number=0, prototipo: Prototipo,material: Material){
        this.PrototipoMaterialId = PrototipoMaterialId;
        this.prototipo=prototipo;
        this.material=material;
    }

}