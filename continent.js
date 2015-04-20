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
    this.aggressors = [];
    this.target = this.game.add.sprite(x + this.width / 2, y + this.height / 2, "target");
    this.target.anchor.setTo(0.5, 0.5);
    this.target.visible = false;
    this.targetCoordinates;
    this.missileToLaunch = 0;
    this.activeMissiles = [];
    this.deadMissiles = [];
    this.missileDelay = 50;
    this.missileLaunchTime = 0;
};

Continent.prototype = Object.create(Phaser.Sprite.prototype);
Continent.prototype.constructor = Continent;

Continent.prototype.update = function() {
    this.textbg.bringToTop();
    this.text.bringToTop();
    this.target.bringToTop();
    if (this.upgradeText !== undefined)
        this.upgradeText.bringToTop();
    this.turnBorder.bringToTop();

    //if (this.missileToLaunch > 0
    //        && this.game.time.now > this.missileLaunchTime) {
    //    var x = this.targetCoordinates.x + this.game.rnd.integerInRange(-25, 25);
    //    var y = this.targetCoordinates.y + this.game.rnd.integerInRange(-25, 25);
    //
    //    this.missileToLaunch--;
    //    this.missileLaunchTime = this.game.time.now + this.missileDelay;
    //    this.activeMissiles.push(this.game.add.sprite(new Missile(this.game,
    //        this.x + this.width / 2, this.y + this.height / 2, "missile", x, y)));
    //}
    //
    //for (var i = 0; i < this.activeMissiles.length; i++) {
    //    if (this.activeMissiles[i].isKilled) {
    //        this.deadMissiles.push(this.activeMissiles[i]);
    //    }
    //}
    //
    //for (var i = 0; i < this.deadMissiles.length; i++) {
    //    this.activeMissiles.splice(i, 1);
    //    this.deadMissiles[i].destroy();
    //}
    //
    //this.deadMissiles = [];
};

Continent.prototype.attack = function(continent) {
    if (this.isHuman()) {
        this.readyMissiles(this.game.input.activePointer.x, this.game.input.activePointer.y);
    }
    else {
        this.readyMissiles(this.targetCoordinates.x, this.targetCoordinates.y);
    }
    console.log(this.name + " attacks " + continent.name + " for " + this.atk + " damage!");
    continent.hp -= this.atk;
    continent.addAggressor(this);
    continent.updateText();
    var explosion = new Explosion(this.game, continent.x + continent.width / 2, continent.y + continent.height / 2, "explosion", 200);
    this.game.add.existing(explosion);

    if (continent.hp <= 0) {
        console.log(continent.name + " is destroyed!");
        continent.dead = true;
        continent.text.destroy();
        continent.textbg.destroy();
        continent.target.destroy();
        continent.turnBorder.destroy();
        continent.destroy();
    }
};

Continent.prototype.buildDefence = function() {
    this.upgradeText = this.game.add.text(this.textbg.x + 60, this.textbg.y + 32, "+" + (1 + this.cities),
        {font: "14px monospace", fill: "#0F0", align: "left"});
    this.upgradeText.lifespan = 1500;
    this.hp += 1 + this.cities;
    console.log(this.name + " restores " + (1 + this.cities) + " hp!");
    this.updateText();
};

Continent.prototype.buildAttack = function() {
    this.upgradeText = this.game.add.text(this.textbg.x + 70, this.textbg.y + 56, "+" + Math.round(this.cities / 2),
        {font: "14px monospace", fill: "#0F0", align: "left"});
    this.upgradeText.lifespan = 1500;
    this.atk += Math.round(this.cities / 2);
    console.log(this.name + " raises attack by " + this.cities + "!");
    this.updateText();
};

Continent.prototype.buildCity = function() {
    this.upgradeText = this.game.add.text(this.textbg.x + 90, this.textbg.y + 79, "+1",
        {font: "14px monospace", fill: "#0F0", align: "left"});
    this.upgradeText.lifespan = 1500;
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
    this.text.setText(this.name + "\nHP: " + this.hp + "\nAtk: " + this.atk + "\nCities: " + this.cities);
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

Continent.prototype.readyMissiles = function(targetX, targetY) {
    this.targetCoordinates = {x: targetX, y: targetY};
    this.missileToLaunch = this.atk;
};

Continent.prototype.setInfo = function(offSetX, offSetY) {
    this.textbg = this.game.add.sprite(this.x + offSetX, this.y + offSetY, "textbg");
    this.textbg.alpha = 0.75;
    this.textbg.scale = new Phaser.Point(0.85, 0.7);
    this.text = this.game.add.text(this.x + 10 + offSetX, this.y + 10 + offSetY, this.name + "\nHP: " + this.hp + "\nAtk: " +
        this.atk + "\nCities: " + this.cities,
        {font: "14px monospace", fill: "#000", align: "left"});
    this.turnBorder = this.game.add.sprite(this.textbg.x, this.textbg.y, "turnborder");
    this.turnBorder.scale = new Phaser.Point(0.85, 0.7);
    this.turnBorder.visible = false;
};
