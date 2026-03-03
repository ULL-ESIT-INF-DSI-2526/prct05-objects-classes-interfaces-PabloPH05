import { Tablero } from './tablero';
import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

/**
 * Orquestador principal del juego (Conecta 4).
 * Gestiona el ciclo de vida de la partida, la entrada/salida por consola
 * y la verificación de las condiciones de victoria.
 */
export class TicTacToeGame {
  /** Instancia del tablero de juego. */
  private table: Tablero = new Tablero();

  /** Interfaz para la lectura de comandos desde la terminal. */
  private rl = readline.createInterface({ input, output });

  /** Contador de fichas disponibles para el jugador X. @internal */
  private x_chips: number = 21;

  /** Contador de fichas disponibles para el jugador O. @internal */
  private y_chips: number = 21;

  /**
   * Invoca el método de impresión del tablero para mostrar el estado actual en consola.
   */
  print() {
    this.table.print();
  }

  /**
   * Inicia el bucle principal del juego.
   * Gestiona los turnos, valida las entradas del usuario y finaliza la sesión
   * cuando se detecta un ganador.
   * * @remarks
   * El Jugador 1 usa la ficha 'O' y el Jugador 2 usa la ficha 'X'.
   * @returns Una promesa que se resuelve al finalizar la partida.
   */
  async play() {
    let player: boolean = true; // true = Jugador 1 (O), false = Jugador 2 (X)
    let win: boolean = false;

    this.print();

    while (!win) {
      console.log(`\nLe toca a ${player ? 'Jugador 1 (O)' : 'Jugador 2 (X)'}`);
      let valid_col: boolean = false;

      while (!valid_col) {
        const respuesta = await this.rl.question(
          '¿En qué columna quieres poner la ficha (0-5)? ',
        );

        try {
          this.table.addChecker(Number(respuesta), player ? 'O' : 'X');
          valid_col = true;
        } catch (error) {
          if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
          } else {
            console.error('Unexpected error', error);
          }
        }
      }

      this.table.print();

      if (this.playerWon(player)) {
        win = true;
        console.log(
          `\nHa ganado el ${player ? 'Jugador 1 (O)' : 'Jugador 2 (X)'}`,
        );
      } else {
        player = !player;
      }
    }

    // Cerramos la interfaz de consola para liberar el proceso
    this.rl.close();
  }

  /**
   * Reinicia la partida creando un tablero nuevo.
   */
  clear() {
    this.table = new Tablero();
  }

  /**
   * Comprueba si el jugador actual ha conseguido alinear 4 fichas.
   * Verifica cuatro direcciones:
   * 1. Horizontal
   * 2. Vertical
   * 3. Diagonal ascendente
   * 4. Diagonal descendente
   * * @param player - El jugador que acaba de realizar el movimiento.
   * @returns `true` si existe una línea de 4 fichas, `false` en caso contrario.
   */
  playerWon(player: boolean): boolean {
    const grid = this.table.table;
    const rows = grid.length;
    const cols = grid[0].column.length;
    const chip = player ? 'O' : 'X';

    // Verificación Horizontal
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols - 3; c++) {
        if (
          grid[r].getIndex(c).status === chip &&
          grid[r].getIndex(c + 1).status === chip &&
          grid[r].getIndex(c + 2).status === chip &&
          grid[r].getIndex(c + 3).status === chip
        ) {
          return true;
        }
      }
    }

    // Verificación Vertical
    for (let r = 0; r < rows - 3; r++) {
      for (let c = 0; c < cols; c++) {
        if (
          grid[r].getIndex(c).status === chip &&
          grid[r + 1].getIndex(c).status === chip &&
          grid[r + 2].getIndex(c).status === chip &&
          grid[r + 3].getIndex(c).status === chip
        ) {
          return true;
        }
      }
    }

    // Verificación Diagonal (Ascendente)
    for (let r = 3; r < rows; r++) {
      for (let c = 0; c < cols - 3; c++) {
        if (
          grid[r].getIndex(c).status === chip &&
          grid[r - 1].getIndex(c + 1).status === chip &&
          grid[r - 2].getIndex(c + 2).status === chip &&
          grid[r - 3].getIndex(c + 3).status === chip
        ) {
          return true;
        }
      }
    }

    // Verificación Diagonal (Descendente)
    for (let r = 0; r < rows - 3; r++) {
      for (let c = 0; c < cols - 3; c++) {
        if (
          grid[r].getIndex(c).status === chip &&
          grid[r + 1].getIndex(c + 1).status === chip &&
          grid[r + 2].getIndex(c + 2).status === chip &&
          grid[r + 3].getIndex(c + 3).status === chip
        ) {
          return true;
        }
      }
    }

    return false;
  }
}
