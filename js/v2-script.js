console.log("Javascript is linked!");

//created canvas and gave it a context of '2-dimensions':
var canvas = document.querySelector("#myCanvas");
var context = canvas.getContext("2d");
//set up dimensions of canvas on our page:
var height;
var width;
var margin;

//setting color of board, grid, circles, players' tokens (And experimenting with 'constants')
const COLOR_BACKGROUND = "#eee" //this is grey for the canvas.
const COLOR_BOARD =  '#fbca70'; //light orange color for the board;
//'constant' are variables that will never be re-assigned in future coding. By convention, MDN recommends constants be ALL CAPS.

//game parameters;
const GRID_CIRCLE = 0.7; //circle within the grids (aka squares) as a fraction of cell size;
const GRID_COLS = 7; //number of game columns;
const GRID_ROWS = 6; //number of game rows;
const MARGIN = 0.05 // margin as a fraction of the shortest screen dimension.

//game variables here:
var grid = []; //empty array for now;

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
  timeLast = timeNow;
  //update

  //draw
  drawBackground();

  //call the next frame
  requestAnimationFrame(loop);
}

//create grid (aka board) based on portrait or landscape mode...
function createGrid(){
  grid = [];//initialise our grid;
  //set up cell size and margins (experimenting with 'let' variables. They can be re-assigned)
  let cell;
  let marginX;
  let marginY;
  //for portrait mode, to detect:
    if(width - (margin * 2) * GRID_ROWS / GRID_COLS < height - (margin*2)){
      //we are in portrait mode;
      cell = (width -(margin * 2))/GRID_COLS;
      marginX = margin;
      marginY = (height - cell * GRID_ROWS) / 2;
    }
  //for landscape mode:
    else{
      cell = (height -(margin * 2))/GRID_ROWS;
      marginX = (width - cell * GRID_COLS) / 2;
      marginY = margin;
      //we are in landscape mode;
    }
    //populate the board now with cells
    for (i = 0; i < GRID_ROWS; i++){
      grid[i] = []; //the array that captures the first row shall at first be empty;
      for (j = 0;j < GRID_COLS; j++){
        
      }
    }
}



function drawBackground(){
  context.fillStyle = COLOR_BACKGROUND; //background of the connect 4 board;
  context.fillRect(0,0,width,height); //draws a rectangle from x-y coordinates of zer0-zer0; i.e. the top left corner of window.
}

function newGame(){ //whenever, setDimensions is called, newGame is created, and createGrid will be called.
  createGrid();
}


function setDimensions(){ //function declared at the parse-time, so we can call the setDimensions anywhere on this script
  height = window.innerHeight;
  width = window.innerWidth;
  canvas.height= height;
  canvas.width = width;
  margin = MARGIN * Math.min(height, width);//MARGIN const will be a fraction of the shortest screen length (either height or width);
  newGame(); // whenever, we call setDimensions, we also call the 'callback' function newGame...though it might mean that when user resizes the board while playing the game, the game will restart(?)
}
