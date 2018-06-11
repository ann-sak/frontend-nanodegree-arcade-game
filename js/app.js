
class Enemy{
  constructor(x,y, speed) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.width = 50;
    this.height = 80;
}//end enemy constructor

//Update the enemy
  update (dt) {
    this.x = this.x + Math.random() * this.speed;
    if (this.x > 401){
       this.x = 0;
    }

    if (this.y == player.y && (this.x > player.x - 70 && this.x < player.x + 60)) {
        player.collision = true; //check collision
    };
 };//end enemies update

// Draw the enemy on the screen
  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}//end Enemy class

//generate the enemies
const enemy1 = new Enemy(0,80, Math.random() * 5 );
const enemy2 = new Enemy(0,240, Math.random() * 5 + 5);
const enemy3 = new Enemy(0,160, Math.random() * 5 + 10);
/*const enemy4 = new Enemy(0,80, Math.random() * 5 );
const enemy5 = new Enemy(0,240, Math.random() * 4 + 10);
const enemy6 = new Enemy(0,160, Math.random() * 6 + 10);*/
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
  }//end players constructor

//the players move directions
  handleInput(direction){
      if (direction === 'down') {//the player goes down
        if (this.y === 400) {
          this.y = 400;
        } else {
          this.y += 80;
        }
      }

      if (direction === 'up') {//the player goes up
        if (this.y > 0){
          this.y -= 80;
            if (this.y === 0) {
            this.y = 0;
            setTimeout(() => {
              this.win = true;
              setTimeout(() => {this.win = false}, 20);
            }, 100);
            }
        }
      }

      if (direction === 'right') {//the player goes right
        if (this.x === 400) {
          this.x = 400;
        } else {
          this.x += 100;
        }
      }

      if (direction === 'left') {//the player goes left
        if (this.x === 0) {
          this.x = 0;
        } else {
          this.x -= 100;
        }
      }
    }//end handleInput

//Update the player
  update (dt){
    this.dt = dt;

    if (this.win) {//win function
      score.count += 500;
      lives.reset();
      this.reset();
    }

    if (this.collision) {//check collision
      this.reset();
      lives.count--;
      score.count -=50;
      setTimeout(() => {this.collision = false;}, 10);


    }
    const modal = document.getElementById('modal');
    if (lives.count === 0) {
      modal.style.display = "block";
      this.x = x;
      this.y = y;
    }
  }//end players update

//Render the player
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  reset() {
    this.x = 200;
    this.y = 400;
  }


}; //end Player class
const player = new Player(200,400);//generate player

class Lives {//hearts
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
}//end lives class
const lives = new Lives();//generate lives

class Score {//scores panel
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
}//end score class
const score = new Score();//generate score




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
