// hamberger menu function 


const menu = document.querySelector(".menu")
const form = document.querySelector(".form-modal")
const exitBtn = document.getElementById("exit")
var click = 1;

menu.addEventListener('click', (e)=>{

e.preventDefault()
if (click === 1){
document.getElementById("form-modal").style.top ="0"
click = 2;
} else if (click === 2 ){
  document.getElementById("form-modal").style.top ="-100vh" 
  click = 1;
}

})

exitBtn.addEventListener('click', (e)=>{
  e.preventDefault()
  document.getElementById("form-modal").style.top ="-100vh" 
  click = 1;

})
// Navigation


function onLinkClick(x) {
  if (x===0){
    document.getElementById("showcase").scrollIntoView();
 }

  if (x===1){
     document.getElementById("menu2").scrollIntoView();
  }
 if (x==2){
  document.getElementById("about").scrollIntoView();
 }
 
}

document.getElementById("homeOption").addEventListener('click',(e)=>{
  e.preventDefault()
  onLinkClick(0)
})
document.getElementById("menuOption").addEventListener('click',(e)=>{
  e.preventDefault()
  onLinkClick(1)
})
document.getElementById("contactOption").addEventListener('click',(e)=>{
  e.preventDefault()
  onLinkClick(2)
})
document.getElementById("aboutOption").addEventListener('click',(e)=>{
  e.preventDefault()
  onLinkClick(2)
})

// Slider  function 
const LeftBtn = document.querySelector(".arrow-left")
const rightBtn = document.querySelector(".arrow-right")
const circles = [document.getElementById("circle1"),document.getElementById("circle2")
,document.getElementById("circle3"),document.getElementById("circle4")]
const slide = document.querySelectorAll(".slide")
var current  = 0;  



LeftBtn.addEventListener('click', (e)=>{

e.preventDefault();
MoveLeft();


})


rightBtn.addEventListener('click',(e)=>{
e.preventDefault();
MoveRight();


})

setInterval(MoveRight, 7000);

function MoveLeft (){

if (current===0){

current = 3;
var z = 0; 

slide[0].style.left='-300%'
slide[1].style.left = '-200%'
slide[2].style.left = '-100%'
slide[3].style.left = '0'
} 


else if (current===3){

current =2 ;

slide[0].style.left='-200%'
slide[1].style.left = '-100%'
slide[2].style.left = '0'
slide[3].style.left = '100%'
} 

else if (current===2){

  current =1 ;
  
  slide[0].style.left='-100%'
  slide[1].style.left = '0%'
  slide[2].style.left = '100%'
  slide[3].style.left = '200%'
  } 
  
  else if (current===1){

    current =0 ;
    
    slide[0].style.left='0%'
    slide[1].style.left = '100%'
    slide[2].style.left = '200%'
    slide[3].style.left = '300%'
    } 
    

    CircleUpdate()



}


function MoveRight (){

  if (current===0){
  
  current = 1;

  
  slide[0].style.left='-100%'
  slide[1].style.left = '0%'
  slide[2].style.left = '100%'
  slide[3].style.left = '200%'
  } 
  
  
  else if (current===1){
  
  current =2 ;
  
  slide[0].style.left='-200%'
  slide[1].style.left = '-100%'
  slide[2].style.left = '0'
  slide[3].style.left = '100%'
  } 
  
  else if (current===2){
  
    current =3 ;
    
    slide[0].style.left='-300%'
    slide[1].style.left = '-200%'
    slide[2].style.left = '-100%'
    slide[3].style.left = '0%'
    } 
    
    else if (current===3){
  
      current =0 ;
      
      slide[0].style.left='0%'
      slide[1].style.left = '100%'
      slide[2].style.left = '200%'
      slide[3].style.left = '300%'
      } 
      
  
  
      CircleUpdate()
  
  
  }

function CircleUpdate(){

for (var j=0; j<circles.length; j++){

  circles[j].classList.remove("chosen");
if (current===j){
circles[j].classList.add("chosen")
}
}}


// Toggle Menu 


var MenuTables = [document.getElementById("opt1"),document.getElementById("opt2"),
document.getElementById("opt3"),document.getElementById("opt4")]

var MenuHeaders = [document.getElementById("opt1h"),document.getElementById("opt2h"),
document.getElementById("opt3h"),document.getElementById("opt4h")]

var MenuTargets = [document.getElementById("opt1ht"),document.getElementById("opt2ht"),
document.getElementById("opt3ht"),document.getElementById("opt4ht")]




document.getElementById("choices-section").addEventListener('click', (e)=>{
e.preventDefault()
ClearMenus ()   

console.log(e.target)


for(var j=0; j<MenuTargets.length; j++ ){
if (e.target === MenuTargets[j]){

MenuTables[j].style.bottom = "10%"
MenuHeaders[j].style.top = "30%"
}

}


})



function ClearMenus () {


  for(var j=0; j<MenuTables.length; j++){

    MenuHeaders[j].style.top = "50%"
  MenuTables[j].style.bottom = "-100%"
  
  }
  
}