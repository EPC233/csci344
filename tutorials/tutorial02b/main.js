let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

// in p5.js, the function runs on page load:
function setup()
{
  createCanvas(canvasWidth, canvasHeight);

  // invoke any drawing functions inside of setup.
  // functions should all go between "createCanvas()" and "drawGrid()"
  draw5Circles();
  draw5RedSquares();
  drawGrid(canvasWidth, canvasHeight);

  draw5CirclesWhile();
  draw5CirclesFor();
  drawNCircles(8);
  drawNCirclesRecur(Math.floor((Math.random() * 10) + 1), 200); //  trying out random
  drawNCirclesFlexible(Math.floor((Math.random() * 10) + 1), Math.floor((Math.random() * 100) + 20), 900, 200);
  
  drawNShapesFlexible(5, 50, 1000, 200, 'bruh');
  drawNShapesDirectionFlexible(5, 50, 1100, 200, 'circle', 'yeet');
}

// my first function
function draw5Circles()
{
  noFill();
  fill('red');
  circle(100, 200, 50); // centerX, centerY, radius
  circle(100, 250, 50);
  circle(100, 300, 50);
  circle(100, 350, 50);
  circle(100, 400, 50);
}

function draw5RedSquares()
{
  fill("red");
  square(320, 200, 50); // topLeftX, topLeftY, width
  square(320, 250, 50);
  square(320, 300, 50);
  square(320, 350, 50);
  square(320, 400, 50);
}

function draw5CirclesWhile()
{
  text("draw5CirclesWhile()", 500, 150);
  noFill();
  let i = 0;
  let y = 200;
  while (i < 5) {
    circle(500, y, 50);
    y += 50;
    i++;
  }
}

function draw5CirclesFor()
{
  text("draw5CirclesFor()", 600, 150);
  noFill();
  let y = 200;
  for (let i = 0; i < 5; i++) {
    circle(600, y, 50);
    y += 50;
  }
}

function drawNCircles(n)
{
  text("drawNCircles()", 700, 150);
  noFill();
  let y = 200;
  for (let i = 0; i < n; i++) {
    circle(700, y, 50);
    y += 50;
  }
}

//  Just messing around with recursion in Jscript here
function drawNCirclesRecur(n, y = 200)
{
    if (n <= 0) return;
    
    noFill();
    text("draw5CirclesNRecur()", 800, 150);
    
    circle(800, y, 50);
    drawNCirclesRecur(n - 1, y + 50);
}

function drawNCirclesFlexible(n, size, x, y)
{
  text("drawNCirclesFlexible()", x, y - 50);
  noFill();
  for (let i = 0; i < n; i++)
  {
    circle(x, y, size);
    y += 50;
  }
}

function drawNShapesFlexible(n, size, x, y, shape)
{
  text("drawNShapesFlexible()", x, y - 50);
  noFill();
  for (let i = 0; i < n; i++)
  {
    if (shape == 'circle') circle(x, y, size);
    else square(x, y, size);
    y += 50;
  }
}

function drawNShapesDirectionFlexible(n, size, x, y, shape, direction)
{
  text("drawNShapesDirectionFlexible()", x, y - 50);
  noFill();
  for (let i = 0; i < n; i++)
  {
    if (shape == 'circle') circle(x, y, size);
    else square(x, y, size);
    if (direction == 'row') y += 50;
    else x += 50;
  }
}