console.log('movements')



var Matrix =[
    [1,8],[2,8],[3,8],[4,8],[5,8],[6,8],[7,8],[8,8],
    [1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],
    [1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],
    [1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],
    [1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],
    [1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],
    [1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],
    [1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1]
    ]

function Actuator (piece,position,action,information){


    
    var Transfer = []
    var Kills= [5,11]
// King Movements    
if (piece===20||piece===2){

var options =kingMovement(piece,position, action, information)

 Transfer =  options.Transfer
 Kills = options.Kills
}
// Rook Movements
else if (piece===80||piece===8){

  var options  =  RookMovement(piece,position,action,information)
    Transfer= options.Transfer
     Kills =options.Kills
}



else 
solution = [5,6,8,33,45]


const solution =  {move:Transfer, kills:Kills}

return solution
}










////////////////////////////////////////////// Functions //////////////////////
//////Kings
 function kingMovement(piece,z, action, Information){
    var x = Matrix[z][0];
    var y = Matrix[z][1];
var Transfer =[]
var Killspot =[5,11]
if (action==='move') {
      

if (piece===20){
  for (var j=0; j<64; j++){
   

if (Matrix[j][1]===y+1&& Matrix[j][0]===x ||
    Matrix[j][1]===y-1&& Matrix[j][0]===x ||
    Matrix[j][1]===y && Matrix[j][0]===x+1||
    Matrix[j][1]===y && Matrix[j][0]===x-1||
    Matrix[j][1]===y+1&& Matrix[j][0]===x+1 ||
    Matrix[j][1]===y-1&& Matrix[j][0]===x-1 ||
    Matrix[j][1]===y+1 && Matrix[j][0]===x-1||
    Matrix[j][1]===y-1 && Matrix[j][0]===x+1)

         {if (Map[j]===0){
                                    Transfer.push(j)
                                }}

 }}        
else if (piece===2){
    for (var j=0; j<64; j++){
   

    if (Matrix[j][1]===y+1&& Matrix[j][0]===x ||
        Matrix[j][1]===y-1&& Matrix[j][0]===x ||
        Matrix[j][1]===y && Matrix[j][0]===x+1||
        Matrix[j][1]===y && Matrix[j][0]===x-1||
        Matrix[j][1]===y+1&& Matrix[j][0]===x+1 ||
        Matrix[j][1]===y-1&& Matrix[j][0]===x-1 ||
        Matrix[j][1]===y+1 && Matrix[j][0]===x-1||
        Matrix[j][1]===y-1 && Matrix[j][0]===x+1)
    
             {if (Map[j]===0){
                                        Transfer.push(j)
                                    }}






}} } 
       const solution =   {Transfer:Transfer, Kills:Killspot}                     
return solution
    }

/////////////////////////Rook Movement Function ////////////////////////
function RookMovement (piece,z,action,Information){
var Transfer =[]
var Killspot = [5,11]
    var brk  = 0 ;  
    var brk2 = 0 ;
    var brk3 = 0 ;
    var brk4 = 0;

    var x = Matrix[z][0];
    var y = Matrix[z][1];


    if (action==='move'){

///////////////////////[MOVEMENT TYPE 1:  TOWARDS RIGHT]
for (var j=z; j<64; j++){
    if(brk===1){break;}
    
    
     for (var n=1; n<8; n++) {
    if (Matrix[j][0]===x+n && Matrix[j][1]===y)
    {
     if (Map[j]!==0){
     Killspot.push(j)    
     brk = 1;
     break;
        }
    if(Map[j]===0){Transfer.push(j)}}
    }
    }







    }

    const solution =   {Transfer:Transfer, Kills:Killspot}                     
    return solution
}




















    function getClearSpots (){





        return true
    }