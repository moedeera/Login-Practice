/// Paw VARIABLE SPOTS
var spot = 4;
var spot0 = 60;
var TotalNoGoB;
var RedAlert = false;
const boxes = document.querySelectorAll(".box");
var connection = false;

socket.on("start", (data) => {
  connection = data;
});
///////////////////////GAME RELATED TRANSMISSIONS FROM SOCKET.IO/////////////////
// Receives movement information on the Chess Game from other player
socket.on("Chess-Game", (data) => {
  console.log(data);
  z = 1;
  OutPut(data);
  start = true;
});
// Receives Check information on the Chess Game from other player
socket.on("checked", (msg) => {
  alert(msg);
});
// Receives Alert information on the Chess Game from other player
socket.on("alert", (msg) => {
  if (msg === "xyz" && RedAlert === false) {
    console.log("Opponent can no longer win ");
  } else if (msg === "xyz" && RedAlert === true) {
    EndGame(3);
  }
});
// This is intended only for testing purposes
document.getElementById("host").addEventListener("click", () => {
  RedAlert === !RedAlert;
  console.log(RedAlert);

  EndGame(3);
});

/////////////////////////////////// VARIABLES FOR MAP ////////////////////
var q = 1;
var q0 = 10;
var k = 2;
var k0 = 20;
var one = 1;
var two = 10;
var Player = 10;
var state = 0;
var p = 3;
var p0 = 30;

var prev;
// var Map = [

//     8,0,0,0,k,0,0,8,
//     0,0,0,0,0,0,0,0,
//     0,0,0,0,0,0,0,0,

//     0,0,0,0,0,0,0,0,
//     0,0,0,0,0,0,0,0,
//     0,0,0,0,0,0,0,0,
//     0,0,0,0,0,0,0,0,
//     80,0,0,0,k0,0,0,80,
//     ]
//***** Live version*/
var Map = [
  8,
  6,
  4,
  q,
  k,
  4,
  6,
  8,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  30,
  30,
  30,
  30,
  30,
  30,
  30,
  30,
  80,
  60,
  40,
  q0,
  k0,
  40,
  60,
  80,
];
// var Map = [
//   8,
//   0,
//   0,
//   0,
//   k,
//   0,
//   0,
//   8,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   80,
//   80,
//   0,
//   0,
//   k0,
//   0,
//   0,
//   0,
// ];

// var Map = [
//   8,
//   6,
//   4,
//   q,
//   k,
//   4,
//   6,
//   8,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   80,
//   60,
//   40,
//   q0,
//   k0,
//   40,
//   60,
//   80,
// ];

////////////////////////// VARIABLES FOR TURN-CONTROL ////////////////////

var start = false;
var turn = 1;
var z = 0;
/////////////////// INFO OBJECTS CONTROLS GAME

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

const Info = {
  player: "",
  state: "",
  map: "",
  turn: "",
  CheckSpotsW: CheckSpotsW,
  CheckSpotsB: CheckSpotsB,
};

Info.player = 10;
Info.state = 0;
Info.map = Map;
Info.turn = 1;

////////////////////////// VARIABLE TO CONTROL  GAME FLOW //////////////

// Castle variables
var WhiteRookMovement20 = 0;
var WhiteRookMovement20F = 0;
var WhiteKingMovement20 = 0;

var BlackRookMovement2 = 0;
var BlackRookMovement2F = 0;
var BlackKingMovement2 = 0;
// Pinned Variables
var WhitePinned10 = [];
var BlackedPinned1 = [];
// PieceMovements
var PieceMovements = [];
var PieceKills = [];
//Check Control
let UnderCheck = false;
// Game Board
let GameCounter = {
  WR10: WhiteKingMovement20,
  WK10: WhiteRookMovement20,
  BR10: BlackKingMovement2,
  BR1: BlackRookMovement2,
  WPinned10: WhitePinned10,
  BPinned1: BlackedPinned1,
  PM: PieceMovements,
  PK: PieceKills,
  Check: false,
};
//////////////////////////////// RESET OF GAME CONFIGURATION /////////////////////
/// THIS IS FOR WHEN THE GAME NEEDS TO BE RESET
socket.on("reset", (msg) => {
  console.log(msg);
  console.log(host.innerHTML, username);
  board.classList.remove("no-show");

  if (msg === "guest exited" && host.innerHTML === username) {
    console.log("condition hit");
    guest.innerHTML = "waiting.....";
    guest.style.color = "green";
    board.classList.add("no-show");
  } else {
    guest.innerHTML = "User2";

    host.innerHTML = "User1";
  }

  connection = false;
  start = false;
  turn = 1;
  Info.state = 0;

  document.getElementById("turn").style.background = "white";
  document.getElementById("turn").innerHTML = "";

  z = 0;

  Map = [
    8,
    6,
    4,
    q,
    k,
    4,
    6,
    8,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    80,
    60,
    40,
    q0,
    k0,
    40,
    60,
    80,
  ];

  console.log(Map, Info.map);
  Mapper();
});

