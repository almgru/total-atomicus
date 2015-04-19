"use strict";
/**
 * Created by teh_daniel_37 on 4/18/15.
 */
var Continent = function(game, x, y, id, name, hp) {
    Phaser.Sprite.call(this, game, x, y, id);

    this.hp = hp;
    this.name = name;
    this.atk = 1;
    this.cities = 1;
    this.text = this.game.add.text(x + this.width / 2, y + this.height / 2, "HP: " + this.hp + "\nAtk: " +
        this.atk + "\nCities: " + this.cities,
        {font: "14px monospace", fill: "#000", align: "center"});
    this.text.anchor.setTo(0.5, 0.5);
    this.aggressors = [];
};

Continent.prototype = Object.create(Phaser.Sprite.prototype);
Continent.prototype.constructor = Continent;

Continent.prototype.update = function() {
    this.text.bringToTop();
};

Continent.prototype.attack = function(continent) {
    console.log(this.name + " attacks " + continent.name + " for " + this.atk + " damage!");
    continent.hp -= this.atk;
    continent.addAggressor(this);
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
    var action = this.evaluateAction();
    switch (action)
    {
        case 0:
            this.attack(this.evaluateTarget());
            break;

        case 1:
            this.buildCity();
            break;

        case 2:
            this.buildAttack();
            break;

        case 3:
            this.buildDefence();
            break;
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

Continent.prototype.evaluateAction = function() {
    for (var i = 0; i < this.game.continents.length; i++) {
        if (this === this.game.continents[i]
                || this.game.continents[i].dead) {
            continue;
        } else if (this.hp <= this.game.continents[i].atk
                && this.game.rnd.integerInRange(0, 100) < 75) {
            return 3;
        } else if (this.game.continents[i].hp <= this.atk
            && this.game.rnd.integerInRange(0, 100) < 75) {
            return 0;
        }
    }

    return (this.game.rnd.integerInRange(0, 3));
};

Continent.prototype.evaluateTarget = function() {
    var hits = 0;
    var lowestHP = 100;
    var lowestHPIndex = -1;
    var highestAggression = 0;
    var aggressionIndex = -1;

    for (var i = 0; i < this.game.continents.length; i++) {
        if (this === this.game.continents[i]
                || this.game.continents[i].dead) {
            continue;
        } else if (this.game.continents[i].hp < lowestHP
                && this.game.continents[i].hp <= this.atk) {
            hits++;
            lowestHP = this.game.continents[i].hp;
            lowestHPIndex = i;
            var j;
            if ((j = this.aggressorIndexOf()) !== -1) {
                if (this.aggressors[i].hate > highestAggression) {
                    highestAggression = this.aggressors[j].hate;
                    aggressionIndex = i;
                }
            }
        }
    }

    if (hits === 1) {
        return this.game.continents[lowestHPIndex];
    } else if (hits > 1) {
        if (aggressionIndex !== -1) {
            return this.game.continents[aggressionIndex];
        } else {
            return this.selectRandomTarget();
        }
    } else {
        return this.selectRandomTarget();
    }
};

Continent.prototype.selectRandomTarget = function() {
    do {
        var rand = this.game.rnd.integerInRange(0, this.game.continents.length - 1);
    } while (this.game.continents[rand].dead
    || this.game.continents[rand] === this);

    return (this.game.continents[rand]);
};

Continent.prototype.aggressorIndexOf = function(continent) {

    for (var j = 0; j < this.aggressors.length; j++) {
        if (continent === this.aggressors[j].continent) {
            return j;
        }
    }

    return -1;
};
