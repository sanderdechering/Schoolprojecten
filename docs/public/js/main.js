"use strict";
var BattleMenu = (function () {
    function BattleMenu(player) {
        this.buttons = [];
        this.i = 0;
        this.x = 30;
        this.y = window.innerHeight - 170;
        this.player = player;
        this.movepoolInterface = new Sprite(0, window.innerHeight - 200, 0, 0, window.innerWidth - 10, 190, "#fff", "bar");
        this.movepoolInterface.draw();
        this.movepoolInterface.div.style.border = "5px solid red";
        for (this.i = 0; this.i < 4; this.i++) {
            if (this.i == 2) {
                this.y = this.y + 100;
                this.x = 30;
            }
            this.buttons.push(new Sprite(this.x, this.y, 0, 0, window.innerWidth / 3, 50, "#2dff72", "button"));
            this.buttons[this.i].draw();
            if (this.player.movepool[this.i] != "...") {
                this.buttons[this.i].div.innerHTML = this.player.movepool[this.i][1];
                this.buttons[this.i].div.id = this.player.movepool[this.i][0];
            }
            else {
                this.buttons[this.i].div.innerHTML = "...";
                this.buttons[this.i].div.id = "-";
            }
            this.buttons[this.i].div.style.fontSize = "25px";
            this.x = this.x + window.innerWidth / 2;
            this.buttons[0].div.focus();
        }
    }
    return BattleMenu;
}());
var Database = (function () {
    function Database() {
        this.moves = [
            [0, "Scratch", "40"],
            [1, "Pound", "40"],
            [2, "Tackle", "40"],
            [3, "Mudshot", "60"],
            [4, "Takedown", "70"],
            [5, "Surf", "90"],
            [6, "Earthquake", "150"],
            [7, "Growl", "-10"],
            [8, "Swagger", "-20"],
            [9, "Scaryface", "-30"]
        ];
    }
    Database.prototype.getMove = function (id) {
        return this.moves[id];
    };
    return Database;
}());
var Hero = (function () {
    function Hero(url) {
        var _this = this;
        this.keyObjects = new Array(255);
        this.hero = new Sprite(window.innerWidth / 2, 200, 0, 0, 60, 80, url, "hero");
        this.hero.draw();
        for (var i = 0; i < this.keyObjects.length; i++) {
            this.keyObjects[i] = false;
        }
        document.addEventListener('keydown', function (event) { return _this.keyDownHandeler(event); });
        document.addEventListener('keyup', function (event) { return _this.keyUpHandeler(event); });
    }
    Hero.prototype.keyDownHandeler = function (event) {
        this.keyObjects[event.keyCode] = true;
    };
    Hero.prototype.keyUpHandeler = function (event) {
        this.keyObjects[event.keyCode] = false;
    };
    Hero.prototype.getRectangle = function () {
        return this.hero.div.getBoundingClientRect();
    };
    Hero.prototype.update = function () {
        this.hero.div.style.transform = "translate(" + this.hero.X + "px, " + this.hero.Y + "px)";
        if (this.hero.X < window.innerWidth - 40) {
            if (this.keyObjects[39] == true && this.keyObjects[37] == false && this.keyObjects[38] == false && this.keyObjects[40] == false) {
                this.hero.speedX = 30;
                this.hero.update();
                this.hero.speedX = 0;
            }
        }
        if (this.hero.X > 0) {
            if (this.keyObjects[37] == true && this.keyObjects[39] == false && this.keyObjects[38] == false && this.keyObjects[40] == false) {
                this.hero.speedX = -30;
                this.hero.update();
                this.hero.speedX = 0;
            }
        }
        if (this.hero.Y < window.innerHeight - 40) {
            if (this.keyObjects[40] == true && this.keyObjects[39] == false && this.keyObjects[38] == false && this.keyObjects[37] == false) {
                this.hero.speedY = 30;
                this.hero.update();
                this.hero.speedY = 0;
            }
        }
        if (this.hero.Y > 0) {
            if (this.keyObjects[38] == true && this.keyObjects[39] == false && this.keyObjects[40] == false && this.keyObjects[37] == false) {
                this.hero.speedY = -30;
                this.hero.update();
                this.hero.speedY = 0;
            }
        }
    };
    return Hero;
}());
var Pokemon = (function () {
    function Pokemon(health, side, pokemonName) {
        this.health = health;
        this.side = side;
        this.pokemonName = pokemonName;
        this.db = new Database();
        this.reducedDamage = 0;
        this.movepool = [];
        if (this.side == "enemy") {
            this.sprite = new Sprite(window.innerWidth - 250, 20, 0, 0, 150, 150, "../assets/img/pokemons/" + this.pokemonName + ".png", "enemy");
        }
        else {
            this.sprite = new Sprite(150, window.innerHeight - 350, 0, 0, 150, 150, "../assets/img/pokemons/" + this.pokemonName + ".png", "hero");
        }
        if (this.pokemonName == "torchic") {
            this.movepool.push(this.db.moves[0], this.db.moves[7], "...", "...");
        }
        if (this.pokemonName == "treeko") {
            this.movepool.push(this.db.moves[1], this.db.moves[7], "...", "...");
        }
        if (this.pokemonName == "swampert") {
            this.movepool.push(this.db.moves[6], this.db.moves[3], this.db.moves[4], this.db.moves[5]);
        }
        if (this.pokemonName == "poochyena") {
            this.movepool.push(this.db.moves[0], this.db.moves[7], "...", "...");
        }
        if (this.pokemonName == "mightyena") {
            this.movepool.push(this.db.moves[0], this.db.moves[4], this.db.moves[8], this.db.moves[7]);
        }
    }
    Pokemon.prototype.draw = function () {
        this.sprite.draw();
    };
    Pokemon.prototype.reduceDamage = function (numb) {
        this.reducedDamage = this.reducedDamage + numb;
    };
    return Pokemon;
}());
var Sprite = (function () {
    function Sprite(X, Y, speedX, speedY, width, height, url, name) {
        this.X = X;
        this.Y = Y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.width = width;
        this.height = height;
        this.url = url;
        this.name = name;
        this.div = document.createElement("" + this.name + "");
    }
    Sprite.prototype.update = function () {
        this.X += this.speedX;
        this.Y += this.speedY;
    };
    Sprite.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Sprite.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.X + "px, " + this.Y + "px)";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        if (this.url.charAt(0) == '.') {
            this.div.style.backgroundImage = "url(" + this.url + ")";
        }
        if (this.url.charAt(0) == '#') {
            this.div.style.backgroundColor = "" + this.url + "";
        }
        if (this.url == '') {
        }
        document.body.appendChild(this.div);
    };
    return Sprite;
}());
var Battle = (function () {
    function Battle(g) {
        var _this = this;
        this.f = 0;
        this.keyObjects = new Array(255);
        this.keyObjectTimer = 0;
        this.playerTurn = true;
        this.enemyTurn = false;
        this.game = g;
        this.player = new Pokemon(40, "hero", "torchic");
        this.playerStatus = new Sprite(window.innerWidth - 500, window.innerWidth - 550, 0, 0, 430, 55, "#fff", "playerStatus");
        this.playerHealth = new Sprite(window.innerWidth - 450, window.innerWidth - 520, 0, 0, 400, 30, "#03ff00", "playerHealth");
        this.enemy = new Pokemon(40, "enemy", "poochyena");
        this.enemyStatus = new Sprite(20, 20, 0, 0, 430, 55, "#fff", "playerStatus");
        this.enemyHealth = new Sprite(70, 50, 0, 0, 400, 30, "#03ff00", "enemyHealth");
        this.battleMenu = new BattleMenu(this.player);
        this.db = new Database();
        this.playerStatus.draw();
        this.player.draw();
        this.playerHealth.draw();
        this.enemyStatus.draw();
        this.enemy.draw();
        this.enemyHealth.draw();
        this.playerStatus.div.innerHTML = this.player.pokemonName;
        this.playerStatus.div.style.padding = "10px";
        this.enemyStatus.div.innerHTML = this.enemy.pokemonName;
        this.enemyStatus.div.style.padding = "10px";
        document.addEventListener('keyup', function (event) { return _this.keyUpHandeler(event); });
        document.addEventListener('keydown', function (event) { return _this.keyDownHandeler(event); });
    }
    Battle.prototype.update = function () {
        if (this.playerTurn == true) {
            this.keyObjectTimer++;
            if (this.keyObjectTimer > 10) {
                this.highlightButtons();
                if (this.keyObjects[32] == true) {
                    this.attackPlayer();
                }
                this.keyObjectTimer = 0;
            }
        }
        if (this.enemyTurn == true) {
            this.attackEnemy();
        }
        if (this.playerHealth.div.offsetWidth == 0) {
            this.game.gameOver();
        }
        if (this.enemyHealth.div.offsetWidth == 0) {
            this.game.victory();
        }
    };
    Battle.prototype.attackPlayer = function () {
        if (document.activeElement.id != "-") {
            var moveData = this.db.getMove(document.activeElement.id);
            if (moveData[2].charAt(0) == "-") {
                if (this.enemy.reducedDamage < 60) {
                    this.enemy.reducedDamage = this.enemy.reducedDamage + Number(moveData[2].substr(1));
                    this.playerTurn = false;
                    this.enemyTurn = true;
                }
                else {
                    this.playerTurn = false;
                    this.enemyTurn = true;
                }
            }
            else {
                this.enemyHealth.div.style.width = (this.enemyHealth.div.offsetWidth - moveData[2] + this.player.reducedDamage) + "px";
                this.playerTurn = false;
                this.enemyTurn = true;
            }
        }
    };
    Battle.prototype.attackEnemy = function () {
        var randomNumber = Math.floor(Math.random() * 4);
        var moveData = this.enemy.movepool[randomNumber];
        if (moveData != "...") {
            if (moveData[2].charAt(0) == "-") {
                if (this.player.reducedDamage < 20) {
                    this.player.reducedDamage = this.player.reducedDamage + Number(moveData[2].substr(1));
                    this.playerTurn = true;
                    this.enemyTurn = false;
                }
                else {
                    this.playerTurn = true;
                    this.enemyTurn = false;
                }
            }
            else {
                this.playerHealth.div.style.width = (this.playerHealth.div.offsetWidth - moveData[2] + this.enemy.reducedDamage) + "px";
                this.playerTurn = true;
                this.enemyTurn = false;
            }
        }
        else {
            this.attackEnemy();
        }
    };
    Battle.prototype.keyDownHandeler = function (event) {
        this.keyObjects[event.keyCode] = true;
    };
    Battle.prototype.keyUpHandeler = function (event) {
        this.keyObjects[event.keyCode] = false;
    };
    Battle.prototype.highlightButtons = function () {
        if (this.keyObjects[38] == true) {
            this.f--;
            if (this.f < 0) {
                this.f = this.battleMenu.buttons.length - 1;
            }
            this.battleMenu.buttons[this.f].div.focus();
            this.keyObjectTimer = 0;
        }
        if (this.keyObjects[40] == true) {
            this.f++;
            if (this.f == this.battleMenu.buttons.length) {
                this.f = 0;
            }
            this.battleMenu.buttons[this.f].div.focus();
            this.keyObjectTimer = 0;
        }
    };
    return Battle;
}());
var Game = (function () {
    function Game() {
        this.currentscreen = new Victory(this);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.currentscreen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.Menu = function () {
        document.body.innerHTML = "";
        this.currentscreen = new Menu(this);
    };
    Game.prototype.Level_1 = function () {
        document.body.innerHTML = "";
        this.currentscreen = new Level_1(this);
    };
    Game.prototype.Battle = function () {
        document.body.innerHTML = "";
        this.currentscreen = new Battle(this);
    };
    Game.prototype.gameOver = function () {
        document.body.innerHTML = "";
        this.currentscreen = new gameOver(this);
    };
    Game.prototype.victory = function () {
        document.body.innerHTML = "";
        this.currentscreen = new Victory(this);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var gameOver = (function () {
    function gameOver(g) {
        var _this = this;
        this.keyObjects = new Array(255);
        this.game = g;
        this.wallpaper = new Sprite(0, 0, 0, 0, window.innerWidth, window.innerHeight, "../assets/img/background_gameOver.jpg", "background");
        this.wallpaper.draw();
        document.addEventListener('keyup', function (event) { return _this.keyUpHandeler(event); });
        document.addEventListener('keydown', function (event) { return _this.keyDownHandeler(event); });
    }
    gameOver.prototype.update = function () {
        if (this.keyObjects[32] == true) {
            this.game.Menu();
        }
    };
    gameOver.prototype.keyDownHandeler = function (event) {
        this.keyObjects[event.keyCode] = true;
    };
    gameOver.prototype.keyUpHandeler = function (event) {
        this.keyObjects[event.keyCode] = false;
    };
    return gameOver;
}());
var Level_1 = (function () {
    function Level_1(g) {
        this.prevX = 0;
        this.prevY = 0;
        this.currX = 0;
        this.currY = 0;
        this.collision = false;
        this.collision_left = false;
        this.collision_right = false;
        this.collision_top = false;
        this.collision_bottom = false;
        this.song_timer = 0;
        this.song_volume = 0;
        this.song = new Audio("../assets/sound/Littleroot.mp3");
        this.game = g;
        this.background = new Sprite(0, 0, 0, 0, window.innerWidth, window.innerHeight, "../assets/img/background_level_1.png", "background_level_1");
        this.bush = new Sprite(0, 570, 0, 0, window.innerWidth, 200, "#fff", "bush");
        this.background.draw();
        this.bush.draw();
        this.hero = new Hero("../assets/img/hero.png");
        this.treeGroup_1 = new Sprite(0, 0, 0, 0, 400, 425, "../assets/img/tree_group.png", "tree");
        this.treeGroup_2 = new Sprite(625, 0, 0, 0, 400, 425, "../assets/img/tree_group.png", "tree");
        this.treeGroup_1.draw();
        this.treeGroup_2.draw();
        this.move_timer = 0;
        this.song.volume = 0;
        this.song.play();
    }
    Level_1.prototype.update = function () {
        this.move_timer++;
        this.prevX = this.hero.hero.X;
        this.prevY = this.hero.hero.Y;
        if (this.move_timer > 10) {
            this.hero.update();
            this.move_timer = 0;
        }
        this.currX = this.hero.hero.X;
        this.currY = this.hero.hero.Y;
        if (this.prevX != this.currX || this.prevY != this.currY) {
            if (this.checkCollision(this.hero.getRectangle(), this.bush.getRectangle())) {
                if (Math.floor(Math.random() * 10) == 4) {
                    this.game.Battle();
                }
            }
        }
        this.collision_left = this.checkCollisionLeft(this.hero.getRectangle(), this.treeGroup_1.getRectangle());
        this.collision_right = this.checkCollisionRight(this.hero.getRectangle(), this.treeGroup_2.getRectangle());
        this.collision_bottom = this.checkCollisionBottom(this.hero.getRectangle(), this.treeGroup_1.getRectangle());
        this.collision = this.checkCollision(this.hero.getRectangle(), this.treeGroup_1.getRectangle());
        if (this.hero.hero.Y <= this.treeGroup_1.height) {
            if (this.collision_left == true) {
                this.hero.hero.X = this.hero.hero.X + 3;
            }
            if (this.collision_right == true) {
                this.hero.hero.X = this.hero.hero.X - 3;
            }
        }
        if (this.hero.hero.X <= this.treeGroup_1.width) {
            if (this.collision_bottom == true) {
                this.hero.hero.Y = this.hero.hero.Y + 3;
            }
        }
        if (this.song.volume < 0.8 && this.song_timer > 100) {
            this.song_timer = 0;
            this.song_volume = this.song_volume + 0.1;
            this.song.volume = this.song_volume;
        }
    };
    Level_1.prototype.checkCollisionLeft = function (hero, tree) {
        if (hero.top <= tree.bottom) {
            return (hero.left <= tree.right);
        }
        else {
            return false;
        }
    };
    Level_1.prototype.checkCollisionRight = function (hero, tree) {
        if (hero.top <= tree.bottom) {
            return (hero.right >= tree.left);
        }
        else {
            return false;
        }
    };
    Level_1.prototype.checkCollisionBottom = function (hero, tree) {
        if (hero.left <= tree.right) {
            return (hero.top <= tree.bottom);
        }
        else {
            return false;
        }
    };
    Level_1.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return Level_1;
}());
var Menu = (function () {
    function Menu(g) {
        var _this = this;
        this.keyObjects = new Array(255);
        this.song = new Audio("../assets/sound/Theme.mp3");
        this.timer = 0;
        this.volume = 0;
        this.game = g;
        this.background = new Sprite(0, 0, 0, 0, innerWidth, innerHeight, "../assets/img/background.png", "background");
        this.startGameButton = new Sprite(innerWidth / 2 - 300, innerHeight / 2 - 85, 0, 0, 600, 100, "", "h2");
        this.startGameButton.div.innerHTML = "Press Spacebar";
        this.startGameButton.div.style.textAlign = "center";
        this.background.div.classList.add("wow");
        this.background.div.classList.add("fadeIn");
        this.background.div.setAttribute("data-wow-duration", "4s");
        this.startGameButton.div.classList.add("wow");
        this.startGameButton.div.classList.add("fadeIn");
        this.startGameButton.div.setAttribute("data-wow-duration", "4s");
        this.song.volume = 0;
        this.song.play();
        for (var i = 0; i < this.keyObjects.length; i++) {
            this.keyObjects[i] = false;
        }
        this.background.draw();
        this.startGameButton.draw();
        document.addEventListener('keydown', function (event) { return _this.keyDownHandeler(event); });
    }
    Menu.prototype.keyDownHandeler = function (event) {
        this.keyObjects[event.keyCode] = true;
    };
    Menu.prototype.update = function () {
        this.timer++;
        if (this.keyObjects[32] == true) {
            this.background.div.classList.remove("fadeIn");
            this.background.div.classList.add("fadeOut");
            this.song.pause();
            this.game.Level_1();
        }
        else {
            if (this.song.volume < 0.3 && this.timer > 100) {
                this.timer = 0;
                this.volume = this.volume + 0;
                this.song.volume = this.volume;
                console.log("test");
            }
        }
    };
    return Menu;
}());
var Victory = (function () {
    function Victory(g) {
        var _this = this;
        this.keyObjects = new Array(255);
        this.game = g;
        this.wallpaper = new Sprite(0, 0, 0, 0, window.innerWidth, window.innerHeight, "../assets/img/background_victory.png", "background");
        this.wallpaper.draw();
        document.addEventListener('keyup', function (event) { return _this.keyUpHandeler(event); });
        document.addEventListener('keydown', function (event) { return _this.keyDownHandeler(event); });
    }
    Victory.prototype.update = function () {
        if (this.keyObjects[32] == true) {
            this.game.Menu();
        }
    };
    Victory.prototype.keyDownHandeler = function (event) {
        this.keyObjects[event.keyCode] = true;
    };
    Victory.prototype.keyUpHandeler = function (event) {
        this.keyObjects[event.keyCode] = false;
    };
    return Victory;
}());
//# sourceMappingURL=main.js.map