// -------------------------------------changeZ() Function------------------------------
// This function is intended to change a Value Z to rotate between turns
// This takes advantage of socket.emit feature
//  Socket.emit sends information from player 1 to player 2
// The first player to make a move, locks his z value at 1(meaning he can't move)
// The second player to make a move gets a transmission that locks him from moving
//   the team player 1 already moved.
// Player 1 is unlocked as soon as he gets a successful transmission from player 2
function changeZ() {
  z === 1;
  Info.state = 0;
  Indicator();
}

/////////////////////////// TESTING-RELATED-FUNCTION ///////////////
// This function is for the sole purpose of testing in development stages

function Indicator() {
  if (z === 1) {
    document.getElementById("turn").style.background = "teal";

    if (Info.state === 0) {
      document.getElementById("turn").innerHTML = " Nothing picked";
    } else if (Info.state === 1) {
      document.getElementById("turn").innerHTML = " Valid Option picked";
    } else if (Info.state === 2) {
      document.getElementById("turn").innerHTML = `
    <div>submitted<div> <div> ${Map} <div>`;
    }
  } else if (z === 0) {
    document.getElementById("turn").style.background = "coral";
    if (Info.state === 0) {
      document.getElementById("turn").innerHTML = " Nothing picked";
    } else if (Info.state === 1) {
      document.getElementById("turn").innerHTML = " Valid Option picked";
    } else if (Info.state === 2) {
      document.getElementById("turn").innerHTML = `submitted ${Map}`;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////
var pawnAlert = false;
var MapPrevious = 0;

/////////////// LOADS CHESS MAP ON LOADING OF PAGE ///////////////////
window.addEventListener("DOMContentLoaded", Mapper);
////// Game Starts with click
document.querySelector(".board").addEventListener("click", (e) => {
  var indexOfBox;
  for (var j = 0; j < 64; j++) {
    if (e.target === boxes[j]) {
      indexOfBox = j;
    }
  }
  // console.log(`z value is ${z}, Info state is ${Info.state} `)

  if (connection === true) {
    if (z === 1 || start === false) {
      start = true;
      Indicator();
      PlayGame(e);

      if (Info.state === 2) {
        // First Condition is for Pawns
        if (
          (indexOfBox === 0 && MapPrevious === 30) ||
          (indexOfBox === 1 && MapPrevious === 30) ||
          (indexOfBox === 2 && MapPrevious === 30) ||
          (indexOfBox === 3 && MapPrevious === 30) ||
          (indexOfBox === 4 && MapPrevious === 30) ||
          (indexOfBox === 5 && MapPrevious === 30) ||
          (indexOfBox === 6 && MapPrevious === 30) ||
          (indexOfBox === 7 && MapPrevious === 30)
        ) {
          spot = indexOfBox;
          Pawn();
        }
        if (
          (indexOfBox === 63 && MapPrevious === 3) ||
          (indexOfBox === 62 && MapPrevious === 3) ||
          (indexOfBox === 61 && MapPrevious === 3) ||
          (indexOfBox === 60 && MapPrevious === 3) ||
          (indexOfBox === 59 && MapPrevious === 3) ||
          (indexOfBox === 58 && MapPrevious === 3) ||
          (indexOfBox === 57 && MapPrevious === 3) ||
          (indexOfBox === 56 && MapPrevious === 3)
        ) {
          spot0 = indexOfBox;
          PawnB();
        } else {
          // console.log("condition");
          const playerName = username;
          const game = "s game";
          // const roomName = username.concat(game)
          socket.emit("Chess-Game", Info);

          z = 0;
          Indicator();
        }
      }
    } else {
      // console.log("z value: ", z, "start: ", start);
      alert("not your turn");
    }
  } else {
    console.log("wait for a connection");
  }
});

// Functions

function Mapper() {
  CheckSpotsW.Count = 0;
  CheckSpotsB.Count = 0;

  for (var j = 0; j < 64; j++) {
    if (Map[j] === 0) {
      boxes[j].innerHTML = "";
    }
    if (Map[j] === 80) {
      boxes[j].innerHTML = "&#9814;";
      boxes[j].style.color = "white";
      CheckSpotsW.Count++;
    }
    if (Map[j] === p0) {
      boxes[j].innerHTML = "&#9817;";
      boxes[j].style.color = "white";
      CheckSpotsW.Count++;
    }

    if (Map[j] === 60) {
      boxes[j].innerHTML = "&#9816;";
      boxes[j].style.color = "white";
      CheckSpotsW.Count++;
    }
    if (Map[j] === 40) {
      boxes[j].innerHTML = "&#9815;";
      boxes[j].style.color = "white";
      CheckSpotsW.Count++;
    }
    if (Map[j] === k0) {
      boxes[j].innerHTML = "&#9812;";
      boxes[j].style.color = "white";
    }
    if (Map[j] === q0) {
      boxes[j].innerHTML = " &#9813;";
      boxes[j].style.color = "white"; //
      CheckSpotsW.Count++;
    }
    if (Map[j] === p) {
      boxes[j].innerHTML = "&#9823;";
      boxes[j].style.color = "black";
      CheckSpotsB.Count++;
    }
    if (Map[j] === 8) {
      boxes[j].innerHTML = "&#9820;";
      boxes[j].style.color = "black";
      CheckSpotsB.Count++;
    }
    if (Map[j] === 6) {
      boxes[j].innerHTML = "&#9822;";
      boxes[j].style.color = "black";
      CheckSpotsB.Count++;
    }
    if (Map[j] === 4) {
      boxes[j].innerHTML = "&#9821;";
      boxes[j].style.color = "black";
      CheckSpotsB.Count++;
    }
    if (Map[j] === k) {
      boxes[j].innerHTML = "&#9818";
      boxes[j].style.color = "black";
    }
    if (Map[j] === q) {
      boxes[j].innerHTML = "&#9819;";
      boxes[j].style.color = "black";
      CheckSpotsB.Count++;
    }
  }
}

function PlayGame(e) {
  var whiteKingSpot;
  var blackKingSpot;
  var found1 = false;
  var found2 = false;
  for (var j = 0; j < 64; j++) {
    if (Map[j] === 20) {
      whiteKingSpot = j;
      found1 = true;
    }
    if (Map[j] === 2) {
      blackKingSpot = j;
      found2 = true;
    }
    // If this is player 1 that is playing
    if (Info.player === 10) {
      if (e.target === boxes[j]) {
        // Condition 1: static
        if (Info.state === 0) {
          console.log(" static");
          // Condition 1A: static and picks a non conflating number
          if (
            (Map[j] !== 0 &&
              Map[j] !== 8 &&
              Map[j] !== 6 &&
              Map[j] !== 4 &&
              Map[j] !== q &&
              Map[j] !== k) ||
            Map[j] !== p
          ) {
            MapPrevious = Map[j];
            var Piece = PieceMovement(Map[j], j, "move");
            var PieceMovements = Piece.ValidMovements;
            var PieceKills = Piece.ValidKills;
            console.log(
              "Valid Moves: ",
              PieceMovements,
              "Valid Kills:",
              PieceKills
            );

            boxes[j].style.opacity = "0.3";
            prev = j;
            Info.state = 1;
            z = 1;
            Indicator();
            // Option Lighter
            // Condition 1B: static and picks a conflating number
          } else if (
            Map[j] === 0 ||
            Map[j] === 8 ||
            Map[j] === 6 ||
            Map[j] === 4 ||
            Map[j] === q ||
            Map[j] === k ||
            Map[j] === p
          ) {
            console.log("its not your piece!");
            Info.state = 0;
            z = 1;
          }
        }

        // Condition 2: dynamic
        else if (Info.state === 1) {
          // Condition 2A: dynamic and picks a non conflating number
          if (
            Map[j] === 0 ||
            Map[j] === 8 ||
            Map[j] === 6 ||
            Map[j] === 4 ||
            Map[j] === q ||
            Map[j] === k ||
            Map[j] === p
          ) {
            Clear();
            boxes[j].innerHTML = boxes[prev].innerHTML;
            boxes[prev].innerHTML = "";
            boxes[j].style.opacity = "1";
            // console.log(Map[j],Map[prev])
            Map[j] = Map[prev];
            Map[prev] = 0;
            if (WhiteKingMovement20 === 0) {
              CheckCastleBlock("white", CheckSpotsW);
            }

            if (
              Map[j] === k0 &&
              prev === 60 &&
              j === 62 &&
              WhiteKingMovement20 === 0 &&
              WhiteRookMovement20 === 0 &&
              CheckSpotsW.CastlePreventer === false
            ) {
              Map[63] = 0;
              Map[61] = 80;
              WhiteKingMovement20++;
            }
            if (
              Map[j] === k0 &&
              prev === 60 &&
              j === 58 &&
              WhiteKingMovement20 === 0 &&
              WhiteRookMovement20F === 0 &&
              CheckSpotsW.CastlePreventer === false
            ) {
              Map[56] = 0;
              Map[59] = 80;
              WhiteKingMovement20++;
            }
            console.log(CheckSpotsW.Rooks);
            UpdateCheckPoints(Map[j], prev, j, CheckSpotsW);
            console.log(CheckSpotsW.Rooks);
            Info.map = Map;
            // The below is for when the pawn reaches its final destination
            if (Map[j] === p0 && j === 4) {
              Pawn();
            } else {
              Mapper();
              z = 1;
              Indicator();
              Info.state = 2;
              Info.player = 2;
              Info.CheckSpotsW = CheckSpotsW;
              Info.CheckSpotsB = CheckSpotsB;
              if (Map[j] === 20) {
                WhiteKingMovement20++;
              } else if (Map[j] === 80 && prev === 63) {
                WhiteRookMovement20++;
              } else if (Map[j] === 80 && prev === 56) {
                WhiteRookMovement20F++;
              }
            }
            // console.log(Map[j],Map[prev])

            // King Castle Management White

            // PieceMovement(Map[j],j)
          }
          /////// Condition 2B: dynamic and picks a  conflating number
          else if (
            Map[j] === 80 ||
            Map[j] === 60 ||
            Map[j] === 40 ||
            Map[j] === q0 ||
            Map[j] === k0 ||
            Map[j] === p0
          ) {
            Info.state = 0;
            z = 1;
            console.log("condition 2B");

            console.log("its not your piece!");
          }
        }
      } // End of Main Movements
    } // End of Player one

    // If this is player 2 that is playing
    else if (Info.player === 2) {
      if (e.target === boxes[j]) {
        // Condition 1 Static
        if (Info.state === 0) {
          // Condition 1A: static and picks a non conflating number
          if (
            Map[j] !== 0 &&
            Map[j] !== 80 &&
            Map[j] !== 60 &&
            Map[j] !== 40 &&
            Map[j] !== q0 &&
            Map[j] !== k0 &&
            Map[j] !== p0
          ) {
            MapPrevious = Map[j];
            var Piece = PieceMovement(Map[j], j, "move");
            var PieceMovements = Piece.ValidMovements;
            var PieceKills = Piece.ValidKills;
            console.log(
              "Valid Moves: ",
              PieceMovements,
              "Valid Kills:",
              PieceKills
            );
            boxes[j].style.opacity = "0.3";
            prev = j;
            Info.state = 1;
            z = 1;
            Indicator();
          }
          // Condition 1A: static and picks a non conflating number
          else if (
            Map[j] === 0 ||
            Map[j] === 80 ||
            Map[j] === 60 ||
            Map[j] === 40 ||
            Map[j] === q0 ||
            Map[j] === k0 ||
            Map[j] === p0
          ) {
            console.log("its not your piece!");
            Info.state = 0;
            z = 1;
          }
        }

        // Condition 2 Dynamic
        else if (Info.state === 1) {
          console.log("condition 2B");
          Clear();
          // Condition 2 Dynamic and a proper selection
          if (
            Map[j] === 0 ||
            Map[j] === 80 ||
            Map[j] === 60 ||
            Map[j] === 40 ||
            Map[j] === q0 ||
            Map[j] === k0 ||
            Map[j] === p0
          ) {
            boxes[j].innerHTML = boxes[prev].innerHTML;
            boxes[prev].innerHTML = "";
            Map[j] = Map[prev];
            Map[prev] = 0;
            if (BlackKingMovement2 === 0) {
              CheckCastleBlock("black", CheckSpotsB);
            }

            if (
              Map[j] === k &&
              prev === 4 &&
              j === 6 &&
              BlackKingMovement2 === 0 &&
              BlackRookMovement2 === 0 &&
              CheckSpotsB.CastlePreventer === false
            ) {
              Map[7] = 0;
              Map[5] = 8;
              BlackKingMovement2++;
            }
            if (
              Map[j] === k &&
              prev === 4 &&
              j === 2 &&
              BlackKingMovement2 === 0 &&
              BlackRookMovement2F === 0 &&
              CheckSpotsB.CastlePreventer === false
            ) {
              Map[0] = 0;
              Map[3] = 8;
              BlackKingMovement2++;
            }
            console.log(CheckSpotsB.Rooks);
            UpdateCheckPoints(Map[j], prev, j, CheckSpotsB);
            console.log(CheckSpotsB.Rooks);
            Mapper();
            Info.map = Map;
            Info.state = 2;
            Info.player = 10;
            Info.CheckSpotsW = CheckSpotsW;
            Info.CheckSpotsB = CheckSpotsB;
            z = 1;
            Indicator();
            Info.turn = 1;
            // King Castle Management White
            if (Map[j] === 2) {
              BlackKingMovement2++;
            } else if (Map[j] === 8 && prev === 7) {
              BlackRookMovement2++;
            } else if (Map[j] === 8 && prev === 0) {
              BlackRookMovement2F++;
            }
          }
          // Condition 2 Dynamic and not proper selection
          else if (
            Map[j] === 0 ||
            Map[j] === 8 ||
            Map[j] === 6 ||
            Map[j] === 4 ||
            Map[j] === q ||
            Map[j] === k ||
            Map[j] === p
          ) {
            Info.state = 0;
            z = 1;
            console.log("condition 2C");
            console.log("its not your piece!");
          }
        }
      }
    } // End of Main Movements
  }
  Mapper();
  // If neither team has enough to win
  if (CheckSpotsW.Count === 0 && CheckSpotsB.Count === 0) {
    EndGame(3);
  }
  //// White last piece with no move (LPNM-1)
  if (found1) {
    const solutions = kingMovement(20, whiteKingSpot, "move", Map);
    if (
      CheckSpotsW.Count === 0 &&
      solutions.Transfer.length === 0 &&
      solutions.Kills.length === 0
    ) {
      EndGame(1);
    }
  } /// End of (LPNM-1)
  //// Black last piece with no move (LPNM-2)
  if (found2) {
    const solutions = kingMovement(2, blackKingSpot, "move", Map);
    if (
      CheckSpotsB.Count === 0 &&
      solutions.Transfer.length === 0 &&
      solutions.Kills.length === 0
    ) {
      EndGame(1);
    }
  } /// End of (LPNM-1)
  console.log("PF: White", CheckSpotsW.Rooks, "UCP: Black", CheckSpotsB.Rooks);
}

function Clear() {
  for (var j = 0; j < 64; j++) {
    boxes[j].style.opacity = "1";
  }
}

// Info Connection

function OutPut(msg) {
  console.log(
    "black rook",
    Info.CheckSpotsB.Rooks,
    "White rooks",
    Info.CheckSpotsW.Rooks
  );

  for (var j = 0; j < 64; j++) {
    Map[j] = msg.map[j];
  }

  Info.player = msg.player;
  Info.state = 2;
  Info.map = msg.map;
  CheckSpotsW = msg.CheckSpotsW;
  CheckSpotsB = msg.CheckSpotsB;
  console.log(
    "black rook",
    msg.CheckSpotsB.Rooks,
    "White rooks",
    msg.CheckSpotsW.Rooks
  );

  changeZ();
  const div = document.createElement("p");
  div.innerText = " Your turn ";
  document.getElementById("turn").appendChild(div);
  // console.log(Map)
  Mapper();
}

function MoveCalculator(Piece, Position, choice) {
  console.log("hello");
}

// Game over

function EndGame(x) {
  if (x === 0) {
    console.log("You were Checkmated");

    socket.emit("checked", "You win via Checkmate");
    alert("You were Checkmated");
    socket.emit("checkmate");
  }

  if (x === 1) {
    console.log("No valid movements for you");
    alert("No movements for you: Stalemate");
    socket.emit("checked", "Opponent has no valid moves left: Stalemate");
    socket.emit("checkmate");
  } else if (x === 2) {
    console.log("not enough pieces for you to win");
    socket.emit("checked", "xyz");
    RedAlert = true;
  } else if (x == 3) {
    console.log("Not enough pieces for you OR them");
    socket.emit("checked", "Stalemate");
    socket.emit("checkmate");
  } else if (x == 4) {
    console.log("too much repetition");
    socket.emit("checkmate");
  }
}

document.getElementById("exiter").addEventListener("click", () => {
  EndGame(2);
});

function PieceMovement(Piece, MapSpot, action) {
  var solution = Actuator(Piece, MapSpot, action, "hello");

  PieceInfo = {
    WK20: WhiteKingMovement20,
    WR80: WhiteRookMovement20,
    WR82: WhiteRookMovement20F,
    BK2: BlackKingMovement2,
    BK8: BlackRookMovement2,
    BK82: BlackRookMovement2F,
    WPinned10: WhitePinned10,
    BPinned1: BlackedPinned1,
    ValidMovements: solution.move,
    ValidKills: solution.kills,
    Check: false,
  };

  return PieceInfo;
  //////// PieceIncrement //////
}

/// Pawn  completed ////
const PawnFinish = document.getElementById("white-pawns");
const PawnFinishBlack = document.getElementById("black-pawns");
const choice = document.querySelectorAll(".choice");

// ////////// White Pawn
PawnFinish.addEventListener("click", (e) => {
  if (e.target === choice[0]) {
    PawnSelection(q0, spot);
    console.log("white queen was selected");
  } else if (e.target === choice[1]) {
    console.log("white Rook was selected");
    PawnSelection(80, spot);
  } else if (e.target === choice[2]) {
    console.log("White Bishop was selected");
    PawnSelection(40, spot);
  } else if (e.target === choice[3]) {
    console.log("White Knight  was selected");
    PawnSelection(60, spot);
  }
});

//////////////////Black Pawn
PawnFinishBlack.addEventListener("click", (e) => {
  if (e.target === choice[4]) {
    PawnSelection(q, spot0);
    console.log("Black queen was selected");
  } else if (e.target === choice[5]) {
    console.log("Black Rook was selected");
    PawnSelection(8, spot0);
  } else if (e.target === choice[6]) {
    console.log("Black Bishop was selected");
    PawnSelection(4, spot0);
  } else if (e.target === choice[7]) {
    console.log("Black Knight  was selected");
    PawnSelection(6, spot0);
  }
});

function PawnSelection(choice, spot) {
  console.log(choice, spot, Map[spot]);

  Map[spot] = choice;
  console.log(choice, spot, Map[spot]);

  Mapper();
  z = 1;

  Info.state = 2;
  if (
    spot === 0 ||
    spot === 1 ||
    spot === 2 ||
    spot === 3 ||
    spot === 4 ||
    spot === 5 ||
    spot === 6 ||
    spot === 7
  ) {
    Info.player = 2;
    PawnFinish.classList.add("no-show");
  } else if (
    spot0 === 63 ||
    spot0 === 62 ||
    spot0 === 61 ||
    spot0 === 60 ||
    spot0 === 59 ||
    spot0 === 58 ||
    spot0 === 57 ||
    spot0 === 56
  ) {
    Info.player = 10;

    PawnFinishBlack.classList.add("no-show");
  }

  socket.emit("Chess-Game", Info);

  z = 0;
  Indicator();

  console.log(Map);
}

function Pawn() {
  PawnFinish.classList.remove("no-show");
}

function PawnB() {
  console.log("initiated");
  PawnFinishBlack.classList.remove("no-show");
}
