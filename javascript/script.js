//Contains game board and performs operations on it
const gameBoard = (() => {
  const _board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  function resetBoard() {
    _board[0] = ["", "", ""];
    _board[1] = ["", "", ""];
    _board[2] = ["", "", ""];
  }

  function getBoardTile(x, y) {
    return _board[x][y];
  }

  function setBoardTile(x, y, playerChar) {
    _board[x][y] = playerChar;
  }

  return { resetBoard, getBoardTile, setBoardTile };
})();

//Controlls flow of the game
const gameController = (() => {
  let _currentPlayer = "X";

  //DOM
  const restart = document.querySelector(".restart");

  //Listeners
  restart.addEventListener("click", _restartGame);

  function getCurrentPlayer() {
    return _currentPlayer;
  }

  function _setCurrentPlayer(playerChar) {
    _currentPlayer = playerChar;
  }

  function _restartGame(){
    gameBoard.resetBoard();
    display.displayBoard();
    _setCurrentPlayer("X");
    display.updateResult(`Player ${_currentPlayer} turn.`);
  }

  function playerMove(x, y) {
    if (gameBoard.getBoardTile(x, y) === "") {
      gameBoard.setBoardTile(x, y, _currentPlayer);
      if (_checkForWin()) {
        display.disableBoard();
        display.updateResult(`Player ${_currentPlayer} has won the game!`);
      } else if (_checkForTie()) {
        display.disableBoard();
        display.updateResult(`It's a tie!`);
      } else {
        _setCurrentPlayer(_currentPlayer === "X" ? "O" : "X");
        display.updateResult(`Player ${_currentPlayer} turn.`);
      }
    }
  }

  function _checkForWin() {
    if ( gameBoard.getBoardTile(0, 0) === _currentPlayer && gameBoard.getBoardTile(1, 1) === _currentPlayer && gameBoard.getBoardTile(2, 2) === _currentPlayer ) {
      return true;
    } else if ( gameBoard.getBoardTile(0, 2) === _currentPlayer && gameBoard.getBoardTile(1, 1) === _currentPlayer && gameBoard.getBoardTile(2, 0) === _currentPlayer ) {
      return true;
    } else {
      for (let i = 0; i < 3; i++) {
        if ( gameBoard.getBoardTile(0, i) === _currentPlayer && gameBoard.getBoardTile(1, i) === _currentPlayer && gameBoard.getBoardTile(2, i) === _currentPlayer ) {
          return true;
        }
        if ( gameBoard.getBoardTile(i, 0) === _currentPlayer && gameBoard.getBoardTile(i, 1) === _currentPlayer && gameBoard.getBoardTile(i, 2) === _currentPlayer ) {
          return true;
        }
      }
    }
    return false;
  }

  function _checkForTie() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameBoard.getBoardTile(i, j) === "") {
          return false;
        }
      }
    }
    return true;
  }

  //TODO: implement minimax algorithm
  function _minimax(depth) {
    let value = _currentPlayer === "O" ? 2 : -2;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {}
    }
  }

  return { getCurrentPlayer, playerMove };
})();

//Updates display
const display = (() => {
  //DOM
  const _boardContainer = document.querySelector(".gameboard");
  const _result = document.querySelector(".result");
  const _playerVsPlayer = document.querySelector(".playervsplayer");
  const _playerVsPc = document.querySelector(".playervspc");
  const _game = document.querySelector(".game");
  const _mode = document.querySelector(".mode");
  const _modeChange = document.querySelector(".mode-change");

  //Listeners
  _playerVsPlayer.addEventListener("click", () => {
    _game.style.display = "grid";
    _mode.style.display = "none";
  });
  _playerVsPc.addEventListener("click", () => {
    _game.style.display = "grid";
    _mode.style.display = "none";
  });
  _modeChange.addEventListener("click", () => {
    _game.style.display = "none";
    _mode.style.display = "grid";
    gameController.restartGame();
  });

  updateResult(`Player ${gameController.getCurrentPlayer()} turn.`);
  displayBoard();

  function displayBoard() {
    _clearBoard();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const boardTile = document.createElement("button");
        boardTile.classList.add("boardTile");
        boardTile.textContent = gameBoard.getBoardTile(i, j);
        boardTile.addEventListener("click", function () {
            this.textContent = gameController.getCurrentPlayer();
            gameController.playerMove(i, j);
          });
        _boardContainer.appendChild(boardTile);
      }
    }
  }

  function _clearBoard() {
    let child = _boardContainer.firstElementChild;
    while (child) {
      _boardContainer.removeChild(child);
      child = _boardContainer.firstElementChild;
    }
  }

  function disableBoard() {
    const buttons = _boardContainer.children;
    for (const button of buttons) {
      button.disabled = true;
    }
  }

  function updateResult(message) {
    _result.textContent = message;
  }

  return { displayBoard, disableBoard, updateResult };
})();
