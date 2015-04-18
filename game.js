Explosion = function(game, x, y, id, lifeSpan) {
    Phaser.Sprite.call(this, game, x, y, id);

    this.killTime = this.game.time.now + lifeSpan;
};

Explosion.prototype = Object.create(Phaser.Sprite.prototype);
Explosion.prototype.constructor = Explosion;

Explosion.prototype.update = function() {
    console.log("updating..");
    if (this.game.time.name > this.killTime) {
        this.destroy();
    }
}

Continent = function(game, x, y, id, name, hp) {
    Phaser.Sprite.call(this, game, x, y, id);

    this.hp = hp;
    this.name = name;
    this.tint = 0x00ff00;
};

Continent.prototype = Object.create(Phaser.Sprite.prototype);
Continent.prototype.constructor = Continent;

Continent.prototype.update = function() {

};

LDGame.Game = function(game) {

};

LDGame.Game.prototype = {
    preload: function() {

    },

    create: function() {
        this.ocean = this.add.sprite(0, 0, "ocean");

        this.continents = [];
        this.continents.push(new Continent(this, 10, 10, "land", "north america", 3));
        this.continents.push(new Continent(this, 400, 10, "land", "europe", 3));
        this.continents.push(new Continent(this, 600, 180, "land", "asia", 3));
        this.continents.push(new Continent(this, 400, 250, "land", "africa", 3));
        this.continents.push(new Continent(this, 80, 300, "land", "south america", 3));
        for (var i = 0; i < this.continents.length; i++) {
            this.add.existing(this.continents[i]);
            this.continents[i].inputEnabled = true;
            this.continents[i].events.onInputDown.add(this.onDown, this);
        }

        this.explosions = [];

        this.humanPlayer = "europe";
        this.activePlayer = "europe";
        this.activePlayerIndex = this.getIndexOf(this.activePlayer);
        this.continents[this.activePlayerIndex].tint = 0xffff00;
    },

    update: function() {
        if (this.activePlayer !== this.humanPlayer) {
            if (this.time.now > this.delay) {
                this.makeAiAction();
                this.nextPlayer();
            }
        }
    },

    render: function() {

    },

    onDown: function(sprite) {
        if (this.activePlayer === this.humanPlayer) {
            this.attack(sprite.name);
            this.nextPlayer();
        }
    },

    getIndexOf: function(string) {
        for (var i = 0; i < this.continents.length; i++) {
            if (this.continents[i].name === string) {
                return i;
            }
        }

        return -1;
    },

    nextPlayer: function() {
        this.continents[this.activePlayerIndex].tint = 0x00ff00;

        do {
            this.activePlayerIndex++;
            if (this.activePlayerIndex > this.continents.length - 1) {
                this.activePlayerIndex = 0;
            }
            this.activePlayer = this.continents[this.activePlayerIndex].name;
        } while (this.isPlayerDead(this.activePlayer));

        this.continents[this.activePlayerIndex].tint = 0xffff00;

        this.delay = this.time.now + 3000;

        console.log(this.activePlayer + "'s turn.");
    },

    makeAiAction: function() {
        var rand = 0;

        do {
            rand = Math.floor(Math.random() * this.continents.length);
        } while (this.isPlayerDead(this.continents[rand].name)
            || this.continents[rand].name === this.activePlayer);

        this.attack(this.continents[rand].name);
    },

    attack: function(string) {
        console.log(this.activePlayer + " attacks " + string + "!");
        var continent = this.continents[this.getIndexOf(string)];
        continent.hp--;
        var explosion = new Explosion(this, continent.x, continent.y, "explosion", 200);
        this.add.existing(explosion);

        if (continent.hp <= 0) {
            console.log(this.continents[this.getIndexOf(string)].name + " is destroyed!");
            continent.dead = true;
            continent.destroy();
        }
    },

    isPlayerDead: function(string) {
        return (this.continents[this.getIndexOf(string)].dead);
    }
};