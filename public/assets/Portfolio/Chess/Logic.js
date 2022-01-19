console.log("Logic");

function MainLogic(spot, piece) {
  var x = Matrix[spot][0];
  var y = Matrix[spot][1];
  var ChessMap = Map;

  console.log(x, y);

  var validmove = true;
  /// Check for horse check
  if (piece === 2) {
    for (var j = 0; j < 64; j++) {
      if (
        (Matrix[j][1] === y - 1 && Matrix[j][0] == x - 2) ||
        (Matrix[j][1] === y - 1 && Matrix[j][0] == x + 2) ||
        (Matrix[j][1] === y + 1 && Matrix[j][0] == x - 2) ||
        (Matrix[j][1] === y + 1 && Matrix[j][0] == x + 2) ||
        (Matrix[j][1] === y - 2 && Matrix[j][0] == x - 1) ||
        (Matrix[j][1] === y - 2 && Matrix[j][0] == x + 1) ||
        (Matrix[j][1] === y + 2 && Matrix[j][0] == x - 1) ||
        (Matrix[j][1] === y + 2 && Matrix[j][0] == x + 1)
      ) {
        console.log(j);
        if (ChessMap[j] === 60) {
          validmove = false;
          break;
        }
      }
    }
  }
  /////////////
  if (piece === 20) {
    for (var j = 0; j < 64; j++) {
      if (
        (Matrix[j][1] === y - 1 && Matrix[j][0] == x - 2) ||
        (Matrix[j][1] === y - 1 && Matrix[j][0] == x + 2) ||
        (Matrix[j][1] === y + 1 && Matrix[j][0] == x - 2) ||
        (Matrix[j][1] === y + 1 && Matrix[j][0] == x + 2) ||
        (Matrix[j][1] === y - 2 && Matrix[j][0] == x - 1) ||
        (Matrix[j][1] === y - 2 && Matrix[j][0] == x + 1) ||
        (Matrix[j][1] === y + 2 && Matrix[j][0] == x - 1) ||
        (Matrix[j][1] === y + 2 && Matrix[j][0] == x + 1)
      ) {
        console.log(j);
        if (ChessMap[j] === 6) {
          validmove = false;
          break;
        }
      }
    }
  }

  return validmove;
}

function CheckValidity(piece, destination, set) {
  var truth = true;

  var TestMap = [...Map];

  var kingSpot;

  ///// black king
  if (set === 2) {
    for (var j = 0; j < 64; j++) {
      if (TestMap[j] === 2) {
        kingSpot = j;
      }
    }
    var x = Matrix[kingSpot][0];
    var y = Matrix[kingSpot][1];
    TestMap[destination] = piece;
    for (var j = 0; j < 64; j++) {
      //Checking for pawn checks
      if (
        (Matrix[j][1] === y - 1 && Matrix[j][0] == x - 1) ||
        (Matrix[j][1] === y - 1 && Matrix[j][0] == x + 1)
      ) {
        if (TestMap[j] === 30) {
          console.log("condition 1 met", kingSpot, j);
          return false;
          break;
        }
      }
    }
  } else if (set === 20) {
    for (var j = 0; j < 64; j++) {
      if (TestMap[j] === 20) {
        kingSpot = j;
      }
    }
    var x = Matrix[kingSpot][0];
    var y = Matrix[kingSpot][1];
    for (var j = 0; j < 64; j++) {
      //Checking for pawn checks
      if (
        (Matrix[j][1] === y + 1 && Matrix[j][0] == x - 1) ||
        (Matrix[j][1] === y + 1 && Matrix[j][0] == x + 1)
      ) {
        if (TestMap[j] === 3) {
          console.log("condition 2 met", kingSpot, j);

          return false;
          break;
        }
      }
    }
  }

  return truth;
}
