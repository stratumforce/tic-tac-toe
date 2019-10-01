class TicTacToe {
  constructor() {
    this.matrix = [
      Array(3).fill(null),
      Array(3).fill(null),
      Array(3).fill(null)
    ];
    this.currentSymbol = "x";
    this.winner = null;
    this.draw = false;
  }

  getCurrentPlayerSymbol() {
    return this.currentSymbol;
  }

  nextTurn(rowIndex, columnIndex) {
    if (this.matrix[rowIndex][columnIndex])
      return this.matrix[rowIndex][columnIndex];

    this.matrix[rowIndex][columnIndex] = this.currentSymbol;
    this.currentSymbol = this.currentSymbol === "x" ? "o" : "x";
  }

  isFinished() {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let line of winLines) {
      // Calculate pairs of rowIndex and colIndex
      // and compare symbols from this.matrix accordingly
      let [pair1, pair2, pair3] = [
        ...line.reduce(
          (acc, val) => [...acc, [Math.floor(val / 3), val % 3]],
          []
        )
      ];

      let symbol = this.matrix[pair1[0]][pair1[1]];

      if (
        symbol &&
        symbol === this.matrix[pair2[0]][pair2[1]] &&
        symbol === this.matrix[pair3[0]][pair3[1]]
      ) {
        this.winner = symbol;
        return true;
      }
    }

    return this.noMoreTurns();
  }

  getWinner() {
    this.isFinished();
    return this.winner;
  }

  noMoreTurns() {
    // Filter matrix values. If any is null return false else return true
    return (
      this.matrix.filter(row => row.filter(col => col).length === 3).length ===
      this.matrix.length
    );
  }

  isDraw() {
    return this.isFinished() && !this.winner;
  }

  getFieldValue(rowIndex, colIndex) {
    return this.matrix[rowIndex][colIndex];
  }
}

module.exports = TicTacToe;
