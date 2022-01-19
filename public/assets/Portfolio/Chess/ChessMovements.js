console.log("movements");

var CheckSpotsW = {
  Rooks: [8, 16, 24, 32, 40, 48, 56, 7, 15, 23, 31, 39, 47, 55],
  Queens: [],
  Knight: [],
  Bishop: [61, 59],
  Pawn: [],
  Count: 4,
  UnderCheck: false,
  EnoughPiecesToCheckMate: true,
  CastlePreventer: false,
};

var CheckSpotsB = {
  Rooks: [8, 16, 24, 32, 40, 48, 56, 7, 15, 23, 31, 39, 47, 55],
  Queens: [],
  Knight: [],
  Bishop: [3, 5],
  Pawn: [],
  Count: 0,
  UnderCheck: false,
  EnoughPiecesToCheckMate: true,
  CastlePreventer: false,
};

// var Matrix =[
//     [1,8],[2,8],[3,8],[4,8],[5,8],[6,8],[7,8],[8,8],
//     [1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],
//     [1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],
//     [1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],
//     [1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],
//     [1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],
//     [1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],
//     [1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1]
//     ]
var Matrix = [
  [1, 8],
  [2, 8],
  [3, 8],
  [4, 8],
  [5, 8],
  [6, 8],
  [7, 8],
  [8, 8],
  [1, 7],
  [2, 7],
  [3, 7],
  [4, 7],
  [5, 7],
  [6, 7],
  [7, 7],
  [8, 7],
  [1, 6],
  [2, 6],
  [3, 6],
  [4, 6],
  [5, 6],
  [6, 6],
  [7, 6],
  [8, 6],
  [1, 5],
  [2, 5],
  [3, 5],
  [4, 5],
  [5, 5],
  [6, 5],
  [7, 5],
  [8, 5],
  [1, 4],
  [2, 4],
  [3, 4],
  [4, 4],
  [5, 4],
  [6, 4],
  [7, 4],
  [8, 4],
  [1, 3],
  [2, 3],
  [3, 3],
  [4, 3],
  [5, 3],
  [6, 3],
  [7, 3],
  [8, 3],
  [1, 2],
  [2, 2],
  [3, 2],
  [4, 2],
  [5, 2],
  [6, 2],
  [7, 2],
  [8, 2],
  [1, 1],
  [2, 1],
  [3, 1],
  [4, 1],
  [5, 1],
  [6, 1],
  [7, 1],
  [8, 1],
];

function Actuator(piece, position, action, information) {
  var Transfer = [];
  var Kills = [5, 11];
  // King Movements
  if (piece === 20 || piece === 2) {
    var options = kingMovement(piece, position, action, information);

    Transfer = options.Transfer;
    Kills = options.Kills;
  }
  // Pawn Movements
  if (piece === p || piece === p0) {
    console.log("chosen pawn");
    var options = PawnMovement(piece, position, action, information);
    console.log(options);
    Transfer = options.Transfer;
    Kills = options.Kills;
    console.log(options);
  }

  if (piece === 20 || piece === 2) {
    var options = kingMovement(piece, position, action, information);

    Transfer = options.Transfer;
    Kills = options.Kills;
  }

  // Rook Movements
  else if (piece === 80 || piece === 8) {
    var options = RookMovement(piece, position, action, information);
    Transfer = options.Transfer;
    Kills = options.Kills;
  }

  const solution = { move: Transfer, kills: Kills };
  console.log(Map);
  return solution;
}

////////////////////////////////////////////// Functions //////////////////////
//// glossary
//1.Kings function
//2.Pawns function
//3.Rooks function

