const gameModule = (() => {
  const gameboard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  let currentPlayer = "X";

  //DOM
  const board = document.querySelector(".gameboard");
  const result = document.querySelector(".result");

  _displayBoard();
  result.textContent = `Player ${currentPlayer} turn.`;

  function _displayBoard() {
    _clearBoard();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const button = document.createElement("button");
        button.classList.add("boardTile");
        button.textContent = gameboard[i][j];
        if (!gameboard[i][j]) {
          button.addEventListener("click", () => {
            _updateBoard(i, j);
            _updateResult();
          });
        }
        board.appendChild(button);
      }
    }
  }

  function _clearBoard() {
    let child = board.firstElementChild;
    while (child) {
      board.removeChild(child);
      child = board.firstElementChild;
    }
  }

  function _updateBoard(i, j) {
    gameboard[i][j] = currentPlayer;
    _displayBoard();
  }

  function _checkBoard() {
    if ( gameboard[0][0] === currentPlayer && gameboard[1][1] === currentPlayer && gameboard[2][2] === currentPlayer ) {
      return true;
    } else if ( gameboard[0][2] === currentPlayer && gameboard[1][1] === currentPlayer && gameboard[2][0] === currentPlayer ) {
      return true;
    } else {
      for (let i = 0; i < 3; i++) {
        if ( gameboard[0][i] === currentPlayer && gameboard[1][i] === currentPlayer && gameboard[2][i] === currentPlayer ) {
          return true;
        }
        if ( gameboard[i][0] === currentPlayer && gameboard[i][1] === currentPlayer && gameboard[i][2] === currentPlayer ) {
          return true;
        }
      }
    }
    return false;
  }

  function _disableBoard() {
    const buttons = board.children;
    for (const button of buttons) {
      button.disabled = true;
    }
  }

  function _updateResult() {
    if(_checkBoard()){
      _disableBoard();
      result.textContent = `Player ${currentPlayer} won the game!`;
    }else{
      _togglePlayer();
      result.textContent = `Player ${currentPlayer} turn.`;
    }
  }

  function _togglePlayer(){
    if (currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }
  }

})();
