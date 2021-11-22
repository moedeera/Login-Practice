const main = document.getElementById("main")
const account = document.getElementById("account")
const settings = document.getElementById("settings")
const nav = document.querySelector(".sideNav")
var prev =  0;

nav.addEventListener('click', (e)=>{

e.preventDefault();

if (e.target === main){
    Clear()
   console.log('main')
   document.getElementById("mainOpt").classList.remove("no-show")
}
else if (e.target===account){
    Clear()
    console.log('account')
    document.getElementById("accoOpt").classList.remove("no-show")
}

else if(e.target===settings){
    Clear()
    console.log('settings')
    document.getElementById("settOpt").classList.remove("no-show")
}


}

)


document.getElementById("close").addEventListener('click',(e)=>{
    document.getElementById("close").classList.add("no-show")
    document.getElementById("progress").classList.add("no-show")
    document.getElementById("Appointment").classList.add("no-show")
    document.getElementById("mainOpt").style.opacity ='1';
   
})


document.getElementById("Progress").addEventListener('click', (e)=>{
    document.getElementById("mainOpt").style.opacity ='0'
   
    document.getElementById("close").classList.remove("no-show")
    document.getElementById("progress").classList.remove("no-show")

})

document.getElementById("Appt").addEventListener('click', (e)=>{
    document.getElementById("mainOpt").style.opacity ='0'
  
    document.getElementById("close").classList.remove("no-show")
    document.getElementById("Appointment").classList.remove("no-show")

})





function Clear (){
    document.getElementById("mainOpt").style.opacity ='1';
    document.getElementById("mainOpt").classList.add("no-show")
    document.getElementById("accoOpt").classList.add("no-show")
    document.getElementById("settOpt").classList.add("no-show")
    document.getElementById("close").classList.add("no-show")
    document.getElementById("progress").classList.add("no-show")
    document.getElementById("Appointment").classList.add("no-show")
}

document.getElementById("ps2").onfocus = function() {
    document.getElementById("match").style.display = "block";
  
  }
document.getElementById("ps2").onblur = function() {
    document.getElementById("match").style.display = "none";
  }

  document.getElementById("ps2").onkeyup = function() {
    // Validate lowercase letters
    var password = document.getElementById("ps1").value

    if(document.getElementById("ps2").value!== password) {  
        document.getElementById("match").style.color = "red";
        document.getElementById("match").innerText = "Passwords must match";
    } else {
        document.getElementById("match").style.color = "green";
        document.getElementById("match").innerText = "Passwords match";
    }}


let xhr = new XMLHttpRequest()
xhr.open('GET', 'http://localhost:8080/Projects/profile', true)

document.getElementById("form0").addEventListener('submit', (e)=>{
//    axios({
//         method: 'post',
//         url: '/Projects/profile',
//         data: {
//           firstName: 'Finn',
//           lastName: 'Williams'
//         }
//       });


if (xhr.status == 200){
    console.log('success')
}
if (xhr.status == 404){
    console.log('failure')

}



})

 