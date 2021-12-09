const Users = []


function userJoin(Id,username,Game){
const user =
 {id:Id,
  name:username,
  game:Game}
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