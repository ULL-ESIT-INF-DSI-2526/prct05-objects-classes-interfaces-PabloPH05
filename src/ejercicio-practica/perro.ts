import { Animal, HealthStatus} from "./animal";
/**
 * Clase para representar un perro, exteinde la clase abstracta Animal
 * añadiendo nuevos atributos e implementando `obtenerFicha`
 */
export class Perro extends Animal {
    /**
     * Construye el objeto de la clase Perro
     * 
     * @param _microchip_id - Id del microchip del animal
     * @param _name - Nombre del animal
     * @param _aprox_age - Edad aproximada del animal
     * @param _weigth - Peso medido del animal
     * @param _health - Estado de salud del animal (solo puede ser HealthStatus)
     * @param _kind - Raza del perro
     * @param _activity_level - Nivel numerico de actividad
     */
    constructor(microchip_id: string,
    name: string,
    aprox_age: number,
    weigth: number,
    health: HealthStatus,
    private _kind: string,
    private _activity_level: number
    ) {
        super(microchip_id,name,aprox_age,weigth,health);
    }

    /**
     * Devuelve la raza del perro
     * @returns retorna el string con la raza
     */
    get kind() {
        return this._kind;
    }

    /**
     * Modifica la raza del perro
     * @param new_kind - Nueva raza del perro
     */
    set kind(new_kind: string) {
        this._kind = new_kind;
    }


    /** 
     * Devuelve el nivel de actividad
     * @returns retorna un valor numerico de la actividad
     * 
    */
    get activity_level() {
        return this._activity_level;
    }

    /**
     * Modifica el nivel de actividad
     * @param new_act_level - Nuevo valor de activiadad
     */
    set activity_level(new_act_level: number) {
        this._activity_level = new_act_level;
    }

    /**
     * Funcion que implementa la creación de un string que devuelve
     * la ficha del perro
     * @returns string formateada del perro
     */
    obtenerFicha(): string {
        return `-- Ficha Perro --\nNombre: ${this.name}\nEdad: ${this.age} años\nPeso: ${this.weigth} kg, Estado de Salud: ${this.health}\nId: ${this.microchip_id}\nRaza: ${this._kind}\nNivel de actividad: ${this._activity_level} %`
    }
}