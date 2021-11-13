const main = document.getElementById("main")
const account = document.getElementById("account")
const settings = document.getElementById("settings")
const nav = document.querySelector(".sideNav")


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

})


document.getElementById("Progress").addEventListener('click', (e)=>{
    document.getElementById("close").classList.remove("no-show")
    document.getElementById("progress").classList.remove("no-show")

})

document.getElementById("Appt").addEventListener('click', (e)=>{
    document.getElementById("close").classList.remove("no-show")
    document.getElementById("Appointment").classList.remove("no-show")

})





function Clear (){
    document.getElementById("mainOpt").classList.add("no-show")
    document.getElementById("accoOpt").classList.add("no-show")
    document.getElementById("settOpt").classList.add("no-show")
    document.getElementById("close").classList.add("no-show")
    document.getElementById("progress").classList.add("no-show")
    document.getElementById("Appointment").classList.add("no-show")
}

