import { Box, ValidBox } from './celda';
export const COL_SIZE: number = 6;

export class Column {
  private _column: Box[] = [];
  private last_piece: number = 5;
  public is_full = false;

  constructor() {
    this._column = Array.from({ length: COL_SIZE }, () => new Box());
  }

  get column() {
    return this._column;
  }

  addToColumn(status: ValidBox) {
    if (this.is_full) {
      throw new Error(`This column is full`);
    }

    this._column[this.last_piece--].status = status;
    if (this.last_piece === -1) this.is_full = true;
  }

  getIndex(index: number) {
    return this._column[index];
  }

  print() {
    for (let i = 0; i < COL_SIZE; i++) {
      console.log(this._column[i].status, '|');
    }
  }
}
