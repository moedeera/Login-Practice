// // function httpGetAsync(theUrl, callback)
// // {
// //     var xmlHttp = new XMLHttpRequest();
// //     xmlHttp.onreadystatechange = function() { 
// //         if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
// //             callback(xmlHttp.responseText);
// //     }
// //     xmlHttp.open("GET", theUrl, true); // true for asynchronous 
// //     xmlHttp.send(null);
// // }

// // function cons(text){

// // console.log(text)

// // }
// // httpGetAsync('./tutorials', cons() )

// function Load () {


//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', './tutorials', true)

//     xhr.onload = function () {

// if (this.status===200){
//     console.log(this.responseText)
// }


//     }

//     console.log(xhr)
// }

// Load ();