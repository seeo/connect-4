console.log("Javascript is linked!");
// var c = document.getElementBy
var canvas = document.querySelector("#myCanvas");
var c = canvas.getContext('2d');
canvas.width = 700;
canvas.height = 550;
var square = 75; //length of one side of a square in pixels;
var columns = 7; //number of columns so we know how many squares we need horizontally;
var rows = 6; // number of rows so that we know how many squares we need vertically;

var mouse = { //created mouse object to check my x- and y-coordinates when I mouse over stuff;
  x: undefined,
  y: undefined
}


//creating the original game board;
 c.fillStyle = "#ffa500";
 c.fillRect(87.5,50,525,450); // the rectangle ought to be taking directions from the width and height of the canvas...
 console.log((700-(75*7))/2); // this is the x-cooridinate of the board position, beginning from the top left.
 // 87.5 = (canvas.width - (square * columns) / 2)
 console.log((550-(75*6))/2); // this is the y-cooridinte of the board position, beginning from the top left.
// 50 = (canvas.height - (square * rows) / 2)
//525 = square * columns ; 450 = square * rows;
c.fillStyle = '#800080';
c.fillRect((canvas.width - (square * columns))/ 2,(canvas.height - (square * rows)) / 2, square * columns, square * rows);

window.addEventListener('mousemove',function(event){
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse);
})
