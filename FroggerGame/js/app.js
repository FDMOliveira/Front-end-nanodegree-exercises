var records = document.getElementById("records");
starsEarned = 0;

class Character {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.speed = 1;
    }
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}
class Enemy extends Character {
    constructor(x, y, sprite) {
        super(x, y, sprite);
        this.x = -100;
        this.y = enemiesYPositions[Math.floor(Math.random() * enemiesYPositions.length)];
        this.sprite = 'images/enemy-bug.png';
        this.speed = 1;
    }
    update (dt) {
        this.x += 150 * dt * this.speed;
        if (this.x > 520) {
            this.x = -100;
            this.y = enemiesYPositions[Math.floor(Math.random() * enemiesYPositions.length)]
        }
    };
};

class Player extends Character {
    constructor(x, y, sprite) {
        super(x, y, sprite);
        this.x = 200;
        this.y = 300;
        this.sprite = 'images/char-boy.png';
        this.speed = 1;
    }
    update () {
        if ((player.y == -35)) {
            starsEarned++;
            initialPlayerPosition();
            star.classList.add("star-loaded");
            setTimeout(function() {
                star.classList.remove("star-loaded");
            }, 1000)
        }
        document.getElementById("stars-number").innerHTML = starsEarned;
    }

    handleInput (keyCode) {
        switch (keyCode) {
            case 'left':
                if (this.x > 0)
                    this.x -= 100;
                break
            case 'right':
                if (this.x < 400)
                    this.x += 100;
                break
            case 'up':
                if (this.y > -35)
                    this.y -= 85;
                break
            case 'down':
                if (this.y < 390)
                    this.y += 85;
                break
        }
    }
}

function initialPlayerPosition() {
    player.y = 390;
    player.x = 200;
}
var player = new Player();
var allEnemies = [];
var enemiesYPositions = [50, 135, 220];

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function enemiesSpeed() {
    allEnemies.forEach(function(enemy) {
        enemy.speed = getRandomArbitrary(1, 2.3);
    });
}

function createEnemies() {
    for (i = 0; i < 3; i++) {
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
        var enemyxposition = Math.round(enemy.x);
        var playerXPosition = player.x;
        if ((player.x > enemyxposition - 50) && (player.x < enemyxposition + 70) &&
            (player.y == enemy.y)) {
            starsEarned--;
            initialPlayerPosition();
            dieAlert.classList.add("die-animation");
            setTimeout(function() {
                dieAlert.classList.remove("die-animation");
            }, 600)
        }
        document.getElementById("stars-number").innerHTML = starsEarned;
    })
}