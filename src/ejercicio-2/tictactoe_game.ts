import { Tablero } from './tablero';
import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

export class TicTacToeGame {
  private table: Tablero = new Tablero();
  private rl = readline.createInterface({ input, output });
  private x_chips: number = 21;
  private y_chips: number = 21;

  print() {
    this.table.print();
  }

  async play() {
    let player: boolean = true;
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

    // Cerramos la interfaz de consola para que el programa de Node pueda terminar
    this.rl.close();
  }

  clear() {
    this.table = new Tablero();
  }

  playerWon(player: boolean): boolean {
    const grid = this.table.table;
    const rows = grid.length;
    const cols = grid[0].column.length;
    const chip = player ? 'O' : 'X';

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
