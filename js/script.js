console.log("Javascript is linked!");
// var c = document.getElementBy
var canvas = document.querySelector("#myCanvas");
var c = canvas.getContext('2d');
canvas.width = 700;
canvas.height = 550;
var square = 75; //length of one side of a square in pixels;
var columns = 7; //number of columns so we know how many squares we need horizontally;
var rows = 6; // number of rows so that we know how many squares we need vertically;
var radius = 30

//CREATED A MOUSE OBJECT to check my x- and y-coordinates when I mouse over stuff;
var mouse = {
  x: undefined,
  y: undefined
}
window.addEventListener('mousemove',function(event){
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse);
})

//orange color;  c.fillStyle = "#ffa500";
// the rectangle ought to be taking directions from the width and height of the canvas: c.fillRect(87.5,50,525,450);
// this is the x-cooridinate of the board position, beginning from the top left: console.log((700-(75*7))/2);
 // 87.5 = ((canvas.width - (square * columns)) / 2)
// this is the y-cooridinte of the board position, beginning from the top left: console.log((550-(75*6))/2);
// 50 = ((canvas.height - (square * rows)) / 2)
//525 = square * columns ; 450 = square * rows;

//CREATING THE EMPTY STATE BOARD...
//1. CREATE A BOARD WITH A BACKGROUND

//2.CREATE LINES FOR ROWS AND COLUMNS so you get illusion of seeing boxes
//COORDINATES FOR SQUARES:
var x0y0_xCoordinate = ((canvas.width - (square * columns) )/ 2);
var x0y0_yCoordinate = ((canvas.height - (square * rows)) / 2);
console.log(x0y0_xCoordinate);
console.log(x0y0_yCoordinate);

//COORDINATES FOR CIRCLES:
var x0y0_xCircle = x0y0_xCoordinate + (square/2);
var x0y0_yCircle = x0y0_yCoordinate + (square/2);
console.log(x0y0_xCoordinate);
console.log(x0y0_yCoordinate);

function originBoard(){
  c.fillStyle = '#fbca70'; //light orange color;
  c.fillRect((canvas.width - (square * columns))/ 2,(canvas.height - (square * rows)) / 2, square * columns, square * rows);
//LINES FOR ROWS:
  for (i = 0; i < (rows+1); i++){ //'x' represents rows, we do a loop to draw horizontal lines here;
    c.beginPath();
//declare on the canvas where we want our path to start...
//c.moveTo(x,y);
    c.strokeStyle = "#000000"; // black colored line;
//c.moveTo(87.5,125);
//first top line x-coordinate: (canvas.width - (square * columns) / 2)
//first top line y-coordinate: (canvas.height - (square * rows) / 2) +square
    c.moveTo(x0y0_xCoordinate,(x0y0_yCoordinate)+(square * i));
//c.lineTo(612.5,125);
// end of the x0 line, x7_xCoordinate: (x0_xCoordinate + (square * columns));
//end of the line x0 line, x7_yCoordinate: (x0_yCoordinate);
    c.lineTo((x0y0_xCoordinate + (square * columns)),(x0y0_yCoordinate) + (square * i));
//c.lineTo((((canvas.width - (square * columns))/2) + square*columns),(((canvas.height - (square * rows)) / 2) + square));
    console.log("Horizontal lines being drawn!");
    c.stroke();
    console.log(c.stroke);
  }
//LINES FOR COLUMNS:
  for (j = 0; j < (columns+1); j++){ //'j' represents columns, we do a loop to draw vertical lines here;
    c.beginPath();
    c.strokeStyle = "#000000";
    c.moveTo((x0y0_xCoordinate)+(square * j),(x0y0_yCoordinate));
    c.lineTo((x0y0_xCoordinate + (square * j)),(x0y0_yCoordinate) + (square * rows));
    c.stroke();
  }
  //DRAW 'EMPTY' CIRCLES WITHIN THE SQUARES:
  //ADDING ROW and COLUMN OF CIRCLES:
  for (j = 0; j < rows; j++){
    x0y0_yCircle = x0y0_yCoordinate + (square/2);
    x0y0_yCircle += (square * j);
    console.log(x0y0_yCircle);
    console.log("Rows of circles are being drawn");
  for (i= 0; i < columns; i++){
    c.beginPath();
    c.arc((x0y0_xCircle+(square * i)),(x0y0_yCircle),radius,0*Math.PI,2*Math.PI);
    c.fillStyle = '#eee';
    c.fill();
    }
  }
}

originBoard();



console.log(x0y0_xCoordinate);
console.log(x0y0_yCoordinate);
console.log(x0y0_xCircle);
console.log(x0y0_yCircle);
console.log("Javascript has ended!");
