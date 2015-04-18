"use strict";
/**
 * Created by teh_daniel_37 on 4/18/15.
 */
var Continent = function(game, x, y, id, name, hp) {
    Phaser.Sprite.call(this, game, x, y, id);

    this.hp = hp;
    this.name = name;
    this.tint = 0x00ff00;
};

Continent.prototype = Object.create(Phaser.Sprite.prototype);
Continent.prototype.constructor = Continent;

Continent.prototype.update = function() {

};

Continent.prototype.attack = function(string) {
    console.log(this.name + " attacks " + string + "!");
    var continent = this.game.continents[this.game.getIndexOf(string)];
    continent.hp--;
    var explosion = new Explosion(this.game, continent.x, continent.y, "explosion", 200);
    this.game.add.existing(explosion);

    if (continent.hp <= 0) {
        console.log(continent.name + " is destroyed!");
        continent.dead = true;
        continent.destroy();
    }
};

Continent.prototype.doAIAction = function() {
    var rand = 0;

    do {
        rand = Math.floor(Math.random() * this.game.continents.length);
    } while (this.game.continents[rand].dead
        || this.game.continents[rand] === this);

    this.attack(this.game.continents[rand].name);
};
