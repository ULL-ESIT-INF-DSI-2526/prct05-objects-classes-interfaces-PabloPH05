export type ValidBox = 'X' | 'O' | '';

export class Box {
  private _status: ValidBox;
  constructor(status: ValidBox = '') {
    this._status = status;
  }
  get status() {
    return this._status;
  }

  set status(new_status: ValidBox) {
    this._status = new_status;
  }
}
