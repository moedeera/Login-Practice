const Users = []


function userJoin(Id,username){
const user =
 {id:Id,
  name:username,
 }
Users.push(user)
return user
}







function getCurrentUser(id, Array){
console.log(Array)
    if (Array.length>0){
return Array.find((user)=> user.player.id === id ||user.player2.id === id)
} else 
return false
}

function getGuest(id, Array){

    if (Array.length>0){
       return Array.find((user)=> user.player2.id === id) 
    } else{
        return false
    }
    
    
    }
    
    function getHost(id, Array){
        if (Array.length>0){
return Array.find((user)=> user.player.id === id)
        } else {
            return false
        }
        
        
        }



function CheckForUser(id){

    return Users.some((user)=> user.id === id)

} 





function getALL(){

return Users

}
module.exports = {
    userJoin,
    getCurrentUser,
    CheckForUser,
    getALL,
    getGuest,
    getHost
    // userLeave,
    // getRoomUsers
  };