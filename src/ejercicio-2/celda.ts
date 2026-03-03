/**
 * Define los estados posibles para una casilla del tablero.
 * - `'X'`: Marcada por el primer jugador.
 * - `'O'`: Marcada por el segundo jugador.
 * - `''`: Casilla vacía.
 */
export type ValidBox = 'X' | 'O' | '';

/**
 * Representa una celda individual dentro de un tablero de juego.
 * Encapsula el estado de la casilla y proporciona métodos controlados para su lectura y modificación.
 */
export class Box {
  /** * Estado interno de la casilla.
   * @internal
   */
  private _status: ValidBox;

  /**
   * Crea una nueva instancia de una casilla.
   * * @param status - El estado inicial de la casilla. Por defecto es una cadena vacía (`''`).
   */
  constructor(status: ValidBox = '') {
    this._status = status;
  }

  /**
   * Obtiene el estado actual de la casilla.
   * * @returns El valor actual: 'X', 'O' o ''.
   */
  get status(): ValidBox {
    return this._status;
  }

  /**
   * Actualiza el estado de la casilla.
   * * @param new_status - El nuevo valor a asignar. Debe cumplir con el tipo {@link ValidBox}.
   */
  set status(new_status: ValidBox) {
    this._status = new_status;
  }
}
