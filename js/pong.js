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
var paddleMoveSpeed = 5;

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
	animate(step);
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
	this.x_speed = -10;
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

var update = function() {
	player.update();
	computer.update();
	ball.update(player.paddle, computer.paddle);
};

Ball.prototype.update = function(paddle1, paddle2) {
	this.x += this.x_speed;
	this.y += this.y_speed;
	var top_x = this.x - ballRadius;
	var top_y = this.y - ballRadius;
	var bottom_x = this.x + ballRadius;
	var bottom_y = this.y +ballRadius;
	
	// If the ball hits the left wall
	//( the wall behind the player )
	// a point is scored, and the ball is reset.
	if (top_x < 0 || top_x > canvas.width) {
		this.x_speed = -10;
		this.y_speed = 0;
		this.x = (canvas.width/2) - ballRadius;
		this.y = (canvas.height/2) - ballRadius;
	}
	
	// If the ball hits one of the vertical walls,
	//it gets bounced back into the Pong Arena
	if (top_y < 0) {
		// Ball has hit the top wall
		this.y = ballRadius;
		this.y_speed = -this.y_speed;
	} else if ( bottom_y > canvas.height ) {
		// Ball has hit the bottom wall
		this.y = canvas.height - ballRadius;
		this.y_speed = -this.y_speed;
	}
	
	// If paddle is hit. . .
	if ( top_x < canvas.width / 2){
	var playerHitX = paddle1.x + paddle1.width;
	if ( (playerHitX > top_x && playerHitX < bottom_x) && (paddle1.y < top_y && paddle1.y + paddle1.height > bottom_y) ) {
		this.x_speed = 10;
		this.y_speed += (paddle1.x_speed / 2);
		this.x += this.x_speed;
		}
	} else {
		
		if ( (paddle2.x > top_x && paddle2.x < bottom_x ) && (top_y > paddle2.y && bottom_y < paddle2.y + paddle2.height) ) {
			
			this.x_speed = -ballRadius;
			this.y_speed += (paddle1.y_speed / 2);
			this.x += this.x_speed;
			
		}
	}
};
	
// Add some control. Because we've lost it.
var keyDown = {};

window.addEventListener("keydown", function(event) {
	keyDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
	delete keyDown [event.keyCode];
});

Player.prototype.update = function() {
	for (var key in keyDown) {
		var value = Number(key);
		//
		if ( value == 81 ) {
			this.paddle.move(0, -paddleMoveSpeed);
			//
		} else if ( value == 65) {
			this.paddle.move(0, paddleMoveSpeed);
		} else {
			this.paddle.move(0,0);
		}
	}
};

Paddle.prototype.move = function(x, y) {
	this.x += x;
	this.y += y;
	this.x_speed = x;
	this.y_speed = y;
};

Computer.prototype.update = function() {
	for (var key in keyDown) {
		var value = Number(key);
		//
		if ( value == 38 ) {
			this.paddle.move(0, -paddleMoveSpeed);
			//
		} else if ( value == 40) {
			this.paddle.move(0, paddleMoveSpeed);
		} else {
			this.paddle.move(0,0);
		}
	}
};

Computer.prototype.move = function(x, y) {
	this.x += x;
	this.y += y;
	this.x_speed = x;
	this.y_speed = y;
};