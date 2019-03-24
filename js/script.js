console.log("Javascript is linked!");
// var c = document.getElementBy
var canvas = document.querySelector("#myCanvas");
var c = canvas.getContext('2d');
canvas.width = 700;
canvas.height = 550;
var square = 75; //length of one side of a square in pixels;
var columns = 7; //number of columns so we know how many squares we need horizontally;
var rows = 6; // number of rows so that we know how many squares we need vertically;

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
 // 87.5 = (canvas.width - (square * columns) / 2)
// this is the y-cooridinte of the board position, beginning from the top left: console.log((550-(75*6))/2);
// 50 = (canvas.height - (square * rows) / 2)
//525 = square * columns ; 450 = square * rows;

//CREATING THE EMPTY STATE BOARD...
//1. CREATE A BOARD WITH A BACKGROUND
c.fillStyle = '#fbca70'; //light orange color;
c.fillRect((canvas.width - (square * columns))/ 2,(canvas.height - (square * rows)) / 2, square * columns, square * rows);
//2.CREATE LINES FOR ROWS AND COLUMNS so you get illusion of seeing boxes
c.beginPath();
//declare on the canvas where we want our path to start...
//c.moveTo(x,y);
c.strokeStyle = "#000000"; // black colored line;
c.moveTo(87.5,125);
c.lineTo(612.5,125);
c.stroke();
//end the drawing of the first line, and begin on the next horizontal line;
c.beginPath();
