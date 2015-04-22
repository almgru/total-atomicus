"use strict";
/**
 * Copyright 2015 Daniel Alm Grundström
 *
 * This file is part of Total Atomicus
 *
 * Total Atomicus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Total Atomicus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Total Atomicus. If not, see http://www.gnu.org/licenses/.
 */

var Continent = function(game, x, y, id, name, hp) {
    Phaser.Sprite.call(this, game, x, y, id);

    this.hp = hp;
    this.name = name;
    this.atk = 1;
    this.factories = 1;
    this.aggressors = [];
    this.target = this.game.add.sprite(x + this.width / 2, y + this.height / 2, "target");
    this.target.inputEnabled = true;
    this.target.events.onInputDown.add(this.onDown, this.game);
    this.target.anchor.setTo(0.5, 0.5);
    this.target.visible = false;
    this.targetCoordinates;
    this.explosionSound = this.game.add.audio("explosion");
    this.powerUpSound = this.game.add.audio("powerup");
};

Continent.prototype = Object.create(Phaser.Sprite.prototype);
Continent.prototype.constructor = Continent;

Continent.prototype.update = function() {
    if (!this.game.hasWon) {
        this.textbg.bringToTop();
        this.defenceText.bringToTop();
        this.missileText.bringToTop();
        this.factoryText.bringToTop();
        this.target.bringToTop();
        this.turnBorder.bringToTop();
        if (this.upgradeText !== undefined)
            this.upgradeText.bringToTop();
    }
};

Continent.prototype.attack = function(continent) {
    console.log(this.name + " attacks " + continent.name + " for " + this.atk + " damage!");
    continent.upgradeText = this.game.add.text(continent.textbg.x + 85, continent.textbg.y + 13, "-" + this.atk,
        {font: "22px monospace", fill: "#f00", align: "left"});
    continent.upgradeText.lifespan = 1500;
    continent.hp -= this.atk;
    continent.addAggressor(this);
    continent.updateText();

    if (this.game.game.playAudio) {
        this.explosionSound.play();
    }

    for (var i = 0; i < this.atk; i++) {
        var x = continent.x + continent.width / 2 + this.game.rnd.integerInRange(-50, 50);
        var y = continent.y + continent.height / 2 + this.game.rnd.integerInRange(-50, 50);
        var explosion = this.game.add.sprite(x, y, "explosion");
        explosion.lifespan = 600;
        explosion.animations.add("explode");
        explosion.anchor.setTo(0.5, 0.5);
        explosion.animations.play("explode", 10, false);
    }

    if (continent.hp <= 0) {
        continent.onDead(this);
    }
};

Continent.prototype.buildDefence = function() {
    this.upgradeText = this.game.add.text(this.textbg.x + 85, this.textbg.y + 13, "+" + this.factories,
        {font: "22px monospace", fill: "#0F0", align: "left"});
    this.upgradeText.lifespan = 1500;
    this.hp += this.factories;
    console.log(this.name + " restores " + this.factories + " shelters!");
    this.updateText();
    if (this.game.game.playAudio) {
        this.powerUpSound.play();
    }
};

Continent.prototype.buildAttack = function() {
    this.upgradeText = this.game.add.text(this.textbg.x + 85, this.textbg.y + 53, "+" + Math.round(this.factories / 2),
        {font: "22px monospace", fill: "#0F0", align: "left"});
    this.upgradeText.lifespan = 1500;
    this.atk += Math.round(this.factories / 2);
    console.log(this.name + " builds " + this.factories + " missiles!");
    this.updateText();
    if (this.game.game.playAudio) {
        this.powerUpSound.play();
    }
};

Continent.prototype.buildCity = function() {
    this.upgradeText = this.game.add.text(this.textbg.x + 85, this.textbg.y + 93, "+1",
        {font: "22px monospace", fill: "#0F0", align: "left"});
    this.upgradeText.lifespan = 1500;
    this.factories++;
    console.log(this.name + " builds a factory!");
    this.updateText();
    if (this.game.game.playAudio) {
        this.powerUpSound.play();
    }
};

Continent.prototype.doAIAction = function() {
    var action = this.evaluateAction();
    switch (action)
    {
        case 0:
        case 4:
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
    this.defenceText.setText(this.hp);
    this.missileText.setText(this.atk);
    this.factoryText.setText(this.factories);
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
        } else if (this.game.continents[i].hp <= this.atk
            && this.game.rnd.integerInRange(0, 100) < 80) {
            return 0;
        } else if (this.hp <= this.game.continents[i].atk
                && this.game.rnd.integerInRange(0, 100) < 80) {
            return 3;
        }
    }

    return (this.game.rnd.integerInRange(0, 4));
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
        var cont = this.game.continents[lowestHPIndex];
        this.targetCoordinates = {x: cont.x + cont.width / 2, y: cont.x + cont.height / 2};
        return cont;
    } else if (hits > 1) {
        if (aggressionIndex !== -1) {
            var cont = this.game.continents[aggressionIndex];
            this.targetCoordinates = {x: cont.x + cont.width / 2, y: cont.x + cont.height / 2};
            return cont;
        } else {
            var cont = this.selectRandomTarget();
            this.targetCoordinates = {x: cont.x + cont.width / 2, y: cont.x + cont.height / 2};
            return cont;
        }
    } else {
        var cont = this.selectRandomTarget();
        this.targetCoordinates = {x: cont.x + cont.width / 2, y: cont.x + cont.height / 2};
        return cont;
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

Continent.prototype.setInfo = function(offSetX, offSetY) {
    this.textbg = this.game.add.sprite(this.x + offSetX, this.y + offSetY, "textbg");
    this.textbg.alpha = 0.75;
    this.defenceText = this.game.add.text(this.x + 60 + offSetX, this.y + 13 + offSetY, this.hp,
        {font: "22px monospace", fill: "#000", align: "left"});
    this.missileText = this.game.add.text(this.x + 60 + offSetX, this.y + 53 + offSetY, this.atk,
        {font: "22px monospace", fill: "#000", align: "left"});
    this.factoryText = this.game.add.text(this.x + 60 + offSetX, this.y + 93 + offSetY, this.factories,
        {font: "22px monospace", fill: "#000", align: "left"});
    this.turnBorder = this.game.add.sprite(this.textbg.x, this.textbg.y, "turnborder");
    this.turnBorder.visible = false;
};

Continent.prototype.onDead = function(attacker) {
    attacker.factories += 2;
    attacker.upgradeText = this.game.add.text(attacker.textbg.x + 85, attacker.textbg.y + 93, "+2",
        {font: "22px monospace", fill: "#0F0", align: "left"});
    attacker.upgradeText.lifespan = 1500;
    attacker.updateText();
    console.log(this.name + " is destroyed!");
    if (this.isHuman()) {
        this.game.deadHumanPlayers++;
    }
    this.dead = true;
    this.upgradeText.destroy();
    this.defenceText.destroy();
    this.missileText.destroy();
    this.factoryText.destroy();
    this.textbg.destroy();
    this.target.destroy();
    this.turnBorder.destroy();
    this.destroy();
};

Continent.prototype.onDown = function(sprite) {
    if (this.activePlayer.isHuman()
            && this.launchReady
            && sprite !== this.activePlayer.target) {
        console.log("hello");
        this.activePlayer.attack(this.getTargetParent(sprite));
        this.hideTargets();
        this.launchReady = false;
        this.nextPlayer();
    }
};
