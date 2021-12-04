

const socket = io()


socket.on('message', message => {
console.log(message)
})


document.getElementById('form').addEventListener('submit',(e)=>{

e.preventDefault();

socket.emit('data',`user:${socket.id} message: ${document.getElementById('username').value}`)

})