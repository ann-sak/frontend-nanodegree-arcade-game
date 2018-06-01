
var Enemy = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.speed = 15 * Math.random();
    this.width = 50;
    this.height = 80;
}

//Update the enemy
Enemy.prototype.update = function(dt) {
    this.x = this.x + Math.random() * this.speed;
    if (this.x > 401){
       this.x = 0;
   }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var enemy1 = new Enemy(0,80);
var enemy2 = new Enemy(0,240);
var enemy3 = new Enemy(0,160);

const allEnemies = [enemy1, enemy2, enemy3];

var Player = function(x,y) {
  this.sprite = 'images/char-horn-girl.png';
  this.x = x;
  this.y = y;
  this.width = 50;
  this.height = 80;
}

//Update the player
Player.prototype.update = function(dt){
  this.dt = dt;
  checkCollisions();
  win();
};

//Render the player
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


Player.prototype.handleInput = function(direction){
  if (direction === 'up') {
    if (this.y === 400) {
      this.y = 400;
    } else {
      this.y += 80;
    }
  }

  if (direction === 'down') {
    if (this.y === 0) {
      this.y = 0;
    } else {
      this.y -= 80;
    }
  }

  if (direction === 'right') {
    if (this.x === 400) {
      this.x = 400;
    } else {
      this.x += 100;
    }
  }

  if (direction === 'left') {
    if (this.x === 0) {
      this.x = 0;
    } else {
      this.x -= 100;
    }
  }
};

var player = new Player(200,400);

//Reset the game
function reset (x, y) {
    player.x = x;
    player.y = y;
}

//Checks collision with enemies
function checkCollisions() {
    for (i = 0; i < allEnemies.length; i++) {
      if (allEnemies[i].x < player.x + 50 &&
          allEnemies[i].x + 50 > player.x &&
          allEnemies[i].y < player.y + 80 &&
          allEnemies[i].y + 80 > player.y) {
            reset(200,400);
          }
    }
};

//Reset the game after the player reaches the water
function win() {
  if(player.y === 0) {
    setTimeout(function () {reset(200,400)}, 500);
  }
}




// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
      37: 'left',
      38: 'down',
      39: 'right',
      40: 'up',
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
