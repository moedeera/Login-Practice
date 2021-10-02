// function myFunction() {
//     var x = document.getElementById("myTopnav");
//     if (x.className === "topnav") {
//       x.className += " responsive";
//     } else {
//       x.className = "topnav";
//     }
//   }

// const { text } = require("express");


//   // slide show ///
//   var slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   var i;
//   var slides = document.getElementsByClassName("mySlides");
//   var dots = document.getElementsByClassName("dot");
//   if (n > slides.length) {slideIndex = 1}    
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";  
//   }
//   for (i = 0; i < dots.length; i++) {
//       dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";  
//   dots[slideIndex-1].className += " active";
// }






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
// window.addEventListener('click', CloseMenu(e)

// )

// function CloseMenu(e){
//   if(e.target !== form )
//   document.getElementById("form-modal").style.top ="-200px"
 
// }

function myFunction() {
  location.replace("/Portfolio")
}

function myFunction2() {
  location.replace("/Projects")
}

// Slides animation


const slide = document.querySelectorAll(".slide")
const circles = [document.getElementById("circle1"),document.getElementById("circle2")
,document.getElementById("circle3")]
const Text = document.getElementById("text")
const Text2 = document.getElementById("info")
var current= 0;
let reverse = false;


document.querySelector(".slides").addEventListener('click',(e)=>{

e.preventDefault()
MoveRight()


})
function MoveRight (){

  if (current===0){
  
  current = 1;
  reverse = false;

  
  slide[0].style.left='-100%'
  slide[1].style.left = '0%'
  slide[2].style.left = '100%'
  
  Text.innerHTML = "Master HTML, CSS and JavaScript";
  Text2.innerHTML = "Take an assessment questionnaire and allow our algorithm to find the best path and tutorials to learn HTML, CSS and JavaScript "
 
  } 
  
  
  else if (current===1 && reverse === false ){
  
  current =2 ;
  
  slide[0].style.left='-100%'
  slide[1].style.left = '-100%'
  slide[2].style.left = '0'

  Text.innerHTML = "Find your Coding Rythm"
  Text2.innerHTML = "Everyone learns differently so find out what works for and get assistance from people who have taken the same tutorials and courses"

  } 
  
  else if (current===1 && reverse === true ){
  
    current =0 ;
    
    slide[0].style.left='0%'
    slide[1].style.left = '100%'
    slide[2].style.left = '100%'

    Text.innerHTML = "Free Interactive Coding Mentorship"
    Text2.innerHTML = "A Mentorship program designed to help you learn to code, set up a portfolio, and start finding work"
  
    } 
    





  else if (current===2){
  
    current = 1 ;
    reverse = true;

    
    slide[0].style.left='-100%'
    slide[1].style.left = '0%'
    slide[2].style.left = '100%'
    Text.innerHTML = "Master HTML, CSS and JavaScript";
    Text2.innerHTML = "Take an assessment questionnaire and allow our algorithm to find the best path and tutorials to learn HTML, CSS and JavaScript "

    } 
    

 
  
      CircleUpdate()
  
  
  }


  //circle function
  function CircleUpdate(){

    for (var j=0; j<circles.length; j++){
    
      circles[j].classList.remove("chosen");
    if (current===j){
    circles[j].classList.add("chosen")
    }
    }}
    

    setInterval(MoveRight, 5000);


    /// 