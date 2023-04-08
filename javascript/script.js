const gameModule = (() => {
  const gameboard = [];

  //DOM
  const board = document.querySelector(".gameboard");

  _displayBoard();

  function _displayBoard() {
    _clearBoard();
    for (let i = 0; i < 9; i++) {
      const button = document.createElement("button");
      button.classList.add("boardTile");
      if (gameboard[i]) {
        button.textContent = gameboard[i];
      }
      board.appendChild(button);
    }
  }

  function _clearBoard() {
    let child = board.firstElementChild;
    while (child) {
      board.removeChild(child);
      child = board.firstElementChild;
    }
  }
})();
