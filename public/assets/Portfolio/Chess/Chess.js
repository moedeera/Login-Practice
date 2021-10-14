

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
    








window.addEventListener('DOMContentLoaded', Mapper);


document.querySelector(".board").addEventListener('click', (e)=> {PlayGame(e);})























// Functions 




function Mapper (){

    for (var j=0; j<64; j++){
     
        
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
   
    if (Player===10) {
         if(e.target===boxes[j]){

             if(state===0 && Map[j]!==0 && Map[j]!==8 && Map[j]!==6  && Map[j]!==4  && Map[j]!==q  && Map[j]!==k ){
                
                  boxes[j].style.opacity = "0.3"
                  prev = j;
                  state = 1;

             } else if (state===1  ){

                if (Map[j]===0 || Map[j]===8 || Map[j]===6  || Map[j]===4  || Map[j]===q  || Map[j]===k){
                Clear()
                boxes[j].innerHTML = boxes[prev].innerHTML
                boxes[prev].innerHTML = "";
                boxes[j].style.opacity = "1"
                Map[j]=Map[prev]
                Map[prev]=0;
                console.log(Map)
                Mapper()
                state = 0;
                Player =2;
                }
             }


           }
       }
      else if (Player===2) {
        if(e.target===boxes[j]){

            if(state===0&& Map[j]!==0  && Map[j]!==80 && Map[j]!==60  && Map[j]!==40  && Map[j]!==q0  && Map[j]!==k0){
               
                 boxes[j].style.opacity = "0.3"
                 prev = j;
                 state = 1;
            } else if (state===1){
               Clear()
               if (Map[j]===0 || Map[j]===80 || Map[j]===60  || Map[j]===40  || Map[j]===q0  || Map[j]===k0){
               boxes[j].innerHTML = boxes[prev].innerHTML
               boxes[prev].innerHTML = "";
               Map[j]=Map[prev]
               Map[prev]=0;
               console.log(Map)
               Mapper()
               state = 0;
               Player =10;
               }
            }


          }
      }




    } 
console.log(Player, state)
}


function Clear (){
    for (var j=0; j<64; j++){
        boxes[j].style.opacity = "1"

    }
}
                                 
                               
  



                                
        
        



