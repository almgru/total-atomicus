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
        this.activePlayer
        this.player = "europe";

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
    },

    update: function() {

    },

    render: function() {

    },

    onDown: function(sprite) {
        sprite.hp--;
    }
};