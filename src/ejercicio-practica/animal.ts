/**
 * Tipo de datos que representa el estado de salud
 */
export type HealthStatus = 'Mala' | 'Media' | 'Alta';

/**
 * Clase abstracta para representar animales de una clínica
 */
export abstract class Animal {
    /**
     * Constructor de la clase abstracta
     * 
     * @param _microchip_id - Id del microchip del animal
     * @param _name - Nombre del animal
     * @param _aprox_age - Edad aproximada del animal
     * @param _weigth - Peso medido del animal
     * @param _health - Estado de salud del animal (solo puede ser HealthStatus)
     */
    constructor (
        private _microchip_id: string,
        private _name: string,
        private _aprox_age: number,
        private _weigth: number,
        private _health: HealthStatus) {}
    
    /**
     * Getter del atributo michochip_id
     * @returns retorna el string
     */
    get microchip_id() {
        return this._microchip_id;
    }

    set microchip_id(new_id: string) {
        this._microchip_id = new_id;
    }

    /**
     * Getter del atributo name
     * @returns retorna el string con el nombre
     */
    get name() {
        return this._name;
    }

    /**
     * Cambia el nombre del animal
     * @param new_name - Nuevo nombre del animal
     */
    set name(new_name: string) {
        this._name = new_name;
    }  

    /**
     * Getter del atributo age
     * @returns retorna la edad en number
     */
    get age() {
        return this._aprox_age;
    }

    /**
     * Modifica la edad aproximada del animal
     * @param new_age - Nueva edad
     */
    set age(new_age: number) {
        this._aprox_age = new_age;
    }  

    /**
     * Getter del atributo weigth
     * @returns retorna el peso en number
     */
    get weigth() {
        return this._weigth;
    }

    /**
     * Modifica el peso medido del animal
     * @param new_weigth - nuevo peso del animal
     */
    set weigth(new_weigth: number) {
        this._weigth = new_weigth;
    }  

    /**
     * Getter del atributo health
     * @returns retorna el estado de salud
     */
    get health() {
        return this._health;
    }

    /**
     * Modifica el estado de salud del animal
     * @param new_health - Nuevo estado de salud
     */
    set health(new_health: HealthStatus) {
        this._health = new_health;
    }  

    /**
     * Funcion abstracta que devuelve la ficha tecnica del animal en cuestion
     * debe ser implementada por cada clase
     */
    abstract obtenerFicha(): string;
}