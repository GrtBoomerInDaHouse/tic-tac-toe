const gameBoard = (() => {
  let board = [];

  for (i = 1; i <= 9; i++) {
    board.push(i);
  }

  return { board };
})();

const playGround = (pl1, pl2) => {
  const hit = (cube) => {
    let x = "X";
    o = "O";
    countX = gameBoard.board.filter((el) => el === "X");
    countO = gameBoard.board.filter((el) => el === "O");

    if (countX.length <= countO.length) {
      gameBoard.board.splice(cube, 1, x);
      turn.textContent = `${pl2} turn!`;
    } else {
      gameBoard.board.splice(cube, 1, o);
      turn.textContent = `${pl1} turn!`;
    }
  };

  return {
    pl1,
    pl2,
    hit,
  };
};

const main = document.querySelector(".main");
const inputPl1 = document.querySelector("#player-1");
const inputPl2 = document.querySelector("#player-2");
const turn = document.querySelector(".turn");
const winner = document.querySelector(".winner");
const cells = document.querySelectorAll(".cube");


let players = playGround("Player One", "Player Two");

document.addEventListener("click", (e) => {
  if (e.target.matches(".cube")) {
    if (e.target.textContent === "") {
      players.hit(e.target.id - 1);
      e.target.textContent = gameBoard.board[e.target.id - 1];

      let winner = game.checkWinner(gameBoard.board);

      game.showWinner(winner);
      game.crossLine(winner);
    } else {
      return;
    }
  }
});

document.addEventListener("click", (e) => {
  const popUp = document.querySelector(".players-div");

  if (e.target.matches(".start")) {
    popUp.setAttribute("style", "display:flex");
    inputPl1.value = "";
    inputPl2.value = "";
  } else if (e.target.matches(".out-btn")) {
    popUp.removeAttribute("style", "display:flex");
  } else if (e.target.matches(".ok-btn")) {
    player1 = inputPl1.value;
    player2 = inputPl2.value;
    players = playGround(player1, player2);
    popUp.removeAttribute("style", "display:flex");
    turn.textContent = `${player1} vs ${player2}`;
  }
});

document.addEventListener("keypress", (e) => {
  if (e.target.matches("#player-1")) {
    if (inputPl1.value.length > 10) {
      e.preventDefault();
    } else {
      inputPl1.textContent += e.key;
    }
  } else if (e.target.matches("#player-2")) {
    if (inputPl2.value.length > 10) {
      e.preventDefault();
    } else {
      inputPl2.textContent += e.key;
    }
  }
});

//  RESTART GAME

document.addEventListener("click", (e) => {
  if (e.target.matches(".winner")) {
    game.clear();
    winner.removeAttribute("style", "display:flex");
    main.removeAttribute("style", "filter: blur(1px)");
  } else if (e.target.matches(".restart")) {
    game.clear();
  }
});







const game = (() => {
  const clear = () => {
    gameBoard.board = [];
    for (i = 1; i <= 9; i++) {
      gameBoard.board.push(i);
    }

    cells.forEach((el) => {
      el.textContent = "";
    });

    turn.textContent = `${players.pl1} vs ${players.pl2}`;

    inputPl1.value = "";
    inputPl2.value = "";
  };

  const checkWinner = (arr) => {
    // split array on 3x3 array

    let winner = "";
    let arrClone = [...arr];
    let winBoard = ["", "", ""].map(() => {
      return arrClone.splice(0, 3);
    });

    // Check winner position horizontal, vertical etc id = first cell id, player = 'X"(pl1) or "O" (pl2);

    for (i = 0; i < winBoard.length; i++) {
      if (
        winBoard[i][0] === winBoard[i][1] &&
        winBoard[i][0] === winBoard[i][2]
      ) {
        winner = {
          pos: "x",
          id: i === 1 || i === 2 ? i * 3 : i,
          player: winBoard[i][0],
        };
      } else if (
        winBoard[0][i] === winBoard[1][i] &&
        winBoard[0][i] === winBoard[2][i]
      ) {
        winner = { pos: "y", id: i, player: winBoard[0][i] };
      } else if (
        winBoard[0][0] === winBoard[1][1] &&
        winBoard[0][0] === winBoard[2][2]
      ) {
        winner = { pos: "z", id: 0, player: winBoard[0][0] };
      } else if (
        winBoard[0][2] === winBoard[1][1] &&
        winBoard[0][2] === winBoard[2][0]
      ) {
        winner = { pos: "z", id: 2, player: winBoard[0][2] };
      }
    }

    return winner;
  };

  const crossLine = (obj) => {
    let line = document.createElement("div");
    if (obj.pos === "x") {
      line.classList.add("x-cross");
    } else if (obj.pos === "y") {
      line.classList.add("y-cross");
    } else if (obj.pos === "z") {
      obj.id === 2
        ? line.classList.add("z-cross-left")
        : line.classList.add("z-cross-right");
    }

    obj.id !== undefined && cells[obj.id].appendChild(line);
  };

  const showWinner = (obj) => {
    let sign = obj[Object.keys(obj)[2]];

    if (sign !== undefined) {
      let player = sign === "X" ? players.pl1 : players.pl2;
      setTimeout(() => {
        winner.setAttribute("style", "display: flex");
        winner.innerHTML = `<h2>${player} WINS!</h2>`;
        main.setAttribute("style", "filter: blur(1px)");
      }, 500);
      turn.textContent = "";
    }
  };

  return { clear, checkWinner, showWinner, crossLine };
})();
