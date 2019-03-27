"use strict"; //trying to debug.. strict mode: we cannot use undeclared variables.
console.log("Javascript is linked!");

//By convention, MDN recommends constants be ALL CAPS.
//setting color of board, grid, circles, players' tokens (And experimenting with 'constants')
const COLOR_BACKGROUND = "#eee"; //this is grey for the canvas.
const COLOR_COMP = "#f22020"; //this is red
const COLOR_COMP_DARK = "#be0909"; //this is dark red
const COLOR_BOARD = "#fbca70"; //light orange color for the board;
const COLOR_BOARD_BOTTOM = "#be7b00"; //dark orange color for the bottom of the board;
const COLOR_PLAY = "#2929e9"; //this is blue
const COLOR_PLAY_DARK = "#05058c"; //this is dark blue
const COLOR_DRAW = "green";
const COLOR_TIE_DARK = "dark green";
const COLOR_WIN = "black"; //will highlight the winning circles when there is a win, then game over

//text
const TEXT_COMP = "Computer";
const TEXT_PLAY = "Player";
const TEXT_DRAW = "DRAW";
const TEXT_WIN = "WINS!";


//game parameters;
const GRID_CIRCLE = 0.7; //circle diameter within the grids (aka squares) as a fraction of cell length;
const GRID_COLS = 7; //number of game columns;
const GRID_ROWS = 6; //number of game rows;
const MARGIN = 0.02 // margin as a fraction of the shortest screen dimension.

function loop (timeNow){ //the requestAnimationFrame is going through a recursive loop at 60FPS.
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
  //drawText();
  //call the next frame
  requestAnimationFrame(loop);
}

function drawBackground(){
  context.fillStyle = COLOR_BACKGROUND; //background of the connect 4 board;
  context.fillRect(0,0,width,height); //draws a rectangle from x-y coordinates of zer0-zer0; i.e. the top left corner of window.
}

function drawBoard(){
  //draw the board and bottom of board first (without the circles)
  let cell = grid[0][0]; // the top left;-=
  let boardHeight = cell.h * GRID_ROWS;
  let boardWidth = cell.w * GRID_COLS;
  context.fillStyle = COLOR_BOARD;
  context.fillRect(cell.left, cell.top, boardWidth, boardHeight);
  context.fillStyle = COLOR_BOARD_BOTTOM;
  context.fillRect(cell.left - (margin/2),cell.top + boardHeight - (margin/2), boardWidth + margin, margin);

  //Draw  circles onto each grid[i][j]:
  for (let row of grid){
    for (let cell of row){
      cell.draw(context);
    }
  }
}


    // draw the text

//classes here, for Cell, declared at the global scope:
class Cell{ //a class is an idea of a template that can be used to create multiple Objects with the same data and fuctions.
  //in this case, we are going to create cells over and over again. And each cell shall be an Object.
  constructor(left,top,w,h,row,col){// to create a class, we need to use Javascript's constructor function
//the parameters used in the constructor function of the Cell class is consistent with the parameters we used to declare the Cell class in the double-for loop.
    this.bottom = top + h; //bottom pixel position of 'this' cell is the sum of top position and height of cell;
    this.left = left;
    this.right = left + w;
    this.top = top;
    this.w = w;
    this.h = h;
    this.row = row;
    this.col = col;
    this.centerX = left + w / 2; //center X coordinate of circle
    this.centerY = top + h / 2; // center Y coordinate of circle
    this.r = w * GRID_CIRCLE / 2; // diameter of circle is a fraction of the cell width, radius is half of diameter;
    this.highlight = null; //all circles begin with no highlight, until cursor moves to cell, then highlightCell function event listener activates;
    this.owner = null; // when true -> player; when false -> computer
    this.winner = false; //every circle drawn begins with a winner value of false;
  }
  //create this contains method so that we can use it for our highlightCell later below
  contains(x, y){
    return x > this.left && x <this.right && y > this.top && y <this.bottom;
  }
  //draw circle:
  draw(context){
    //OWNER COLOR;
    let color;
    if(this.owner == null){
      color = COLOR_BACKGROUND;
    }else if(this.owner == true){ //owner == true is human player, blue color
      color = COLOR_PLAY;
    }else{
      color = COLOR_COMP; //owner == false is computer, red color
    }

    //DRAW THE CIRCLE:
    //console.log("Begin drawing circle");
    context.fillStyle = color;
    context.beginPath();
    context.arc(this.centerX, this.centerY, this.r, 0, Math.PI * 2);
    context.fill()
    //console.log("End drawing of circle");

    //DRAW HIGHLIGHTING:
    if (this.winner || this.highlight != null){
  // the above means: if highlighting of the cell is empty:
    color = this.winner ? COLOR_WIN : this.highlight ? COLOR_PLAY : COLOR_COMP;

    //console.log("Begin drawing of highlighting");
  //  color = this.highlight ? COLOR_PLAY : COLOR_COMP;
    //DRAW HIGHLIGHTING AROUND THE CIRCLE:
    context.lineWidth = (this.r / 4); //this determines how bold the highlight around the circle will be....
    context.strokeStyle = color;
    context.beginPath();
    context.arc(this.centerX, this.centerY, this.r, 0, Math.PI * 2);
    context.stroke();
    //console.log("End drawing of highlighting");
    }
  }
}

