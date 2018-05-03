var records = document.getElementById("records");
    starsEarned=0;
    
class Enemy {
    constructor() {   
    this.x=-100;
    this.y=enemiesYPositions[Math.floor(Math.random() * enemiesYPositions.length)];
    this.speed = 1;
    this.sprite = 'images/enemy-bug.png';
    }
};
function initialPlayerPosition () {
    player.y=390;
    player.x=200;
    }
Enemy.prototype.update = function(dt) { 
    this.x+=2* this.speed;

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x>520) {
        this.x=-100;
        this.y = enemiesYPositions[Math.floor(Math.random() * enemiesYPositions.length)]
    }    
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

class Player {
    constructor() {
    this.x=200;
    this.y=390;
    this.speed = 1;
    this.sprite = 'images/char-boy.png';
    }
}
Player.prototype.update = function(){
    if ((player.y == -35)) {
        starsEarned++;
        initialPlayerPosition();
        star.classList.add("star-loaded");
        setTimeout(function() {
            star.classList.remove("star-loaded");
        },1000)
    }
    document.getElementById("stars-number").innerHTML=starsEarned;
}
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(keyCode){
    switch(keyCode) {
        case 'left':  if (this.x > 0)
                          this.x-=100;
                          break
        case 'right': if (this.x < 400) 
                          this.x+=100;
                          break
        case 'up':    if (this.y > -35)
                          this.y-=85;
                          break
        case 'down':  if (this.y < 390)
                          this.y+=85;
                          break   
    }
}
var player = new Player();
var allEnemies = [];
var enemiesYPositions = [50,135,220];
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function enemiesSpeed() {
    allEnemies.forEach(function(enemy) {
        enemy.speed = getRandomArbitrary(1,2.3);
    });
}
function createEnemies () {
    for (i=0; i<3; i++) {
        var enemy = new Enemy();
        allEnemies.push(enemy);
    }
}
    createEnemies();
    enemiesSpeed();
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
function checkCollisions() {
    allEnemies.forEach(function(enemy) {
        var enemyxposition= Math.round(enemy.x);
        var playerXPosition = player.x;
        if ((player.x > enemyxposition-50) && (player.x < enemyxposition +70) 
            && (player.y == enemy.y)) {
                    starsEarned--;
                initialPlayerPosition();
                dieAlert.classList.add("die-animation");
                setTimeout(function() {
                    dieAlert.classList.remove("die-animation");
                },600)
        }
        document.getElementById("stars-number").innerHTML=starsEarned;
    })
}