class Position {
  #row: number;
  #col: number;

  constructor(row: number, col: number) {
    this.#row = row;
    this.#col = col;

    this.shiftRow = this.shiftRow.bind(this);
    this.shiftCol = this.shiftCol.bind(this);
    this.getRow = this.getRow.bind(this);
    this.getCol = this.getCol.bind(this);
  }

  shiftRow(shift: number) {
    this.#row += shift;
  }

  shiftCol(shift: number) {
    this.#col += shift;
  }
  
  getRow() {
    return this.#row;
  }
  getCol() {
    return this.#col;
  }
}

export default Position;