//created canvas and gave it a context of '2-dimensions':
var canvas = document.querySelector("#myCanvas");
var context = canvas.getContext("2d");
//set up dimensions of canvas on our page:
var height;
var width;
var margin;

//game variables here:
var grid = []; //empty array for now;
var gameOver = new Boolean(); //explicitly set the variable to be a true or false
var gameDraw = new Boolean();
var playersTurn = new Boolean(); //if true, player goes first, if false computer goes first
setDimensions(); //will create the dimensions of the canvas later to explicitly take up the height and width of the browser

//Event listeners here, for resizing of canvas
canvas.addEventListener("click", click);
canvas.addEventListener("mousemove", highlightBoard);
window.addEventListener("resize", setDimensions);

//create game loop so that createBoard will be able to do something later on
var timeDelta; //to keep track of the time , i.e. time between frames;
var timeLast; // and to keep track of the last frame time;
requestAnimationFrame(loop);

//checkWin container arrays here, will not work if don't run together with connect4 function.
let vertical = []; // declare en empty array to store cells that are in the vertical column
let horizontal = []; // declare an empty array to store cells that are in the horizontal row
let diagonalLeft = []; // declare an empty array to store cells that are in the diagonal from top left to bottom right
let diagonalRight = []; // declare an empty array to store cells that are in the diagonal from the top right to botom left

function checkForWin(row, col){ //this call back function takes in the row and col values from the previous function before loop begins
//checkWin will generate four arrays representing the possible ways a win can be made: vertical, horizontal, and two diagonals.
//regardless of whether the cells have or have not been filled.
  for (let i = 0; i < GRID_ROWS; i++){
    for (let j =0 ; j < GRID_COLS; j++){
      if (i == row){
        horizontal.push(grid[i][j]);
      }
      if (j == col){
        vertical.push(grid[i][j]);
      }
      if (i + j == row + col){
        diagonalRight.push(grid[i][j]);//diagonalRight (top Right to bottom Left);
      }
      if(i - j == row - col){
        diagonalLeft.push(grid[i][j]); //diagonalLeft(top Left to Bottom Right)
      }
    }
  }
    return connect4(horizontal) || connect4(vertical)|| connect4(diagonalLeft)|| connect4(diagonalRight);
     //above: put any of the four arrays into the connect4 function, connect4 function will return any one of the arrays back when there are four consecutive ownerships
}

let container = []; //declare an empty array here for use inside the connect4 function.
function connect4(container){ //this function is called within the checkWin function... its argument will be an array
  let count = 0;//will count number of consecutive same cell ownerships with this.
  let lastOwner = null;
  let winningCells = [];
    for(let i = 0; i < container.length; i++){
      if(container[i].owner == null){ //if a cell has no owner (aka it is unfilled, then no count
        count = 0;
        winningCells = [];
      }
      else if (container[i].owner == lastOwner){//if the current cell owner is the same as the last cell owner, we increase count by 1
        count++;
        winningCells.push(container[i]);
      }
      else { //the third case is where there is a change in ownership, if that is the case, reset the winningCell array and start count at 1;
        count = 1;
        winningCells = [];
        winningCells.push(container[i]);
      }
      lastOwner = container[i].owner; //sets the last owner to be the current cell, before new loops begins.
      if (count == 4){ // four in a row is a win, we have a winner! check in future if this 'four' can be dynamic...
        for (let cell of winningCells){
          cell.winner = true;
        }
        return true; //removed this true thing since it seems to mess up my cell.winner property
      }
    }
    return false; //removed this false thing since it seems to mess up my cell.winner property
}

function click(event){
  if (gameOver == true){
    newGame();
    return;
  }
  if(playersTurn == false){
    //REMOVED return here. if not player's turn, player should not be able to click...
  }
  selectCell();
}

