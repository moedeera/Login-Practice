const boxes = document.querySelectorAll(".box")
// const roomInput = document.getElementById("game-name")
// const room  =  roomInput.innerText



// socket.on('Games', (Rooms) => {
// console.log(Rooms)
// })




var q =1;
var q0 =10;
var k = 2;
var k0 =20;
var one =1;
var two= 10;
var Player = 10;
var state = 0;
var prev;
//get username and room 

var start = false ;
var turn = 1;

var  z = 0

var Map = [

    8,6,4,k,q,4,6,8,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    80,60,40,k0,q0,40,60,80,
    ]

// 2 player configuration 




socket.on('message', (message,room) => {
let data = socket.id;

if (message.map){

console.log(message)
console.log(z)
z = 1;

OutPut(message)
console.log(z)
start =true;
// Mapper()  
 }
})
// socket.on('Caller-Info', roomName=> {
 
//     console.log(roomName)  

   
//     })
    

// Submit //

function changeZ () {


    z===1;
    Info.state =0 ;
    Indicator()
    console.log(start)
}




const Info = {

player:"",
state:"",
map:"",
turn:""

}

Info.player =10;
Info.state = 0;
Info.map = Map;
Info.turn = 1;





function Indicator () {
if (z===1){
    document.getElementById("turn").style.background = "teal"

    if (Info.state === 0){document.getElementById("turn").innerHTML = " Nothing picked"}
    else if (Info.state === 1){document.getElementById("turn").innerHTML = " Valid Option picked"}
    else if (Info.state === 2){document.getElementById("turn").innerHTML = " Submitted"}
} else if (z===0){

    document.getElementById("turn").style.background = "coral"
    if (Info.state === 0){document.getElementById("turn").innerHTML = " Nothing picked"}
    else if (Info.state === 1){document.getElementById("turn").innerHTML = " Valid Option picked"}
    else if (Info.state === 2){document.getElementById("turn").innerHTML = " Submitted"}
}
}
// var inc =1 ;

window.addEventListener('DOMContentLoaded', Mapper);

console.log('current turn is', turn)

document.querySelector(".board").addEventListener('click', (e)=> {

console.log(`z value is ${z}, Info state is ${Info.state} `)

if (z===1 || start === false ){   
     start = true
    Indicator()
    PlayGame(e);
if (Info.state===2){
   
// socket.emit('Info', Info, room)

const playerName = username
const game = 's game'
// const roomName = username.concat(game)
socket.emit('message', Info)
// socket.emit('Calls', `public log ${inc}`)
// inc++;
z = 0;
  Indicator()
console.log('z value: ',z, 'start: ', start)

}

}

 else {
    
    // console.log('z value: ',z, 'start: ', start)
    alert('not your turn')
}
// OutPut(Info.map)
// Mapper()
})























// Functions 




function Mapper (){
    // console.log('hey')

    for (var j=0; j<64; j++){
        if (Map[j]===0){      
            boxes[j].innerHTML ="";   
                       }
     
        
  if (Map[j]===8){      
     boxes[j].innerHTML ="&#9814;";   
                }

if (Map[j]===6){  
    boxes[j].innerHTML ="&#9816;";  
    boxes[j].style.color ="white";                 
         }                                         
    if (Map[j]===4){                        
         boxes[j].innerHTML ="&#9815;";
         boxes[j].style.color ="white";                          
            }                                       
         if (Map[j]===k){                               
            boxes[j].innerHTML ="&#9813;";
            boxes[j].style.color ="white";                                   
            }                                             
            if (Map[j]===q){                                        
                boxes[j].innerHTML ="&#9812;";
                boxes[j].style.color ="white";       
            }
                if (Map[j]===80){                                                        
                    boxes[j].innerHTML ="&#9820;";  
                    boxes[j].style.color ="black";                                     
                        }                                            
                    if (Map[j]===60){                                
                       boxes[j].innerHTML ="&#9822;";  
                       boxes[j].style.color ="black";                                           
                         }                                                
                        if (Map[j]===40){                                                               
                            boxes[j].innerHTML ="&#9821;"
                            boxes[j].style.color ="black";                                                   
                             }                                                            
                             if (Map[j]===k0){                                                                      
                                boxes[j].innerHTML ="&#9819;";  
                                boxes[j].style.color ="black";                                                          
                                  }                                                                  
                                if (Map[j]===q0){                                                                        
                                    boxes[j].innerHTML ="&#9818;"; 
                                    boxes[j].style.color ="black";                                                                  
                                    }                                                                         
                                 }  
                              



}

