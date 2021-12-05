

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
`${document.getElementById('username').value}'s game`

socket.emit('create-game', { game, username })

})


// Update board with new games and
socket.on('game-board', (data) => {
    console.log(data.player.game, data.player.name, data.count)

    UpdateBoard (data.player.name,data.player.game)

    })
    

// Managing the form for the board to allow joins or spectates

const BoardForm = document.getElementById('boardform')
BoardForm.addEventListener('submit', (e)=>{

e.preventDefault();
console.log(e.target)


})












    function UpdateBoard (user,game){

const div = document.createElement("div");
div.innerHTML = `
<h3>${game}</h3>
                <p> ${user} </p>
                <p > Waiting</p >
                   <input type='submit' value= Join>
`
div.classList.add('Game-Info')

board.appendChild(div)


    }