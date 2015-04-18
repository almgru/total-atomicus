"use strict";
/**
 * Created by teh_daniel_37 on 4/18/15.
 */
var Continent = function(game, x, y, id, name, hp) {
    Phaser.Sprite.call(this, game, x, y, id);

    this.hp = hp;
    this.name = name;
    this.tint = 0x00ff00;
    this.atk = 1;
    this.text = this.game.add.text(x, y, "HP: " + this.hp + "\nAtk: " + this.atk,
        {font: "14px monospace", fill: "#000", align: "left"});
};

Continent.prototype = Object.create(Phaser.Sprite.prototype);
Continent.prototype.constructor = Continent;

Continent.prototype.update = function() {
    this.text.bringToTop();
};

Continent.prototype.attack = function(string) {
    console.log(this.name + " attacks " + string + " for " + this.atk + " damage!");
    var continent = this.game.continents[this.game.getIndexOf(string)];
    continent.hp -= this.atk;
    continent.updateText();
    var explosion = new Explosion(this.game, continent.x, continent.y, "explosion", 200);
    this.game.add.existing(explosion);

    if (continent.hp <= 0) {
        console.log(continent.name + " is destroyed!");
        continent.dead = true;
        continent.destroy();
    }
};

Continent.prototype.buildDefence = function() {
    this.hp += 2;
    console.log(this.name + " restores 2 hp! It now has " + this.hp + "!");
    this.updateText();
};

Continent.prototype.buildAttack = function() {
    this.atk += 1;
    console.log(this.name + " raises attack by 1 to " + this.atk + "!");
    this.updateText();
};

Continent.prototype.doAIAction = function() {
    var rand = this.game.rnd.integerInRange(0, 2);

    if (rand === 0) {
        do {
            rand = this.game.rnd.integerInRange(0, this.game.continents.length - 1);
        } while (this.game.continents[rand].dead
        || this.game.continents[rand] === this);

        this.attack(this.game.continents[rand].name);
    }
    else if (rand === 1) {
        this.buildDefence();
    }
    else {
        this.buildAttack();
    }
};

Continent.prototype.updateText = function() {
    this.text.setText("HP: " + this.hp + "\nAtk: " + this.atk);
};