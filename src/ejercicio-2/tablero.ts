import { Column, COL_SIZE } from './columna';
import { ValidBox } from './celda';

/** * Número de columnas que componen el tablero (Ancho).
 */
const ROW_SIZE: number = 7;

/**
 * Representa el tablero principal del juego.
 * Gestiona una colección de objetos {@link Column} y proporciona métodos para
 * la manipulación y visualización de la rejilla de juego.
 */
export class Tablero {
  /** * Array de columnas que forman la estructura del tablero.
   * @internal
   */
  private _table: Column[] = [];

  /**
   * Inicializa un tablero vacío de $6 \\times 7$.
   * Crea 7 instancias de {@link Column}, cada una con su propia capacidad.
   */
  constructor() {
    this._table = Array.from({ length: ROW_SIZE }, () => new Column());
  }

  /**
   * Obtiene la estructura completa del tablero.
   * @returns Un array con las 7 columnas actuales.
   */
  get table(): Column[] {
    return this._table;
  }

  /**
   * Renderiza una representación visual del tablero en la consola.
   * Itera sobre las filas (de arriba hacia abajo) y las columnas para dibujar
   * una rejilla con separadores '|'.
   */
  print(): void {
    console.log('Tablero actual:');
    for (let row = 0; row < COL_SIZE; row++) {
      let filaVisual = '|';

      for (let col = 0; col < ROW_SIZE; col++) {
        const estado = this._table[col].column[row].status;
        const caracter = estado === '' ? ' ' : estado;

        filaVisual += ` ${caracter} |`;
      }
      console.log(filaVisual);
    }
  }

  /**
   * Inserta una ficha en una columna específica.
   * * @param indiceColumna - El índice de la columna (0 a 6).
   * @param status - El símbolo de la ficha ('X' o 'O').
   * * @throws {@link Error} Si el índice está fuera del rango permitido o si la columna está llena.
   * * @example
   * ```typescript
   * const tablero = new Tablero();
   * tablero.addChecker(0, 'X'); // Inserta en la primera columna a la izquierda
   * ```
   */
  addChecker(indiceColumna: number, status: ValidBox): void {
    if (indiceColumna < 0 || indiceColumna > 5) {
      throw new Error('Not a valid column index');
    }
    this._table[indiceColumna].addToColumn(status);
  }
}
