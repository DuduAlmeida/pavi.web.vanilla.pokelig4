export default class GameView {
    constructor(root) {
        this.root = root;
        this.root.innerHTML = `
            <div class="game-header">
                <div class="game-header-turn">
                    Player 1's turn
                </div>
            </div>
            <div class="board">
                <div class="board-tile" data-index="0"></div>
                <div class="board-tile" data-index="1"></div>
                <div class="board-tile" data-index="2"></div>
                <div class="board-tile" data-index="3"></div>
                <div class="board-tile" data-index="4"></div>
                <div class="board-tile" data-index="5"></div>
                <div class="board-tile" data-index="6"></div>
                <div class="board-tile" data-index="7"></div>
                <div class="board-tile" data-index="8"></div>
                <div class="board-tile" data-index="9"></div>
                <div class="board-tile" data-index="10"></div>
                <div class="board-tile" data-index="11"></div>
                <div class="board-tile" data-index="12"></div>
                <div class="board-tile" data-index="13"></div>
                <div class="board-tile" data-index="14"></div>
                <div class="board-tile" data-index="15"></div>
                <div class="board-tile" data-index="16"></div>
                <div class="board-tile" data-index="17"></div>
                <div class="board-tile" data-index="18"></div> 
                <div class="board-tile" data-index="19"></div>
                <div class="board-tile" data-index="20"></div>
                <div class="board-tile" data-index="21"></div>
                <div class="board-tile" data-index="22"></div>
                <div class="board-tile" data-index="23"></div>
                <div class="board-tile" data-index="24"></div>
                <div class="board-tile" data-index="25"></div>
                <div class="board-tile" data-index="26"></div>
                <div class="board-tile" data-index="27"></div>
                <div class="board-tile" data-index="28"></div>
                <div class="board-tile" data-index="29"></div>
                <div class="board-tile" data-index="30"></div>
                <div class="board-tile" data-index="31"></div>
                <div class="board-tile" data-index="32"></div>
                <div class="board-tile" data-index="33"></div>
                <div class="board-tile" data-index="34"></div>
                <div class="board-tile" data-index="35"></div>
                <div class="board-tile" data-index="36"></div>
                <div class="board-tile" data-index="37"></div>
                <div class="board-tile" data-index="38"></div>
                <div class="board-tile" data-index="39"></div>
                <div class="board-tile" data-index="40"></div>
                <div class="board-tile" data-index="41"></div>
            </div>
        `;

        this.onTileClick = undefined;

        this.root.querySelectorAll(".board-tile").forEach(tile => {
            tile.addEventListener("click", () => {
                if(this.onTileClick){
                    this.onTileClick(tile.dataset.index);
                }
            });
        });
    }

    update(game) {
        this.updateTurn(game);
        this.updateStatus(game);
        this.updateBoard(game);
    }
    
    updateTurn(game) {
        this.root.querySelector(".game-header-turn").textContent = `${game.turn}'s turn`;
    }

    updateStatus(game) {
        let status = "In Progress";

        if (game.findWinningCombination()) {
            status = `${game.turn} is the Winner!`;
            window.alert(status);
        } else if (!game.isInProgress()) {
            status = "It's a tie!";
            window.alert(status);
        }
    }

    updateBoard(game) {
        for (let i =0 ; i < game.board.length; i++) {
            const tile = this.root.querySelector(`.board-tile[data-index="${i}"]`);
            
            tile.textContent = game.board[i];

        }
    }
}