function PlayGame(e){

  for(var j=0; j<64; j++){
   

    // If this is player 1 that is playing 
    if (Info.player===10) {
         if(e.target===boxes[j]){

                 // Condition 1: static 
                 if(Info.state===0  ){
                  console.log(' static')
                        // Condition 1A: static and picks a non conflating number 
                        if (Map[j]!==0 && Map[j]!==8 && Map[j]!==6  && Map[j]!==4  && Map[j]!==q  && Map[j]!==k ){
                        console.log('condition 1A')
                        boxes[j].style.opacity = "0.3"
                        prev = j;
                         Info.state = 1;
                         z = 1;
                        Indicator();

                     // Condition 1B: static and picks a conflating number 
                     } else if (Map[j]===0 || Map[j]===8 || Map[j]===6  || Map[j]===4  || Map[j]===q  || Map[j]===k ){
                        console.log('its not your piece!')
                        Info.state = 0;
                         z = 1;} 

    }
               
             
             
             // Condition 2: dynamic
             else if (Info.state===1  ){
                console.log('dynamic')

                                // Condition 2A: dynamic and picks a non conflating number 
                                 if (Map[j]===0 || Map[j]===8 || Map[j]===6  || Map[j]===4  || Map[j]===q  || Map[j]===k){

                                // console.log('cond 3')
                                 Clear()
                                 boxes[j].innerHTML = boxes[prev].innerHTML
                                 boxes[prev].innerHTML = "";
                                 boxes[j].style.opacity = "1"
                                 // console.log(Map[j],Map[prev])
                                 Map[j]=Map[prev]
                                 Map[prev]=0;
                                 Info.map = Map
                                // console.log(Map[j],Map[prev])
                                 Mapper()
                                 z =1;
                                 Indicator()
                                 Info.state = 2;
                                 Info.player =2;
                                console.log('condition 2A')
                }
                          // Condition 2B: dynamic and picks a  conflating number                 
                                  else if ( Map[j]===80 || Map[j]===60  || Map[j]===40  || Map[j]===q0  || Map[j]===k0) {
                                Info.state = 0; 
                                z =1;  
                                console.log('condition 2B')

                                console.log('its not your piece!') 

                 
            }
               
     }}}

        // If this is player 2 that is playing 
      else if (Info.player===2) {
        if(e.target===boxes[j]){
                       // Condition 1 Static
                       if(Info.state===0 ){

                                 // Condition 1A: static and picks a non conflating number 
                                  if (Map[j]!==0  && Map[j]!==80 && Map[j]!==60  && Map[j]!==40  && Map[j]!==q0  && Map[j]!==k0){
                                       console.log('condition 2A for player 2')
                                       boxes[j].style.opacity = "0.3"
                                       prev = j;
                                       Info.state = 1;
                                       z = 1;
                                       Indicator();
                            }  
                                  // Condition 1A: static and picks a non conflating number   
                            else if (Map[j]===0  || Map[j]===80 || Map[j]===60  || Map[j]===40  || Map[j]===q0  || Map[j]===k0){

                                     console.log('its not your piece!')
                                     Info.state = 0;
                                     z = 1;

                                } }
         
                          // Condition 2 Dynamic
                         else if (Info.state===1){

                         
                                     console.log('condition 2B')
                                     Clear()
                                     // Condition 2 Dynamic and a proper selection
                               if (Map[j]===0 || Map[j]===80 || Map[j]===60  || Map[j]===40  || Map[j]===q0  || Map[j]===k0){
                                       boxes[j].innerHTML = boxes[prev].innerHTML
                                       boxes[prev].innerHTML = "";
                                       Map[j]=Map[prev]
                                       Map[prev]=0;
                                       console.log(Map)
                                       Mapper()
                                       Info.map = Map;
                                       Info.state = 2;
                                       Info.player =10;
                                       z =1;
                                       Indicator()
                                       Info.turn = 1;              
                                                   }
                                    // Condition 2 Dynamic and not proper selection
                            else if(Map[j]===0 || Map[j]===8 || Map[j]===6  || Map[j]===4  || Map[j]===q  || Map[j]===k) {
                                       Info.state = 0;
                                       z = 1;    
                                      console.log('condition 2C')
                                      console.log('its not your piece!')
                
                                
                            }}
        
                           }}
   } 

}


function Clear (){
    for (var j=0; j<64; j++){
        boxes[j].style.opacity = "1"

    }
}
                                 
// Info Connection


function OutPut(msg){

for (var j=0; j<64; j++){

Map[j]=msg.map[j]

}

Info.player = msg.player;
Info.state = 2;
Info.map = msg.map;

changeZ()
const div = document.createElement('p')
div.innerText = " Your turn "
document.getElementById("turn").appendChild(div)
    // console.log(Map)
    Mapper()

}
  


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

}
                                
        
        



