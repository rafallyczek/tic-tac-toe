const gameModule = (() => {
  const gameboard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  //DOM
  const board = document.querySelector(".gameboard");

  _displayBoard();

  function _displayBoard() {
    _clearBoard();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const button = document.createElement("button");
        button.classList.add("boardTile");
        button.textContent = gameboard[i][j];
        button.addEventListener("click", () => {
          _updateBoard(i, j);
        });
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
    gameboard[i][j] = "X";
    _displayBoard();
  }

  
})();