//There are only seven options in a connect-4 game, since there are only seven columns.
function highlightCell(x, y){
  let col = null; //only max seven options, so can only highlight max seven circles at anytime
  for (let row of grid){
    for (let cell of row){
      cell.highlight = null; //clear existing highlightings first
      if (cell.contains(x, y)){ //get the column;
        col = cell.col;
      }
    }
  }
  if (col == null){
    return;
  }
  //highlight the first unoccupied circle (we shall loop through the rows backwards)
  for (let i = GRID_ROWS - 1; i >= 0; i--){; //there are six rows, but the array.length is six + 1;
    if(grid[i][col].owner == null){ //grid[0][1], is cell of top row, second column from the left;
        grid[i][col].highlight = playersTurn;
        return grid[i][col];
    }
  }
  return null;
}

function highlightBoard(event){
  if((!playersTurn && gameOver)||(playersTurn && gameOver)){ // TODO : later we just want to make sure that human player cannot hijack computer's turn
     return; //don't show any highlight if not player's turn or if the game is over;
  }
    //console.log("the highlight cell function has been called");
    highlightCell(event.clientX, event.clientY); // TO DO need to read documentation for this.
    //console.log("the highlight cell function has ended calling");
}

function selectCell(){
  let highlighting = false;
  OUTER: for (let row of grid) {
    for (let cell of row) {
      if (cell.highlight != null) {
        highlighting = true;
        cell.highlight = null;
        console.log("just before grid[i][j] cell.owner property is assigned to players turn; which will return a color");
        cell.owner = playersTurn;
        console.log("just after cell.owner got re-assigned");
        if(checkForWin(cell.row, cell.col)){ //when player is done selecting a cell, program will check if there is a win anywhere.
          gameOver = true;
        }
          break OUTER;
      }
    }
  }
  if(!highlighting){//If there is no highlighting, player cannot select:
    return;
  }

  //check for a tied game
  if(gameOver == false){ //proof by contradiction
    gameDraw = true; //assume first that game is draw
    OUTER: for (let row of grid){
      for (let cell of row){
        if (cell.owner == null){ //since there is at least once cell that has no owner
          gameDraw = false; // game cannot be a draw
          break OUTER;
        }
      }
    }
    //set game over
    if (gameDraw == true){ // if game is a draw, then game is also over
      gameOver = true;
    }
  }


  //continue playing if the game is not overflow / switch
  if(!gameOver){
    console.log("begin checking if it is game over");
    playersTurn = !playersTurn;
    console.log("end checking if it is game over");
  }
}

function declareEndgame (){
  if (gameOver == true){

  }
}

function setDimensions(){ //function declared at the parse-time, so we can call the setDimensions anywhere on this script
  height = window.innerHeight;
  width = window.innerWidth;
  canvas.height= height;
  canvas.width = width;
  margin = MARGIN * Math.min(height, width);//MARGIN const will be a fraction of the shortest screen length (either height or width);
  newGame(); // whenever, we call setDimensions, we also call the 'callback' function newGame...though it might mean that when user resizes the board while playing the game, the game will restart(?)
}

function newGame(){ //whenever, setDimensions is called, newGame is created, and createBoard will be called.
  playersTurn = Math.random() < 0.5; //randomise who beings first
  gameOver = false;
  gameDraw = false;
  document.querySelector("#endgame").style.display = "none";
  createBoard();
}

function createBoard(){
  grid = [];//initialise our grid;
  //set up cell size and margins (experimenting with 'let' variables. They can be re-assigned)
  let cell;
  let marginX;
  let marginY;
  //for portrait mode, to detect:
    if(width - (margin * 2) * GRID_ROWS / GRID_COLS < height - (margin*2)){
      //we are in portrait mode;
      cell = (width - (margin * 2))/GRID_COLS; //this gives the pixel length of a cell, and this cell will be a square of equal sides.
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
    for (let i = 0; i < GRID_ROWS; i++){
      grid[i] = []; //the array that captures the first row shall at first be empty;
      for (let j = 0; j < GRID_COLS; j++){ // below we calculate the position for each of the cells:
        let left = marginX + j * cell; //pixel position of the left side of each cell;
        let top = marginY + i * cell; //pixel position of the top side of each cell;
        // we will need to create a new Cell class that has the following properties:
        // left: a pixel position on the left side of each cell;
        // top: a pixel position on the top side of each cell;
        // cell: length of each cell;
        // cell: height of each cell;
        // i : row number (for calculating position later- esp. for designing the Win conditions);
        // j: column number (");
        grid[i][j] = new Cell (left, top, cell, cell, i, j);//every cell created goes into constructor function so that we can repeated create Cell objects with key-value pairs.
      }
    }
}
