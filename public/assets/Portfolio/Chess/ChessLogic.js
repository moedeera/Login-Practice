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

//     8,6,4,q,0,4,6,8,
//     0,0,0,0,0,0,0,0,
//     0,0,0,0,0,0,0,0,
//     0,0,0,4,k,0,0,0,
//     0,0,0,0,0,0,0,0,
//     0,0,0,0,k0,40,0,0,
//     0,0,0,0,0,0,0,0,
//     80,60,40,q0,0,40,60,80,
//     ]
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
var Map = [
  8,
  6,
  4,
  q,
  0,
  4,
  6,
  8,
  0,
  0,
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
  6,
  k,
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
  k0,
  60,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  30,
  0,
  0,
  80,
  60,
  40,
  q0,
  0,
  40,
  60,
  80,
];
CheckSpots = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

// var Map = [

//     8,6,4,q,k,4,6,8,
//     0,0,0,0,0,0,0,0,
//     0,0,0,0,0,0,0,0,
//     0,0,0,0,0,0,0,0,
//     0,0,0,0,0,0,0,0,
//     0,0,0,0,0,0,0,0,
//     0,0,0,0,0,0,0,0,
//     80,60,40,q0,k0,40,60,80,
//     ]

//////////////////////////// VARIABLES FOR TURN-CONTROL ////////////////////

var start = false;
var turn = 1;
var z = 0;
/////////////////// INFO OBJECT CONTROLS GAME LOGISTIC
const Info = {
  player: "",
  state: "",
  map: "",
  turn: "",
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
  if (msg === "guest exited") {
    guest.innerHTML = "waiting.....";
    guest.style.color = "green";
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
    k,
    q,
    4,
    6,
    8,
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
    80,
    60,
    40,
    k0,
    q0,
    40,
    60,
    80,
  ];
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

/////////////// LOADS CHESS MAP ON LOADING OF PAGE ///////////////////
window.addEventListener("DOMContentLoaded", Mapper);

document.querySelector(".board").addEventListener("click", (e) => {
  // console.log(`z value is ${z}, Info state is ${Info.state} `)

  if (connection === true) {
    if (z === 1 || start === false) {
      start = true;
      Indicator();
      PlayGame(e);
      if (Info.state === 2) {
        const playerName = username;
        const game = "s game";
        // const roomName = username.concat(game)
        socket.emit("Chess-Game", Info);

        z = 0;
        Indicator();
      }
    } else {
      console.log("z value: ", z, "start: ", start);
      alert("not your turn");
    }
  } else {
    console.log("wait for a connection");
  }
});

// Functions

function Mapper() {
  // console.log('hey')

  for (var j = 0; j < 64; j++) {
    if (Map[j] === 0) {
      boxes[j].innerHTML = "";
    }
    if (Map[j] === 80) {
      boxes[j].innerHTML = "&#9814;";
    }
    if (Map[j] === p0) {
      boxes[j].innerHTML = "&#9817;";
    }

    if (Map[j] === 60) {
      boxes[j].innerHTML = "&#9816;";
      boxes[j].style.color = "white";
    }
    if (Map[j] === 40) {
      boxes[j].innerHTML = "&#9815;";
      boxes[j].style.color = "white";
    }
    if (Map[j] === k0) {
      boxes[j].innerHTML = "&#9812;";
      boxes[j].style.color = "white";
    }
    if (Map[j] === q0) {
      boxes[j].innerHTML = " &#9813;";
      boxes[j].style.color = "white"; //
    }
    if (Map[j] === p) {
      boxes[j].innerHTML = "&#9823;";
      boxes[j].style.color = "black";
    }
    if (Map[j] === 8) {
      boxes[j].innerHTML = "&#9820;";
      boxes[j].style.color = "black";
    }
    if (Map[j] === 6) {
      boxes[j].innerHTML = "&#9822;";
      boxes[j].style.color = "black";
    }
    if (Map[j] === 4) {
      boxes[j].innerHTML = "&#9821;";
      boxes[j].style.color = "black";
    }
    if (Map[j] === k) {
      boxes[j].innerHTML = "&#9818";
      boxes[j].style.color = "black";
    }
    if (Map[j] === q) {
      boxes[j].innerHTML = "&#9819;";
      boxes[j].style.color = "black";
    }
  }
}

function PlayGame(e) {
  for (var j = 0; j < 64; j++) {
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
            Map[j] === p ||
            Map[j] === p
          ) {
            Clear();
            boxes[j].innerHTML = boxes[prev].innerHTML;
            boxes[prev].innerHTML = "";
            boxes[j].style.opacity = "1";
            // console.log(Map[j],Map[prev])
            Map[j] = Map[prev];
            Map[prev] = 0;
            Info.map = Map;
            // console.log(Map[j],Map[prev])
            Mapper();
            z = 1;
            Indicator();
            Info.state = 2;
            Info.player = 2;

            // King Castle Management White
            if (Map[j] === 20) {
              WhiteKingMovement20++;
            } else if (Map[j] === 80 && prev === 63) {
              WhiteRookMovement20++;
            } else if (Map[j] === 80 && prev === 56) {
              console.log("it happened");
              WhiteRookMovement20F++;
            }

            // PieceMovement(Map[j],j)
          }
          // Condition 2B: dynamic and picks a  conflating number
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
      }
    }

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
            //    console.log('condition 2A for player 2')

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
            //    console.log(Map)
            Mapper();
            Info.map = Map;
            Info.state = 2;
            Info.player = 10;
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
    }
  }
}

function Clear() {
  for (var j = 0; j < 64; j++) {
    boxes[j].style.opacity = "1";
  }
}

// Info Connection

function OutPut(msg) {
  for (var j = 0; j < 64; j++) {
    Map[j] = msg.map[j];
  }

  Info.player = msg.player;
  Info.state = 2;
  Info.map = msg.map;

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
  console.log(Piece, MapSpot);
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
