import { Animal, HealthStatus} from "./animal";

/**
 * Clase para representar un gato, exteinde la clase abstracta Animal
 * añadiendo nuevos atributos e implementando `obtenerFicha`
 */
export class Gato extends Animal {
    /**
     * Construye el objeto de la clase Perro
     * 
     * @param _microchip_id - Id del microchip del animal
     * @param _name - Nombre del animal
     * @param _aprox_age - Edad aproximada del animal
     * @param _weigth - Peso medido del animal
     * @param _health - Estado de salud del animal (solo puede ser HealthStatus)
     * @param _hear_kind - Srting con el tipo de pelo del gato
     * @param _is_interior - Booleano que representa si es de interior o exterior 
     *                       (true = interior, false = exterior)
     */
    constructor(microchip_id: string,
    name: string,
    aprox_age: number,
    weigth: number,
    health: HealthStatus,
    private _hear_kind: string,
    private _is_interior: boolean
    ) {
        super(microchip_id,name,aprox_age,weigth,health);
    }
    /**
     * Devuelve el tipo de pelaje del gato
     * @returns string con el tipo de pelaje
     */
    get hear_kind() {
        return this._hear_kind;
    }

    /**
     * Modifica el tipo de pelaje
     * @param new_kind - Nuevo tipo de pelaje
     */
    set hear_kind(new_kind: string) {
        this._hear_kind = new_kind;
    }

    /** 
     * Devuelve si el gato es de interior o exterior
     * @returns string Interior o Exterior dependiendo del valor booleano
    */
    get is_interior():string {
        return (this._is_interior) ? 'Interior' : 'Exterior';
    }

    /**
     * Modifica el lugar de preferencia del gato
     * @param new_place - Nuevo lugar de preferencia
     */
    set is_interior(new_place: boolean) {
        this._is_interior = new_place;
    }

    /**
     * Funcion que implementa la creación de un string que devuelve
     * la ficha del gato
     * @returns string formateada del gato
     */
    obtenerFicha(): string {
        return `-- Ficha Gato --\nNombre: ${this.name}\nEdad: ${this.age} años\nPeso: ${this.weigth} kg, Estado de Salud: ${this.health}\nId: ${this.microchip_id}\nTipo de pelaje: ${this._hear_kind}\nGato de ${(this._is_interior) ? 'interior' : 'exterior'}`
    }
}