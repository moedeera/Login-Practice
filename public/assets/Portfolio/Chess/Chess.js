
var q =1;
var q0 =10;
var k = 2;
var k0 =20;


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
    






var Pieces = [

"#9814;","&#9816;","&#9816;","#9814;",
]


window.addEventListener('DOMContentLoaded', Mapper);






const boxes = document.querySelectorAll(".box")


boxes[0].innerHTML ="&#9812;";

document.querySelector(".board").addEventListener('click', (e)=>{


e.preventDefault();





})




function Mapper(x){

if (x===8){

    boxes[x].innerHTML ="&#9812;";

}





}



function Mapper (){

    for (var j=0; j<64; j++){
     
        
  if (Map[j]===8){      
     boxes[j].innerHTML ="&#9814;";   
                }

if (Map[j]===6){  
    boxes[j].innerHTML ="&#9816;";                
         }                                         
    if (Map[j]===4){                        
         boxes[j].innerHTML ="&#9815;";                       
            }                                       
         if (Map[j]===k){                               
            boxes[j].innerHTML ="&#9813;";                                
            }                                             
            if (Map[j]===q){                                        
                boxes[j].innerHTML ="&#9812;";    
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




                                 
                               
  



                                
        
        



