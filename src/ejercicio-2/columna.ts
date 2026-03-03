import { Box, ValidBox } from './celda';

/** * Tamaño vertical de la columna.
 * Define que cada columna tiene 6 celdas de capacidad.
 */
export const COL_SIZE: number = 6;

/**
 * Representa una columna vertical en un tablero de juego (estilo Conecta 4).
 * Gestiona el apilamiento de fichas desde la base hasta la parte superior.
 */
export class Column {
  /** * Array interno de objetos {@link Box}.
   * @internal
   */
  private _column: Box[] = [];

  /** * Índice de la próxima posición disponible en la columna.
   * Comienza en 5 (fondo) y disminuye a medida que se añaden piezas.
   * @internal
   */
  private last_piece: number = 5;

  /** * Indica si la columna ha alcanzado su capacidad máxima (6 fichas).
   */
  public is_full = false;

  /**
   * Crea una nueva columna e inicializa las 6 celdas ({@link Box}) como vacías.
   */
  constructor() {
    this._column = Array.from({ length: COL_SIZE }, () => new Box());
  }

  /**
   * Obtiene el array de celdas que componen la columna.
   * @returns Array de instancias de {@link Box}.
   */
  get column() {
    return this._column;
  }

  /**
   * Añade una ficha a la columna en la posición más baja disponible.
   * * @param status - El tipo de ficha a insertar ('X' o 'O').
   * @throws {@link Error} Si se intenta añadir una ficha a una columna que ya está llena.
   * * @example
   * ```typescript
   * const col = new Column();
   * col.addToColumn('X'); // Se coloca en el índice 5
   * col.addToColumn('O'); // Se coloca en el índice 4
   * ```
   */
  addToColumn(status: ValidBox) {
    if (this.is_full) {
      throw new Error(`This column is full`);
    }

    this._column[this.last_piece--].status = status;

    // Si después de colocar la pieza el puntero sale de los límites, la columna se marca como llena.
    if (this.last_piece === -1) this.is_full = true;
  }

  /**
   * Obtiene una celda específica de la columna basada en su índice.
   * @param index - Posición de la celda (0 para la parte superior, 5 para la base).
   * @returns La instancia de {@link Box} en dicha posición.
   */
  getIndex(index: number) {
    return this._column[index];
  }

  /**
   * Imprime el estado actual de la columna en la consola de forma vertical.
   */
  print() {
    for (let i = 0; i < COL_SIZE; i++) {
      console.log(this._column[i].status, '|');
    }
  }
}
