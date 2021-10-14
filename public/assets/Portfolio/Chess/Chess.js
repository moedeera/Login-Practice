const boxes = document.querySelectorAll(".box")
var q =1;
var q0 =10;
var k = 2;
var k0 =20;
var one =1;
var two= 10;
var Player = 10;
var state = 0;
var prev;


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

const socket = io()

socket.on('message', message => {

console.log(message)
if (message.map){
OutPut(message)
// Mapper()  
 }
})


// Submit //







const Info = {

player:"",
state:"",
map:""


}



// var Map = [

//     8,6,3,5,4,3,6,8,
//     0,0,0,0,0,0,0,0,
//     0,0,0,0,0,0,0,0,
//     0,0,0,0,0,0,0,0,
//     0,0,0,0,0,0,0,0,
//     0,0,0,0,0,0,0,0,
//     0,0,0,0,0,0,0,0,
//     80,60,30,50,40,30,60,80,
//     ]
    
Info.player =10;
Info.state = 0;
Info.map = Map;







window.addEventListener('DOMContentLoaded', Mapper);


document.querySelector(".board").addEventListener('click', (e)=> {PlayGame(e);
if (state===0){

    
socket.emit('Info', Info)
}


// OutPut(Info.map)
// Mapper()
})























// Functions 




function Mapper (){
    console.log('hey')

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
   
    if (Info.player===10) {
         if(e.target===boxes[j]){

             if(Info.state===0 && Map[j]!==0 && Map[j]!==8 && Map[j]!==6  && Map[j]!==4  && Map[j]!==q  && Map[j]!==k ){
                
                  boxes[j].style.opacity = "0.3"
                  prev = j;
                  Info.state = 1;

             } else if (Info.state===1  ){
 
                if (Map[j]===0 || Map[j]===8 || Map[j]===6  || Map[j]===4  || Map[j]===q  || Map[j]===k){
                    console.log('cond 3')
                Clear()
                boxes[j].innerHTML = boxes[prev].innerHTML
                boxes[prev].innerHTML = "";
                boxes[j].style.opacity = "1"
                console.log(Map[j],Map[prev])
                Map[j]=Map[prev]
                Map[prev]=0;
                Info.map = Map
                console.log(Map[j],Map[prev])
                Mapper()
               
                Info.state = 0;
                Info.player =2;
                }
             }


           }
       }
      else if (Info.player===2) {
        if(e.target===boxes[j]){

            if(Info.state===0&& Map[j]!==0  && Map[j]!==80 && Map[j]!==60  && Map[j]!==40  && Map[j]!==q0  && Map[j]!==k0){
               
                 boxes[j].style.opacity = "0.3"
                 prev = j;
                 Info.state = 1;
            } else if (Info.state===1){
               Clear()
               if (Map[j]===0 || Map[j]===80 || Map[j]===60  || Map[j]===40  || Map[j]===q0  || Map[j]===k0){
               boxes[j].innerHTML = boxes[prev].innerHTML
               boxes[prev].innerHTML = "";
               Map[j]=Map[prev]
               Map[prev]=0;
               console.log(Map)
               Mapper()
               Info.map = Map;
               Info.state = 0;
               Info.player =10;

               
               }
            }


          }
      }




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
Info.state = msg.state;
Info.map = msg.map;
    console.log(Map)
    Mapper()

    // for (var j=0; j<Map.length; j++){


    // }

//     for (var j=0; j<64; j++) {
// Map[j]= Info[j]



//     }

 

}
  



                                
        
        



