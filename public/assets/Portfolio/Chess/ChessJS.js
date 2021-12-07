

const socket = io()
const board = document.getElementById('Board')

socket.on('message', message => {
console.log(message)
})


// document.getElementById('form').addEventListener('submit',(e)=>{

// e.preventDefault();

// socket.emit('data',`user:${socket.id} message: ${document.getElementById('username').value}`)

// })

document.getElementById('form').addEventListener('submit',(e)=>{

e.preventDefault();
let x = Math.floor((Math.random() * 100) + 1);
let username = document.getElementById('username').value
let game = 
`${document.getElementById('username').value}`

socket.emit('create-game', { game, username })

})


// Update board with new games and
socket.on('game-board', (data) => {
    console.log(data.player.game, data.player.name, data.count)

    UpdateBoard (data.player.name,data.player.game)

    })
    

// Managing the form for the board to allow joins or spectates

const BoardForm = document.getElementById('boardform')
BoardForm.addEventListener('click', (e)=>{

e.preventDefault();
console.log(e.target.previousElementSibling.innerHTML)


})












    function UpdateBoard (user,game){

const div = document.createElement("div");
div.innerHTML = `
<h3> ${game}'game </h3>
                <p> ${user} </p>
                <p > Waiting</p >
              
                   <p>join<p>
`
div.classList.add('Game-Info')

board.appendChild(div)


    }

     
function add(type) {
    //Create an input type dynamically.   
    var element = document.createElement("input");
    //Assign different attributes to the element. 
    element.type = type;
    element.value = type; // Really? You want the default value to be the type string?
    element.name = type; // And the name too?
    element.onclick = function() { // Note this is a function
      alert("blabla");
    };
  
    var foo = document.getElementById("fooBar");
    //Append the element in page (in span).  
    foo.appendChild(element);
  }
  document.getElementById("btnAdd").onclick = function() {
    add("text");
  };