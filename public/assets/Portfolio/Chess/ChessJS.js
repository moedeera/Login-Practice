const host = document.getElementById("host");
const guest = document.getElementById("guest");
const hostButton = document.getElementById("btn1");
const HostMessage = document.getElementById("hostmsg").value;
let username = document.getElementById("username").value;

const socket = io();
const board = document.getElementById("Board");

var guestName = "";
var gameName = "";

socket.on("message", (message) => {
  console.log(message);
});

socket.on("send-data", (data) => {
  console.log(data);
  document.getElementById("userdata").innerText = `${data}`;
});

socket.on("guest-host-data", (game, username) => {
  // console.log('some-one joined', game, username)

  guest.innerHTML = username;
  guest.style.color = "black";

  host.innerHTML = game;
});
// Form for Game Creation
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let x = Math.floor(Math.random() * 100 + 1);
  username = document.getElementById("username").value;
  let game = `${document.getElementById("username").value}`;

  host.innerHTML = username;
  guest.innerHTML = "waiting.....";
  guest.style.color = "green";

  socket.emit("create-game", { game, username });
});
// Form for the board to allow users to join a game or spectate

const BoardForm = document.getElementById("boardform");
BoardForm.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(e.target.className);
  if (document.getElementById("username").value === "") {
    username = `user${Math.floor(Math.random() * 1000 + 1)}`;
  } else {
    username = document.getElementById("username").value;
  }

  // console.log(document.getElementById('username').value)
  // console.log(e.target.id, username)

  if (e.target.className === "join") {
    let game = `${e.target.id}`;
    gameName = game;
    socket.emit("join-game", { game, username });
  }
});

// Test concept of sending private messages
// hostButton.addEventListener('click',(e)=>{
//   e.preventDefault()
//   const HostMessage = document.getElementById('hostmsg').value
//   console.log(HostMessage)
//   socket.emit('send-data', (HostMessage))

//   })

// Update board with new games and
socket.on("game-board", (data) => {
  if (data.length > 0) {
    // console.log('hey', data[0].type)

    // console.log(data[0].player.game, data[0].player.name, data[0].count)

    UpdateBoard(data);
    // console.log(data)
  } else if (data.length === 0) {
    const elements = document.getElementsByClassName("Game-Info");
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);

      ////////////////////////////////
      guest.innerHTML = "User2";

      host.innerHTML = "User1";
      console.log("no games");
    }
  }
});

/////////////////////////////////////////////////
// Gets move from guest

hostButton.addEventListener("click", (e) => {
  e.preventDefault();
  const HostMessage = document.getElementById("hostmsg").value;
  // console.log(HostMessage)
  socket.emit("message", HostMessage);
  socket.emit("send-data", HostMessage);
});

function UpdateBoard(data) {
  const elements = document.getElementsByClassName("Game-Info");
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }

  for (var j = 0; j < data.length; j++) {
    if (data[j].type === "wait") {
      console.log("condition a");

      const div = document.createElement("div");
      div.innerHTML = `
<h3> ${data[j].gameRoom}'s game </h3>
                <p  class="status">Waiting </p >
                <p> ${data[j].player.name} </p>
                <p id=${data[j].gameRoom} class="join"> join<p>
`;
      div.classList.add("Game-Info");

      BoardForm.appendChild(div);
    } else if (data[j].type === "in-game") {
      const div = document.createElement("div");
      div.innerHTML = `
<h3> ${data[j].gameRoom}'s game </h3>
                <p  class="status in-game" >In-Game</p >
                <p> ${data[j].player.name} vs ${data[j].player2.name}  </p>
                <p id=${data[j].gameRoom} class="spectate"> In Game <p>
`;
      div.classList.add("Game-Info");

      BoardForm.appendChild(div);
    }
  }
  if (host.innerHTML !== "User1") {
    console.log("A host is present", host.innerHTML);
    board.classList.add("no-show");
  }
}

document.getElementById("closer").addEventListener("click", () => {
  console.log(gameName);
  var disco = "";
  socket.emit("closure", disco);
});
