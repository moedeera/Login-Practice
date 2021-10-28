
const socket = io()
console.log('hey')






socket.on('Caller-Info', roomName=> {
 
    console.log(roomName)  

    DisplayGames()
     
    })
    






























// Functions 








function DisplayGames (){

    var div = document.createElement("div");
    div.classList.add("game")
    const gameName = document.createElement("div")
    gameName.innerHTML = "new game"
    const JoinButton = document.createElement("div")
    JoinButton.innerHTML = "<a> Join </a>"
    JoinButton.classList.add = "join-game"

div.appendChild(gameName)
div.appendChild(JoinButton)

    document.getElementById("games").appendChild(div)
    console.log('it tried?')

}
                                
        
        



