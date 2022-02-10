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
  TestMap[destination] = piece;
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

function UpdateCheckPoints(piece, depart, dest, array) {
  var j = dest;
  var prev = depart;
  if (array === CheckSpotsW) {
    if (Map[j] === p0) {
      const solution = PawnMovement(piece, dest, "kill", Map);
      const info = { spot: j, alerts: solution.Kills };
      CheckSpotsW.Pawn.push({ info });

      console.log(prev);
      CheckSpotsW.Pawn = CheckSpotsW.Pawn.filter(
        (unit) => unit.info.spot !== prev
      );
      console.log("CheckSpots for white", CheckSpotsW);
    } /// End of white pawn Condition
    if (Map[j] === 80) {
      console.log("white rook moved");
      const solution = RookMovement(piece, j, "move", Map);
      console.log(solution);
      const alerts = solution.Kills.concat(solution.Transfer);

      const info = { spot: j, alerts: alerts };
      CheckSpotsW.Rooks.push({ info });

      console.log(prev);
      CheckSpotsW.Rooks = CheckSpotsW.Rooks.filter(
        (unit) => unit.info.spot !== prev
      );
      console.log("CheckSpots for white", CheckSpotsW);
    } /// End of white Rook Condition
  } /// End of White piece Condition
  else if (array === CheckSpotsB) {
    if (Map[j] === p) {
      console.log("Black pawn moved");
      const solution = PawnMovement(piece, dest, "kill", Map);
      console.log(solution);
      const info = { spot: j, alerts: solution.Kills };
      CheckSpotsB.Pawn.push({ info });

      console.log(prev);
      CheckSpotsB.Pawn = CheckSpotsB.Pawn.filter(
        (unit) => unit.info.spot !== prev
      );
      console.log("CheckSpots for black", CheckSpotsB);
    } // End of Black Pawn condition
    if (Map[j] === 8) {
      console.log("Black rook moved");
      const solution = RookMovement(piece, j, "move", Map);
      console.log(solution);
      const alerts = solution.Kills.concat(solution.Transfer);

      const info = { spot: j, alerts: alerts };
      CheckSpotsB.Rooks.push({ info });

      console.log(prev);
      CheckSpotsB.Rooks = CheckSpotsB.Rooks.filter(
        (unit) => unit.info.spot !== prev
      );
      console.log("CheckSpots for black", CheckSpotsB);
    }
  } /// End of Black piece Condition
}

function CheckCastleBlock(piece, array) {
  if (piece === "white") {
    for (var j = 0; j < array.Rooks.length; j++) {
      for (var k = 0; k < array.Rooks[j].info.alerts.length; k++) {
        if (array.Rooks[j].info.alerts[k] === 10) {
          console.log("true");
          array.CastlePreventer = true;
          break;
        }
        console.log(
          `loop ${j}, alert iteration ${k}`,
          array.Rooks[j].info.alerts[k]
        );
      }
    }
  }
  if (piece === "black") {
    for (var j = 0; j < array.Rooks.length; j++) {
      for (var k = 0; k < array.Rooks[j].info.alerts.length; k++) {
        if (array.Rooks[j].info.alerts[k] === 24) {
          console.log("true");
          array.CastlePreventer = true;
          break;
        }
        console.log(
          `loop ${j}, alert iteration ${k}`,
          array.Rooks[j].info.alerts[k]
        );
      }
    }
  }
}