//////Kings
function kingMovement(piece, z, action, Information) {
  var x = Matrix[z][0];
  var y = Matrix[z][1];
  var Transfer = [];
  var Killspot = [];
  var ChessMap = Map;

  //If its only piece left
  if (
    (piece === 20 && CheckSpotsW.Count === 1) ||
    (piece === 2 && CheckSpotsB.Count === 1)
  ) {
    EndGame(2);
  }
  // If neither team has enough to win
  else if (
    (piece === 20 && CheckSpotsW.Count === 1) ||
    (piece === 2 && CheckSpotsB.Count === 1)
  ) {
    EndGame(3);
  } else if (action === "move") {
    if (piece === 20) {
      //Near-Side Castle
      if (
        ChessMap[62] === 0 &&
        ChessMap[61] === 0 &&
        WhiteKingMovement20 === 0 &&
        WhiteRookMovement20 === 0 &&
        CheckSpotsW.CastlePreventer === false
      ) {
        Transfer.push(62);
      }
      //Far Side Castle
      if (
        ChessMap[59] === 0 &&
        ChessMap[58] === 0 &&
        ChessMap[57] === 0 &&
        WhiteKingMovement20 === 0 &&
        WhiteRookMovement20F === 0 &&
        CheckSpotsB.CastlePreventer === false
      ) {
        Transfer.push(58);
      }

      // Valid Movements and Kills
      for (var j = 0; j < 64; j++) {
        if (
          (Matrix[j][1] === y + 1 && Matrix[j][0] === x) ||
          (Matrix[j][1] === y - 1 && Matrix[j][0] === x) ||
          (Matrix[j][1] === y && Matrix[j][0] === x + 1) ||
          (Matrix[j][1] === y && Matrix[j][0] === x - 1) ||
          (Matrix[j][1] === y + 1 && Matrix[j][0] === x + 1) ||
          (Matrix[j][1] === y - 1 && Matrix[j][0] === x - 1) ||
          (Matrix[j][1] === y + 1 && Matrix[j][0] === x - 1) ||
          (Matrix[j][1] === y - 1 && Matrix[j][0] === x + 1)
        ) {
          const NoGo = CheckSpots(j, 20);
          // const MoveIsValid = (20,Map,j)

          if (Map[j] === 0) {
            if (!NoGo) {
              Transfer.push(j);
            }
          }
          if (
            ChessMap[j] === 6 ||
            ChessMap[j] === 5 ||
            ChessMap[j] === 4 ||
            ChessMap[j] === 3 ||
            ChessMap[j] === 8
          ) {
            if (!NoGo) {
              Killspot.push(j);
            }
          }
        }
      }
    } else if (piece === 2) {
      //Near-Side Castle
      if (
        ChessMap[6] === 0 &&
        ChessMap[5] === 0 &&
        BlackKingMovement2 === 0 &&
        BlackRookMovement2 === 0
      ) {
        Transfer.push(6);
      }
      //Far Side Castle
      if (
        ChessMap[1] === 0 &&
        ChessMap[2] === 0 &&
        ChessMap[3] === 0 &&
        BlackKingMovement2 === 0 &&
        BlackRookMovement2F === 0
      ) {
        Transfer.push(2);
      }

      for (var j = 0; j < 64; j++) {
        const NoGo = CheckSpots(j, 2);

        if (
          (Matrix[j][1] === y + 1 && Matrix[j][0] === x) ||
          (Matrix[j][1] === y - 1 && Matrix[j][0] === x) ||
          (Matrix[j][1] === y && Matrix[j][0] === x + 1) ||
          (Matrix[j][1] === y && Matrix[j][0] === x - 1) ||
          (Matrix[j][1] === y + 1 && Matrix[j][0] === x + 1) ||
          (Matrix[j][1] === y - 1 && Matrix[j][0] === x - 1) ||
          (Matrix[j][1] === y + 1 && Matrix[j][0] === x - 1) ||
          (Matrix[j][1] === y - 1 && Matrix[j][0] === x + 1)
        ) {
          if (Map[j] === 0) {
            if (!NoGo) {
              Transfer.push(j);
            }
          } else if (
            ChessMap[j] === 60 ||
            ChessMap[j] === 50 ||
            ChessMap[j] === 40 ||
            ChessMap[j] === 30 ||
            ChessMap[j] === 80
          ) {
            if (!NoGo) {
              Killspot.push(j);
            }
          }
        }
      }
    }
  }

  if (Transfer.length === 0) {
    //If it is under check with no valid moves left
    if (
      (piece === 20 && CheckSpotsW.UnderCheck === true) ||
      (piece === 2 && CheckSpotsB.UnderCheck === true)
    ) {
      EndGame(0);
    }
    //If its not under check but no valid moves options
    else if (
      (piece === 20 && CheckSpotsW.UnderCheck === true) ||
      (piece === 2 && CheckSpotsB.UnderCheck === true)
    ) {
      EndGame(1);
    }
  }

  const solution = { Transfer: Transfer, Kills: Killspot };
  return solution;
}
///// Pawns
function PawnMovement(piece, z, action, Information) {
  var x = Matrix[z][0];
  var y = Matrix[z][1];
  var Transfer = [];
  var Killspot = [];
  var ChessMap = [...Map];

  ////////////////////////////////////////////////////////////////////////// White pawn movement//////////////////////////////////////////////////////
  if (ChessMap[z] === p0) {
    console.log("White pawn selected");
    // CheckIfMoveValid(piece, 34);
    for (var j = 0; j < 64; j++) {
      if (z > 47 && ChessMap[z - 8] === 0) {
        if (
          (Matrix[j][1] === y + 1 && Matrix[j][0] === x) ||
          (Matrix[j][1] === y + 2 && Matrix[j][0] === x)
        ) {
          if (ChessMap[j] === 0) {
            const viable = CheckValidity(p0, j, 20);
            console.log(`spot ${j} viability is ${viable} `);

            if (viable) {
              Transfer.push(j);
            }
          }
        }
        if (
          (Matrix[j][1] === y + 1 && Matrix[j][0] === x + 1) ||
          (Matrix[j][1] === y + 1 && Matrix[j][0] === x - 1)
        ) {
          if (
            ChessMap[j] === 6 ||
            ChessMap[j] === 8 ||
            ChessMap[j] === 4 ||
            ChessMap[j] === 3 ||
            ChessMap[j] === 1
          ) {
            const viable = CheckValidity(p0, j, 20);
            console.log(`spot ${j} viability is ${viable} `);

            if (viable) {
              Transfer.push(j);
            }
          }
        }
      } else {
        if (Matrix[j][1] === y + 1 && Matrix[j][0] === x) {
          if (ChessMap[j] === 0) {
            const viable = CheckValidity(p0, j, 20);
            console.log(`spot ${j} viability is ${viable} `);

            if (viable) {
              Transfer.push(j);
            }
          }
        } else if (
          (Matrix[j][1] === y + 1 && Matrix[j][0] === x + 1) ||
          (Matrix[j][1] === y + 1 && Matrix[j][0] === x - 1)
        ) {
          console.log("condition 2B");
          if (
            ChessMap[j] === 6 ||
            ChessMap[j] === 8 ||
            ChessMap[j] === 4 ||
            ChessMap[j] === 3 ||
            ChessMap[j] === 1
          ) {
            const viable = CheckValidity(p0, j, 20);
            console.log(`spot ${j} viability is ${viable} `);

            if (viable) {
              Killspot.push(j);
            }
          }
        }
      }
    }
  }
  ////////////////////////////////////////////////////////// Player 2 pawn//////////////////////////////////////////////////////
  else if (ChessMap[z] === p) {
    console.log("Black pawn selected");
    for (var j = 0; j < 64; j++) {
      // CheckIfMoveValid(piece, 34);
      if (z < 16 && ChessMap[z + 8] === 0) {
        if (
          (Matrix[j][1] === y - 1 && Matrix[j][0] === x) ||
          (Matrix[j][1] === y - 2 && Matrix[j][0] === x)
        ) {
          if (ChessMap[j] === 0) {
            const viable = CheckValidity(p, j, 2);
            console.log(`spot ${j} viability is ${viable} `);

            if (viable) {
              Transfer.push(j);
            }
          }
        }
        if (
          (Matrix[j][1] === y - 1 && Matrix[j][0] === x + 1) ||
          (Matrix[j][1] === y - 1 && Matrix[j][0] === x - 1)
        ) {
          if (
            ChessMap[j] === 60 ||
            ChessMap[j] === 80 ||
            ChessMap[j] === 40 ||
            ChessMap[j] === 30 ||
            ChessMap[j] === 10
          ) {
            const viable = CheckValidity(p, j, 2);
            console.log(`spot ${j} viability is ${viable} `);

            if (viable) {
              Transfer.push(j);
            }
          }
        }
      } else {
        if (Matrix[j][1] === y - 1 && Matrix[j][0] === x) {
          if (ChessMap[j] === 0) {
            const viable = CheckValidity(p, j, 2);
            console.log(`spot ${j} viability is ${viable} `);

            if (viable) {
              Transfer.push(j);
            }
          }
        }
      }
      if (
        (Matrix[j][1] === y - 1 && Matrix[j][0] === x - 1) ||
        (Matrix[j][1] === y - 1 && Matrix[j][0] === x + 1)
      ) {
        console.log(`spot ${Matrix[j][0]} ${Matrix[j]}`);
        if (
          ChessMap[j] === 60 ||
          ChessMap[j] === 80 ||
          ChessMap[j] === 40 ||
          ChessMap[j] === 30 ||
          ChessMap[j] === 10
        ) {
          const viable = CheckValidity(p, j, 2);
          console.log(`spot ${j} viability is ${viable} ** `);

          if (viable) {
            Killspot.push(j);
          }
        }
      }
    }

    /////////
  }

  const solution = { Transfer: Transfer, Kills: Killspot };
  return solution;
}
/////////////////////////Rook Movement Function ////////////////////////
function RookMovement(piece, z, action, Information) {
  var Transfer = [];
  var Killspot = [5, 11];
  var brk = 0;
  var brk2 = 0;
  var brk3 = 0;
  var brk4 = 0;

  var x = Matrix[z][0];
  var y = Matrix[z][1];

  if (action === "move") {
    ///////////////////////[MOVEMENT TYPE 1:  TOWARDS RIGHT]
    for (var j = z; j < 64; j++) {
      if (brk === 1) {
        break;
      }

      for (var n = 1; n < 8; n++) {
        if (Matrix[j][0] === x + n && Matrix[j][1] === y) {
          if (Map[j] !== 0) {
            Killspot.push(j);
            brk = 1;
            break;
          }
          if (Map[j] === 0) {
            Transfer.push(j);
          }
        }
      }
    }
  }

  const solution = { Transfer: Transfer, Kills: Killspot };
  return solution;
}

// The below function takes in a spot (x) and white/black king piece
// and returns true if the spot is under direct fire from an
// opposing piece
function CheckSpots(x, piece) {
  var spot = false;

  if (piece === 20) {
    spot =
      CheckSpotsW.Pawn.some((num) => num === x) ||
      CheckSpotsW.Bishop.some((num) => num === x) ||
      CheckSpotsW.Knight.some((num) => num === x) ||
      CheckSpotsW.Rooks.some((num) => num === x) ||
      CheckSpotsW.Queens.some((num) => num === x);
  } else if (piece === 2) {
    spot =
      CheckSpotsB.Pawn.some((num) => num === x) ||
      CheckSpotsB.Bishop.some((num) => num === x) ||
      CheckSpotsB.Knight.some((num) => num === x) ||
      CheckSpotsB.Rooks.some((num) => num === x) ||
      CheckSpotsB.Queens.some((num) => num === x);
  }

  return spot;
}
