

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
  if (data.length>0){
console.log('hey', data[0].type)
  if (data[0].type==='add'){
    console.log(data[0].player.game, data[0].player.name, data[0].count)

    UpdateBoard (data)
    console.log(data)

  }}
    
    })
    

// Managing the form for the board to allow joins or spectates

const BoardForm = document.getElementById('boardform')
BoardForm.addEventListener('click', (e)=>{

e.preventDefault();
console.log(e.target.previousElementSibling.innerHTML)


})












    function UpdateBoard (data){

const elements = document.getElementsByClassName('Game-Info');
while(elements.length > 0){
    elements[0].parentNode.removeChild(elements[0]);
}

for (var j=0; j<data.length; j++ ){

const div = document.createElement("div");
div.innerHTML = `
<h3> ${data[j].player.game}'game </h3>
                <p> ${data[j].player.game} </p>
                <p>Waiting </p >
                <p> join<p>
`
div.classList.add('Game-Info')

BoardForm.appendChild(div)

}




    }

     
