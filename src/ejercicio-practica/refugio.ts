import { Gato } from "./gato";
import { Perro } from "./perro";
import { Animal } from "./animal";

type Logs = [Animal, Date, Date | undefined];

interface CriteriosFiltro {
  edad?: number;
  peso?: number;
  raza?: string;
  pelaje?: string;
}

export class Refugio {
    constructor (
        private _animals: Logs[],
        private _plazas_perros: number,
        private _plazas_gatos: number
    ) {}

    get animals() {
        return this._animals;
    }

    get plazas_perros() {
        return this._plazas_perros;
    }

    set plazas_perros(new_plazas: number) {
        this._plazas_perros = new_plazas;
    }

    get plazas_gatos() {
        return this._plazas_gatos;
    }

    set plazas_gatos(new_plazas: number) {
        this._plazas_gatos = new_plazas;
    }

    getList(opcion: 'Perro' | 'Gato'): Logs[] {
        let result_perro: Logs[] = []
        let result_gato: Logs[] = []
        this.animals.forEach((log) => {
            if (log[0] instanceof Perro) {
                result_perro.push(log);
            } else if (log[0] instanceof Gato) {
                result_gato.push(log)
            }
        })

        return (opcion === 'Perro' ? result_perro : result_gato);
    }

    ingreso(new_animal: Animal) {
        const log_to_add: Logs = [new_animal, new Date(), undefined]
        if (new_animal.constructor.name === 'Perro' && this.plazas_perros > 0) {
            this.animals.push(log_to_add)
        } else if (new_animal.constructor.name === 'Gato' && this._plazas_gatos > 0) {
            this.animals.push(log_to_add)
        } else {
            throw new Error (`Impossible to add the animal: ${new_animal.name}`)
        }
    }

    salida(adopted: Animal) {
        let encontrado = -1;
        this.animals.forEach((log,index) => {
            if (log[0] === adopted) {
                encontrado = index;
            }
        })

        if (encontrado === -1) {
            throw new Error ('No se encontró al animal');
        }

        this.animals[encontrado][2] = new Date;
    }

    findAnimal(id: string) {
        return this.animals.find((log) => log[0].microchip_id === id);
    }

    filter(filtro: CriteriosFiltro) {
        const result = this.animals.filter((log) => {
            let match = true;
            if (filtro.edad) {
                match = match && log[0].age === filtro.edad;
            }
            return match;
        })
        return result;
    }
}