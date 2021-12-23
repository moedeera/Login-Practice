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
var solution = []
if (piece===20||piece===2){
 var solution = kingMovement(piece,position, action, information)
   
} else 
solution = [5,6,8,33,45]


return  solution
}





// Movement Functions



////// Functions Kings

    function kingMovement(piece,position, action, Information){

// var CheckSpotsW  = GetCheckSpots.white()
// var CheckSpotsW  = GetCheckSpots.black()


var Transfer =[]
if (action==='move') {
      

if (piece===20){
  for (var j=0; j<64; j++){
    var x = Matrix[position][0];
    var y = Matrix[position][1];

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
    var x = Matrix[position][0];
    var y = Matrix[position][1];

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
        }                               














return Transfer


    }






    function getClearSpots (){





        return true
    }