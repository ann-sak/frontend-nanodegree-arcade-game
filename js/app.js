
class Enemy{
  constructor(x,y, speed) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.width = 50;
    this.height = 80;
}

//Update the enemy
  update (dt) {
    this.x = this.x + Math.random() * this.speed;
    if (this.x > 401){
       this.x = 0;
    }

    if (this.y == player.y && (this.x > player.x - 70 && this.x < player.x + 60)) {
        player.collision = true;
    };
 };

// Draw the enemy on the screen
  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Enemies our player must avoid
var enemy1 = new Enemy(0,80, 0);
var enemy2 = new Enemy(0,240,0);
var enemy3 = new Enemy(0,160,0);
/*var enemy1 = new Enemy(0,80, Math.random() * 5 );
var enemy2 = new Enemy(0,240, Math.random() * 5 + 5);
var enemy3 = new Enemy(0,160, Math.random() * 5 + 10);*/
const allEnemies = [enemy1, enemy2, enemy3];

class Player {
  constructor (x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-horn-girl.png';
    this.width = 50;
    this.height = 80;
    this.unmoveable = false;
    this.win = false;
    this.collision = false;
  }

  handleInput(direction){

            if (direction === 'down') {
              if (this.y === 400) {
                this.y = 400;

              } else {
                this.y += 80;
              }
            }

            if (direction === 'up') {

              if (this.y > 0){
                this.y -= 80;
                console.log(this.y);

                  if (this.y === 0) {
                  this.y = 0;
                  setTimeout(() => {
                    this.win = true;
                    setTimeout(() => {this.win = false}, 10);
                  }, 100);
                  console.log(this.y)
                  }
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

  }

//Update the player
  update (dt){
    this.dt = dt;

    if (this.win) {
      score.count += 500;
      lives.reset();
      this.reset();
    }

    if (this.collision) {
      this.reset();
      lives.count--;
      score.count -=50;
      setTimeout(() => { this.collision = false; }, 10);
    }

  }

//Render the player
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  reset() {
    this.x = 200;
    this.y = 400;
  }


};

var player = new Player(200,400);

class Lives {
    constructor() {
        this.x = 10;
        this.y = 0;

        this.count = 5;
        this.sprite = 'images/Heart.png';

        const spriteWidth = 40;
        const spriteHeight = 60;
    }

    reduce() {
        this.count--;
    }

    reset() {
        this.count = 5;
    }

    static get spriteWidth() {
        return 40;
    }

    static get spriteHeight() {
        return 60;
    }

    render() {
        let xPos = this.x;

        // renders heart sprites based on the current lives count
        for (let index = 0; index < this.count; index++) {
            ctx.drawImage(Resources.get(this.sprite), xPos, this.y, Lives.spriteWidth, Lives.spriteHeight);
            xPos += this.x + 30;
        }
    }
}
var lives = new Lives();

class Score {
    constructor() {
        this.x = 20;
        this.y = 600;

        this.count = 0;
    }

    reset() {
        this.count = 0;
    }

    render() {
        ctx.font = "10px Arial";
        ctx.fillText("SCORE:", this.x, this.y);
        ctx.font = "15px Arial";
        ctx.fillText(this.count, this.x + 105, this.y);
    }
}

var score = new Score();

// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
