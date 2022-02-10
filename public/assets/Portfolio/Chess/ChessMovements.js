console.log("movements");
const infoFromB = { spot: 2, alerts: [10, 18, 26, 34, 42, 50, 58] };
const infoFromW = { spot: 56, alerts: [0, 8, 16, 24, 32, 40, 48] };
var CheckSpotsW = {
  Rooks: [],
  Queens: [],
  Knight: [],
  Bishop: [],
  Pawn: [],
  Count: 4,
  UnderCheck: false,
  EnoughPiecesToCheckMate: true,
  CastlePreventer: false,
};

var TotalNoGo = [];

var CheckSpotsB = {
  Rooks: [],
  Queens: [],
  Knight: [],
  Bishop: [],
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
  var Kills = [];
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

  if (action === "move") {
    if (piece === 20) {
      //Near-Side Castle
      if (
        ChessMap[62] === 0 &&
        ChessMap[61] === 0 &&
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
      if (ChessMap[6] === 0 && ChessMap[5] === 0 && BlackKingMovement2 === 0) {
        Transfer.push(6);
      }
      //Far Side Castle
      if (
        ChessMap[1] === 0 &&
        ChessMap[2] === 0 &&
        ChessMap[3] === 0 &&
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

  console.log(TotalNoGo);
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

  //////////////////////////////////////////////////White pawn movement//////////////////////////////////////////////////////
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
          if (action === "kill") {
            Killspot.push(j);
          }
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
          if (action === "kill") {
            Killspot.push(j);
          }

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
  //////////////////////////////////////////////////Black pawn movement//////////////////////////////////////////////////////
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
          if (action === "kill") {
            Killspot.push(j);
          }
          if (
            ChessMap[j] === 60 ||
            ChessMap[j] === 80 ||
            ChessMap[j] === 40 ||
            ChessMap[j] === 30 ||
            ChessMap[j] === 10
          ) {
            const viable = CheckValidity(p, j, 2);
            console.log(`spot ${j} viability is ${viable} `);
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
        if (action === "kill") {
          Killspot.push(j);
        }
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
  var Killspot = [];
  var brk = 0;
  var brk2 = 0;
  var brk3 = 0;
  var brk4 = 0;

  var x = Matrix[z][0];
  var y = Matrix[z][1];

  if (action === "move") {
    ///////////////////////[MOVEMENT TYPE 1:  TOWARDS RIGHT]
    for (var j = z; j < 64; j++) {
      var MainBreaker;
      if (MainBreaker === 1) {
        break;
      }
      if (Matrix[z][0] === 8) {
        MainBreaker = 1;
        break;
      }
      // This loop scans the next 1-7 squares to the right of the spot
      // If the X value on the square reaches 8, stop the loop with the
      // Internal breaker
      for (var n = 1; n < 8; n++) {
        var InternalBreaker = 0;
        if (InternalBreaker === 1) {
          break;
        }

        if (Matrix[j][0] === x + n && Matrix[j][1] === y) {
          var viable;
          if (Map[j] === 0) {
            if (piece === 80) {
              viable = CheckValidity(piece, j, k0);
            }
            if (piece === 8) {
              viable = CheckValidity(piece, j, k);
            }

            if (viable) {
              console.log("viability of move ", j, " is ", viable);
              Transfer.push(j);
            } // End of condition one to check when spot is empty (HCL-0)
          } // End of condition one to check when spot is empty (HCL-0)
          else if (Map[j] !== 0) {
            if (piece === 80) {
              if (
                Map[j] === 80 ||
                Map[j] === 60 ||
                Map[j] === 40 ||
                Map[j] === q0 ||
                Map[j] === k0 ||
                Map[j] === 30
              ) {
                console.log("80-HCL-1-SP breaker initiated", j);
                MainBreaker = 1;
                InternalBreaker = 1;
                break;
              } // End of 80-HCL-1 SAME PIECE BREAKER
              else if (
                Map[j] === 8 ||
                Map[j] === 6 ||
                Map[j] === 4 ||
                Map[j] === q ||
                Map[j] === k ||
                Map[j] === 3
              ) {
                const viable = CheckValidity(piece, j, piece);
                if (viable) {
                  Killspot.push(j);

                  console.log("80-HCL-1-OP breaker initiated", j);
                }
                MainBreaker = 1;
                InternalBreaker = 1;
              } // End of 80-HCL-1 OPPONENT PIECE BREAKER
              InternalBreaker = 1;

              break;
            } //End of HCL-1 for 80 (80-HCL-1)
            else if (piece === 8) {
              if (
                Map[j] === 8 ||
                Map[j] === 6 ||
                Map[j] === 4 ||
                Map[j] === q ||
                Map[j] === k ||
                Map[j] === 3
              ) {
                console.log("8-HCL-1-SP breaker initiated", j);
                MainBreaker = 1;
                break;
              } // End of 80-HCL-1 SAME PIECE BREAKER
              else if (
                Map[j] === 80 ||
                Map[j] === 60 ||
                Map[j] === 40 ||
                Map[j] === q0 ||
                Map[j] === k0 ||
                Map[j] === 30
              ) {
                const viable = CheckValidity(piece, j, piece);
                if (viable) {
                  Killspot.push(j);

                  console.log("8-HCL-1-OP breaker initiated", j);
                }
                MainBreaker = 1;
              } // End of 80-HCL-1 OPPONENT PIECE BREAKER
              InternalBreaker = 1;

              break;
            } //End of HCL-1 for 8 (8-HCL-1)
            InternalBreaker === 1;
            MainBreaker = 1;
          } // End of condition one to check when spot is not empty (HCL-1)
        } // End of horizontal checker loop (HCL)
      } // End of 8max iteration loop
    } // End of 64max iteration loop
  } /// End of (action === move) condition
  ///////////////////////// [MOVEMENT TYPE 2: TOWARDS LEFT]
  const solution = { Transfer: Transfer, Kills: Killspot };
  return solution;
}

// The below function takes in a spot (x) and white/black king piece
// and returns true if the spot is under direct fire from an
// opposing piece
function CheckSpots(x, piece) {
  TotalNoGo = [];
  var spot = false;

  if (CheckSpotsW.Rooks.length > 0) {
    for (var j = 0; j < CheckSpotsW.Rooks.length; j++) {
      for (var k = 0; k < CheckSpotsW.Rooks[j].info.alerts.length; k++) {
        TotalNoGo.push(CheckSpotsW.Rooks[j].info.alerts[k]);
      }
    } //End of Loop that Checks all the white rook NoGos
  } /// End of Condition that Checks all the white rook NoGos

  if (CheckSpotsB.Rooks.length > 0) {
    for (var j = 0; j < CheckSpotsB.Rooks.length; j++) {
      for (var k = 0; k < CheckSpotsB.Rooks[j].info.alerts.length; k++) {
        TotalNoGo.push(CheckSpotsB.Rooks[j].info.alerts[k]);
      }
    } //End of Loop that Checks all the black rook NoGos
  } /// End of Condition that Checks all the black rook NoGos

  if (piece === 20) {
    spot =
      CheckSpotsW.Pawn.some((num) => num === x) ||
      CheckSpotsW.Bishop.some((num) => num === x) ||
      CheckSpotsW.Knight.some((num) => num === x) ||
      TotalNoGo.some((num) => num === x) ||
      CheckSpotsW.Queens.some((num) => num === x);
  } else if (piece === 2) {
    spot =
      CheckSpotsB.Pawn.some((num) => num === x) ||
      CheckSpotsB.Bishop.some((num) => num === x) ||
      CheckSpotsB.Knight.some((num) => num === x) ||
      TotalNoGo.some((num) => num === x) ||
      CheckSpotsB.Queens.some((num) => num === x);
  }

  return spot;
}
