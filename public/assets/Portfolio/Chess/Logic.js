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
  var truth = false;

  var TestMap = [...Map];

  var kingSpot;
  if (set === k) {
    for (var j = 0; j < 64; j++) {
      if (TestMap[j] === 20) {
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
        (Matrix[j][1] === y - 2 && Matrix[j][0] == x + 1)
      ) {
        console.log("truth");
        return false;
        break;
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
        (Matrix[j][1] === y - 1 && Matrix[j][0] == x - 1) ||
        (Matrix[j][1] === y - 2 && Matrix[j][0] == x + 1)
      ) {
        console.log("truth");
        return false;
        break;
      }
    }
  }

  return truth;
}
