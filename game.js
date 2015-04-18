Continent = function(game, x, y, path, hp) {
    Phaser.Sprite.call(this, game, x, y, path);

    this.hp = hp;
};

Continent.prototype = Object.create(Phaser.Sprite.prototype);
Continent.prototype.constructor = Continent;

Continent.prototype.update = function() {
    if (this.hp <= 0) {
        this.destroy();
    }
};

LDGame.Game = function(game) {

};

LDGame.Game.prototype = {
    preload: function() {

    },

    create: function() {
        this.ocean = this.add.sprite(0, 0, "ocean");

        this.continents = [];
        this.continents.push({name: "north america", sprite: new Continent(this, 10, 10, "land", 3)});
        this.continents.push({name: "south america", sprite: new Continent(this, 80, 300, "land", 3)});
        this.continents.push({name: "europe", sprite: new Continent(this, 400, 10, "land", 3)});
        this.continents.push({name: "africa", sprite: new Continent(this, 400, 250, "land", 3)});
        this.continents.push({name: "asia", sprite: new Continent(this, 600, 180, "land", 3)});
        for (var i = 0; i < this.continents.length; i++) {
            this.add.existing(this.continents[i].sprite);
            this.continents[i].sprite.inputEnabled = true;
            this.continents[i].sprite.events.onInputDown.add(this.onDown, this);
        }

        this.humanPlayer = "europe";
        this.activePlayer = "europe";
        this.activePlayerIndex = this.getIndexOf(this.activePlayer);
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
        if (this.activePlayer === this.humanPlayer)
            sprite.hp--;
        this.nextPlayer();
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
        this.activePlayerIndex++;
        if (this.activePlayerIndex > this.continents.length - 1) {
            this.activePlayerIndex = 0;
        }
        this.activePlayer = this.continents[this.activePlayerIndex].name;
        this.delay = this.time.now + 3000;

        console.log(this.activePlayer + "'s turn.");
    },

    makeAiAction: function() {
        var rand = Math.floor(Math.random() * this.continents.length);
        this.attack(this.continents[rand].name);
    },

    attack: function(string) {
        this.continents[this.getIndexOf(string)].sprite.hp--;
        console.log(this.activePlayer + " attacks " + string + "!");
    }
};