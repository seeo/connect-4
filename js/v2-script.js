console.log("Javascript is linked!");

//created canvas and gave it a context of '2-dimensions':
var canvas = document.querySelector("#myCanvas");
var context = canvas.getContext("2d");
//set up dimensions of canvas on our page:
var height;
var width;
setDimensions(); //will create the dimensions of the canvas later to explicitly take up the height and width of the browser
// coding the event listener here, for resizing of canvas
window.addEventListener("resize", setDimensions);

//create game loop so that createGrid will be able to do something later on
var timeDelta; //to keep track of the time , i.e. time between frames;
var timeLast; // and to keep track of the last frame time;
requestAnimationFrame(loop);

function loop (timeNow){
  //initialise timeLast
  if(!timeLast){ //timeLast is null or undefined, then...
    timeLast = timeNow; //this will only run once.
  }
  //calculate the time difference in seconds;
  timeDelta = (timeNow - timeLast)/1000; //since computer uses milliseconds by default;
}

function createGrid(){

}

function newGame(){ //whenever, setDimensions is called, newGame is created, and createGrid will be called.
  createGrid();
}


function setDimensions(){ //function declared at the parse-time, so we can call the setDimensions anywhere on this script
  height = window.innerHeight;
  width = window.innerWidth;
  canvas.height= height;
  canvas.width = width;
  newGame(); // whenever, we call setDimensions, we also call the 'callback' function newGame...though it might mean that when user resizes the board while playing the game, the game will restart(?)
}
