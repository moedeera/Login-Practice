const Users = []


function userJoin(Id,username,Game){
const user =
 {id:Id,
  name:username,
  game:Game}
Users.push(user)
return user
}







function getCurrentUser(id, Array){
return Array.find((user)=> user.player.id === id)

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
    getALL
    // userLeave,
    // getRoomUsers
  };