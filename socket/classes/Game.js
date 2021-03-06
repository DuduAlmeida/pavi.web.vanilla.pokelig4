class Game {
  constructor() {
    this.users = [];
    this.history = [];
    this.userIdPlaying = null;
    this.board = new Array(42).fill(null);
  }

  nextTurn() {
    this.userIdPlaying = this.users.find(user => user.id != this.userIdPlaying).id;
  }

  makeMove(i, playerId, pokemon, canUsePrimary) {
    const lowerIndexes = [35, 36, 37, 38, 39, 40, 41];

    const index = parseInt(i);

    if (!this.isInProgress()) {
      return;
    }

    if (playerId !== this.userIdPlaying) {
      return;
    }

    if (this.board[index]) {
      return;
    }

    if (this.board[index + 7] != null || lowerIndexes.includes(index)) {
      const lig4Move = {
        boardIndex: index,
        player: this.userIdPlaying,
        pokemon,
        canUsePrimary,
      };

      this.board[index] = { ...lig4Move };
      this.history.push(lig4Move);

      if (!this.findWinningCombination()) {
        this.nextTurn();
      }
    }

  }

  findWinningCombination() {
    const winningCombinations = [
      //horizontal
      [0, 1, 2, 3],
      [1, 2, 3, 4],
      [2, 3, 4, 5],
      [3, 4, 5, 6],

      [7, 8, 9, 10],
      [8, 9, 10, 11],
      [9, 10, 11, 12],
      [10, 11, 12, 13],

      [14, 15, 16, 17],
      [15, 16, 17, 18],
      [16, 17, 18, 19],
      [17, 18, 19, 20],

      [21, 22, 23, 24],
      [22, 23, 24, 25],
      [23, 24, 25, 26],
      [24, 25, 26, 27],

      [28, 29, 30, 31],
      [29, 30, 31, 32],
      [30, 31, 32, 33],
      [31, 32, 33, 34],

      [35, 36, 37, 38],
      [36, 37, 38, 39],
      [37, 38, 39, 40],
      [38, 39, 40, 41],
      //horizontal

      //vertical
      [0, 7, 14, 21],
      [7, 14, 21, 28],
      [14, 21, 28, 35],

      [1, 8, 15, 22],
      [8, 15, 22, 29],
      [15, 22, 29, 36],

      [2, 9, 16, 23],
      [9, 16, 23, 30],
      [16, 23, 30, 37],

      [3, 10, 17, 24],
      [10, 17, 24, 31],
      [17, 24, 31, 38],

      [4, 11, 18, 25],
      [11, 18, 25, 32],
      [18, 25, 32, 39],

      [5, 12, 19, 26],
      [12, 19, 26, 33],
      [19, 26, 33, 40],

      [6, 13, 20, 27],
      [13, 20, 27, 34],
      [20, 27, 34, 41],
      //vertical

      //diagonal
      [0, 8, 16, 24],
      [1, 9, 17, 25],
      [2, 10, 18, 26],
      [3, 11, 19, 27],

      [7, 15, 23, 31],
      [8, 16, 24, 32],
      [9, 17, 25, 33],
      [10, 18, 26, 34],

      [14, 22, 30, 38],
      [15, 23, 31, 39],
      [16, 24, 32, 40],
      [17, 25, 33, 41],

      [6, 12, 18, 24],
      [5, 11, 17, 23],
      [4, 10, 16, 22],
      [3, 9, 15, 21],

      [13, 19, 25, 32],
      [12, 18, 24, 30],
      [11, 17, 23, 29],
      [10, 16, 22, 28],

      [20, 26, 32, 38],
      [19, 25, 31, 37],
      [18, 24, 30, 36],
      [17, 23, 29, 35]
      //diagonal
    ];

    for (const combination of winningCombinations) {
      const [a, b, c, d] = combination;

      if (
        !!this.board[a] && !!this.board[a].player
        && !!this.board[b] && !!this.board[b].player
        && !!this.board[c] && !!this.board[c].player
        && !!this.board[d] && !!this.board[d].player &&
        (this.board[a].player === this.board[b].player &&
          this.board[a].player === this.board[c].player &&
          this.board[a].player === this.board[d].player)) {
        return combination;
      }
    }
    return null;
  }

  isInProgress() {
    return !this.findWinningCombination() && this.board.includes(null);
  }

  get currentUser() {
    return this.users.find(user => user.id === this.userIdPlaying);
  }
}


module.exports = Game;