// Enemies
var Enemy = function(x, y, sp) {
  this.x = x;
  this.y = y;
  this.sp = sp;
  this.sprite = 'images/enemy-bug.png';
};

// Player
var Player = function(x, y) {
  this.x = 202;
  this.y = 405;
  this.sprite = 'images/char-cat-girl.png';
};
var player = new Player();
// Game should run with same speed in all systems
Enemy.prototype.update = function(dt) {
  this.x = this.x + this.sp * dt;
  if (this.x > 505) {
    this.x = 5;
  }
  if (player.x < this.x + 80 &&
    player.x + 80 > this.x &&
    player.y < this.y + 60 &&
    60 + player.y > this.y) {
    player.x = 202;
    player.y = 405;
  }

};

Player.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var allEnemies = [];
var enemyPos = [230, 60, 150];
enemyPos.map((z) => {
  var min = 30;
  var max = 105;
  var random = Math.random() * (max - min) + min;
  var enemy = new Enemy(0, z, random);
  allEnemies.push(enemy);
})

player.handleInput = function(k) {
  if (k === 'left' && this.x > 10) {
    this.x = this.x - 100;
  } else if (k === 'right' && this.x < 400) {
    this.x = this.x + 100;
  } else if (k === 'up' && this.y > 10) {
    this.y = this.y - 82;
    if (this.y < 70) {
      swal({
        title: "Congo!",
        text: "U Won The Game"
      })
    }
  } else if (k === 'down' && this.y < 400) {
    this.y = this.y + 82;
  }
}

document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
