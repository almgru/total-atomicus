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
    this.cities = 1;
    this.text = this.game.add.text(x, y, "HP: " + this.hp + "\nAtk: " +
        this.atk + "\nCities: " + this.cities,
        {font: "14px monospace", fill: "#000", align: "center"});
    this.aggressors = [];
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
    this.hp += 1 + this.cities;
    console.log(this.name + " restores " + (1 + this.cities) + " hp!");
    this.updateText();
};

Continent.prototype.buildAttack = function() {
    this.atk += this.cities;
    console.log(this.name + " raises attack by " + this.cities + "!");
    this.updateText();
};

Continent.prototype.buildCity = function() {
    this.cities++;
    console.log(this.name + " builds a city!");
    this.updateText();
};

Continent.prototype.doAIAction = function() {
    var rand = this.game.rnd.integerInRange(0, 3);

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
    else if (rand === 2) {
        this.buildCity();
    }
    else {
        this.buildAttack();
    }
};

Continent.prototype.updateText = function() {
    this.text.setText("HP: " + this.hp + "\nAtk: " + this.atk + "\nCities: " + this.cities);
};

Continent.prototype.isHuman = function() {
    for (var i = 0; i < this.game.humanPlayers.length; i++) {
        if (this === this.game.humanPlayers[i]) {
            return true;
        }
    }
    return false;
};

Continent.prototype.addAggressor = function(attacker) {
    if (this.aggressors.indexOf(attacker) === -1) {
        this.aggressors.push({continent: attacker, hate: 1});
    } else {
        this.aggressors[this.aggressors.indexOf(attacker)].hate += 1;
    }
};
