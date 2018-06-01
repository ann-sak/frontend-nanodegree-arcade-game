// Enemies our player must avoid




var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = 15 * Math.random();
    this.width = 10;
    this.height = 80;

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + Math.random() * this.speed;
    if (this.x > 401){
       this.x = 0;
   }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var enemy1 = new Enemy(0,80);
var enemy2 = new Enemy(0,240);
var enemy3 = new Enemy(0,160);

const allEnemies = [enemy1, enemy2, enemy3];
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {

this.sprite = 'images/char-horn-girl.png';
this.x = x;
this.y = y;
this.width = 10;
this.height = 80;

}

Player.prototype.update = function(dt){


this.dt = dt;
};

Player.prototype.render = function() {

ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}








// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

Player.prototype.handleInput = function(direction){

  if (direction === 'up') {
    if (this.y === 400) {
      this.y = 400;
    } else {
      this.y += 80;
      console.log(this.y);
    }
  }

  if (direction === 'down') {
    if (this.y === 0) {
      this.y = 0;
    } else {
      this.y -= 80;
      console.log(this.y);
    }
  }

  if (direction === 'right') {
    if (this.x === 400) {
      this.x = 400;
    } else {
      this.x += 100;
      console.log(this.x);
    }
  }

  if (direction === 'left') {
    if (this.x === 0) {
      this.x = 0;
    } else {
      this.x -= 100;
      console.log(this.x);
    }
  }
};

var player = new Player(200,400);

function reset (x, y) {
    player.x = x;
    player.y = y;
}

function checkCollisions() {
    for (i = 0; i < allEnemies.length; i++) {
      if (allEnemies[i].x < player.x + 10 &&
          allEnemies[i].x + 10 > player.x &&
          allEnemies[i].y < player.y + 80 &&
          allEnemies[i].y + 80 > player.y) {
            console.log('collision');
            reset(200,400);
          }
    }
};
checkCollisions();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
      37: 'left',
      38: 'down',
      39: 'right',
      40: 'up',
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
