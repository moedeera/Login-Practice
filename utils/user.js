const Users = []


function userJoin(Id,username,Room){
const user =
 {id:Id,
  name:username,
  room:Room}
Users.push(user)
return user
}

function getCurrentUser(id){
return Users.find((user)=> user.id === id)

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