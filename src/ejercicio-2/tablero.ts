import { Column, COL_SIZE } from './columna';
import { ValidBox } from './celda';
const ROW_SIZE: number = 7;

export class Tablero {
  private _table: Column[] = [];
  constructor() {
    this._table = Array.from({ length: ROW_SIZE }, () => new Column());
  }

  get table() {
    return this._table;
  }

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

  addChecker(indiceColumna: number, status: ValidBox): void {
    if (indiceColumna < 0 || indiceColumna > 5) {
      throw new Error('Not a valid column index');
    }
    this._table[indiceColumna].addToColumn(status);
  }
}
