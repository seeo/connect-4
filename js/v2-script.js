console.log("Javascript is linked!");

//created canvas and gave it a context of '2-dimensions':
var canvas = document.querySelector("#myCanvas");
var context = canvas.getContext("2d");
//set up dimensions of canvas on our page:
var height;
var width;
setDimensions(); //will create the dimensions of the canvas later to explicitly take up the height and width of the browser
// coding the event listener here, for resizing of canvas
window.addEventListener("resize",setDimensions);

function setDimensions(){ //function declared at the parse-time, so we can call the setDimensions anywhere on this script
  
}
