//JavaScript Document

var animate = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimattionFrame ||
	function(callback) {
		window.setTimeout(callback, 1000/60);
	};

// Setup a canvas element, establish rendering context.
var canvas = document.createElement('canvas');
var width = 640;
var height = 480;
canvas.height = height;
canvas.width = width;
var context = canvas.getContext('2d');

var paddleWidth = 20;
var paddleHeight = 100;
var ballRadius = 10;

var backgroundColor = "#00cc99";
var paddleColor = "#fff";
var ballColor = "#fff";

// When the page loads, adds the canvas element to the body
// and pass the step function to the animation object
// as the function to fire at 60fps
window.onload = function() {
	document.body.appendChild(canvas);
	animate(step);
};

// Step function chain fires sub functions
var step = function() {
	update();
	render();
	animate();
};

var update = function() {
	
};

// Draw a cyan rectangle
var render = function() {
	context.fillStyle = "#00cc99";
	context.fillRect(0, 0, width, height);
};

// Adding the Paddles and Ball
function Paddle(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.x_speed = 0;
	this.y_speed = 0;
}

Paddle.prototype.render = function() {
	context.fillStyle = "#FFF";
	context.fillRect(this.x, this.y, this.width, this.height);
};

// Set up the player function to instantiate a starting paddle
//for the user's player
function Player() {
	this.paddle = new Paddle(paddleWidth, (canvas.height/2) - (paddleHeight/2), paddleWidth, paddleHeight);
}
Player.prototype.render = function() {
	this.paddle.render();
};

function Computer() {
	this.paddle = new Paddle(canvas.width - (paddleWidth*2), (canvas.height/2) - (paddleHeight/2), paddleWidth, paddleHeight);
}
Computer.prototype.render = function() {
	this.paddle.render();
};

// Create the "Ball"
function Ball(x, y) {
	this.x = x;
	this.y = y;
	this.x_speed = 0;
	this.y_speed = 0;
	this.radius = ballRadius;
}

Ball.prototype.render = function() {
	context.fillRect(this.x, this.y, this.radius*2, this.radius*2);
	context.fillStyle = "#FFF";
};

// Instantiate the player, computer, and ball objects
var player = new Player();
var computer = new Computer();
var ball = new Ball((canvas.width/2) - ballRadius, (canvas.height/2) - ballRadius);

var render = function() {
	context.fillStyle = backgroundColor;
	context.fillRect(0, 0, width, height);
	player.render();
	computer.render();
	ball.render();
};