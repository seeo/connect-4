console.log("Javascript is linked!");

//created canvas and gave it a context of '2-dimensions':
var canvas = document.querySelector("#myCanvas");
var context = canvas.getContext("2d");
//set up dimensions of canvas on our page:
var height;
var width;
var margin;

//setting color of board, grid, circles, players' tokens (And experimenting with 'constants')
const COLOR_BACKGROUND = "#eee"; //this is grey for the canvas.
const COLOR_COMP = "#f22020"; //this is red
const COLOR_COMP_DARK = "#be0909"; //this is dark red
const COLOR_BOARD = "#fbca70"; //light orange color for the board;
const COLOR_BOARD_BOTTOM = "#be7b00"; //dark orange color for the bottom of the board;
const COLOR_PLAY = "#2929e9"; //this is blue
const COLOR_PLAY_DARK = "#05058c"; //this is dark blue
//'constant' are variables that will never be re-assigned in future coding. By convention, MDN recommends constants be ALL CAPS.

//game parameters;
const GRID_CIRCLE = 0.7; //circle within the grids (aka squares) as a fraction of cell size;
const GRID_COLS = 7; //number of game columns;
const GRID_ROWS = 6; //number of game rows;
const MARGIN = 0.02 // margin as a fraction of the shortest screen dimension.

//classes here, for Cell, declared at the global scope:
class Cell{ //a class is an idea of a template that can be used to create multiple Objects with the same data and fuctions.
  //in this case, we are going to create cells over and over again. And each cell shall be an Object.
  constructor(left, top, w, h,row, col){// to create a class, we need to use Javascript's constructor function
//the parameters used in the constructor function of the Cell class is consistent with the parameters we used to declare the Cell class in the double-for loop.
    this.bot = top + h; //bottom pixel position of 'this' cell is the sum of top position and height of cell;
    this.left = left;
    this.right = left + w;
    this.top = top;
    this.w = w;
    this.h = h;
    this.row = row;
    this.col = col;
    this.centerX = left + w / 2; //center X coordinate of circle
    this.centerY = top + h / 2; // center Y coordinate of circle
    this.r = w * GRID_CIRCLE / 2; // radius of circle, is a fraction of the cell width
    this.owner = null; // when true -> player; when false -> computer
  }
  //draw circle:
  draw(context){

    //owner color;
    // let color;
    // if(this.owner == null){
    //   color = COLOR_BACKGROUND;
    // }else if(this.owner){
    //   color  = COLOR_PLAY;
    // }else{
    //   color = COLOR_COMP;
    // }
    let color = this.owner == null ? COLOR_BACKGROUND : this.owner ? COLOR_PLAY : COLOR_COMP;
    //draw the circle:
    context.fillStyle = color;
    context.beginPath();
    context.arc(this.centerX, this.centerY, this.r, 0, Math.PI * 2);
    context.fill()
  }
}

//game variables here:
var grid = []; //empty array for now;

setDimensions(); //will create the dimensions of the canvas later to explicitly take up the height and width of the browser
// coding the event listener here, for resizing of canvas
window.addEventListener("resize", setDimensions);

//create game loop so that createBoard will be able to do something later on
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
  drawBoard();
  //call the next frame
  requestAnimationFrame(loop);
}

//create grid (aka board) based on portrait or landscape mode...
function createBoard(){
  grid = [];//initialise our grid;
  //set up cell size and margins (experimenting with 'let' variables. They can be re-assigned)
  let cell;
  let marginX;
  let marginY;
  //for portrait mode, to detect:
    if(width - (margin * 2) * GRID_ROWS / GRID_COLS < height - (margin*2)){
      //we are in portrait mode;
      cell = (width -(margin * 2))/GRID_COLS; //this gives the pixel length of a cell, and this cell will be a square of equal sides.
      marginX = margin;
      marginY = (height - cell * GRID_ROWS) / 2;
    }
  //for landscape mode:
    else{
      cell = (height -(margin * 2))/GRID_ROWS; //gives pixel length of a cell.
      marginX = (width - cell * GRID_COLS) / 2;
      marginY = margin;
      //we are in landscape mode;
    }
    //populate the board now with cells
    for (i = 0; i < GRID_ROWS; i++){
      grid[i] = []; //the array that captures the first row shall at first be empty;
      for (j = 0; j < GRID_COLS; j++){ // below we calculate the position for each of the cells:
        let left = marginX + j * cell; //pixel position of the left side of each cell;
        let top = marginY + i * cell; //pixel position of the top side of each cell;
        // we will need to create a new Cell class that has the following properties:
        // left: a pixel position on the left side of each cell;
        // top: a pixel position on the top side of each cell;
        // cell: length of each cell;
        // cell: height of each cell;
        // i : row number (for calculating position later- esp. for designing the Win conditions);
        // j: column number (");
        grid[i][j] = new Cell (left, top, cell, cell, i, j);
      }
    }
}



function drawBackground(){
  context.fillStyle = COLOR_BACKGROUND; //background of the connect 4 board;
  context.fillRect(0,0,width,height); //draws a rectangle from x-y coordinates of zer0-zer0; i.e. the top left corner of window.
}

function drawBoard(){
  //draw the board and bottom of board first (without the circles)
  let cell = grid [0][0]; // the top left;
  let boardHeight = cell.h * GRID_ROWS;
  let boardWidth = cell.w * GRID_COLS;
  context.fillStyle = COLOR_BOARD;
  context.fillRect(cell.left, cell.top, boardWidth, boardHeight);
  context.fillStyle = COLOR_BOARD_BOTTOM;
  context.fillRect(cell.left - (margin/2),cell.top + boardHeight - (margin/2), boardWidth + margin, margin);

  //draw the circles Now:
  for (row of grid){
    for (cell of row){
      cell.draw(context);
    }
  }

}

function newGame(){ //whenever, setDimensions is called, newGame is created, and createBoard will be called.
  createBoard();
}


function setDimensions(){ //function declared at the parse-time, so we can call the setDimensions anywhere on this script
  height = window.innerHeight;
  width = window.innerWidth;
  canvas.height= height;
  canvas.width = width;
  margin = MARGIN * Math.min(height, width);//MARGIN const will be a fraction of the shortest screen length (either height or width);
  newGame(); // whenever, we call setDimensions, we also call the 'callback' function newGame...though it might mean that when user resizes the board while playing the game, the game will restart(?)
}
