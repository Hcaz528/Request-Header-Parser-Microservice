let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let fps = 60;
var globalWidth;
var globalHeight;


window.onload = function() {
  setInterval( function() {
    moveEveryThing();
    drawEveryThing();
  }, 1000/ fps);
}


let background = new Box(ctx, '#000', {x: canvas.width, y: canvas.height}, {x: 0, y: 0});
// background.centerDraw();

let sq = new Box(ctx, '#fff', {x:20,y:20}, {x:20,y:20});
// sq.draw();

let circ = new Circle(ctx, '#fff', {x:50, y:50}, 30, 2, '#fff');
let iris = new Circle(ctx, '#77f', {x:50, y:50}, 20, 2, '#77f');
let pupil = new Circle(ctx, '#000', {x:50, y:50}, 8, 2, '#000');
// circ.followMouse();

function cMP(e) {
  var rect = canvas.getBoundingClientRect();
  // console.log(rect);
  // var root = document.documentElement;
  // var mouseX = e.clientX - rect.left;
  // var mouseY = e.clientY - rect.top;
  var mouseX = e.clientX - rect.left;
  var mouseY = e.clientY - rect.top;
  return {
    x: mouseX,
    y: mouseY
  }
}

window.addEventListener('mousemove', function(e) {
  var mousePos = cMP(e);
  iris.setY(mousePos.y)
  iris.setX(mousePos.x)
  pupil.setY(mousePos.y)
  pupil.setX(mousePos.x)
  circ.setY(mousePos.y);
  circ.setX(mousePos.x);
});

function moveEveryThing() {
  // sq.moveX(0.5);
  
}

// https://stackoverflow.com/questions/4987309/screen-width-vs-visible-portion
function width(){
   return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0;
}
function height(){
   return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0;
}
////////////////////////////////////////////////////////////////////////////////////


/////////////////////// Draw on the Canvas ////////////////////////////
function drawEveryThing() {
  globalWidth = width();
  globalHeight = height();
  canvas.setAttribute('width', globalWidth);
  canvas.setAttribute('height', globalHeight)
  background.setSize(globalWidth, globalHeight);
  background.draw();
  circ.draw();
  iris.draw();
  pupil.draw();

}



// BOX ///
function Box(ctX, color, size, pos) {
  this.ctx = ctX;
  this.size = size;
  this.pos = pos;
  this.color = color;
  this.getSize = function(){
    return this.size
  }
  
  this.draw = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
  }
  
  this.moveX = function(x) {
    this.pos.x += x;
  }
  
  this.moveY = function(y) {
    this.pos.y += y;
  }
  
  this.setSize = function(x, y) {
    this.size.x = x;
    this.size.y = y;
  }
  
  this.centerDraw = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(canvas.width/2 - this.size.x/2, canvas.height/2 - this.size.y/2, this.size.x, this.size.y);
  }
}

// Circle ///
function Circle(ctX, color, pos, radius, lineWidth, stroke) {
  
  this.move = {x:0, y:0 };
  this.ctx = ctX;
  this.pos = pos;
  this.color = color;
  this.radius = radius;
  this.lineWidth = lineWidth;
  this.stroke = stroke;
  
  this.drawThat = function(x,y) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.stroke;
    this.ctx.stroke();
  }
  
  this.draw = function() { this.drawThat(this.pos.x,this.pos.y) };
  
  this.moveX = function(x) {
    this.pos.x += x;
  }
  
  this.moveY = function(y) {
    this.pos.y += y;
  }
  
  this.setX = function(x) {
    this.pos.x = x;
  }
  
  this.setY = function(y) {
    this.pos.y = y;
  }
  
  this.moveme = function(e, _this) {
      this.move.x = e.clientX;
      this.move.y = e.clientY;
    }
  
  this.followMouse = function() {
    
  }
  
  this.centerDraw = function() { this.drawThat(canvas.width / 2, canvas.height / 2) };

  
}


