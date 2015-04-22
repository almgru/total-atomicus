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
var UI = function(game, x, y, id) {
    Phaser.Sprite.call(this, game, x, y, id);

    this.alpha = 0.9;
};

UI.prototype = Object.create(Phaser.Sprite.prototype);
UI.prototype.constructor = UI;

UI.prototype.update = function() {

};

UI.prototype.createButtons = function() {
    this.buttons = [];
    this.buttons.push(this.game.add.sprite(122, 520, "launchButton"));
    this.buttons.push(this.game.add.sprite(286, 520, "missleUpgrade"));
    this.buttons.push(this.game.add.sprite(450, 520, "defenceUpgrade"));
    this.buttons.push(this.game.add.sprite(614, 520, "cityUpgrade"));
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].inputEnabled = true;
    }

    this.buttons[0].events.onInputDown.add(function () {
        if (this.game.activePlayer.isHuman()) {
            this.game.launchReady = true;
            this.game.showTargets();
            console.log("Preparing missle launch. Select target.");
        }
    }, this);
    this.buttons[1].events.onInputDown.add(function () {
        if (this.game.activePlayer.isHuman()) {
            this.game.hideTargets();
            this.game.launchReady = false;
            this.game.activePlayer.buildAttack();
            this.game.nextPlayer();
        }
    }, this);
    this.buttons[2].events.onInputDown.add(function () {
        if (this.game.activePlayer.isHuman()) {
            this.game.launchReady = false;
            this.game.hideTargets();
            this.game.activePlayer.buildDefence();
            this.game.nextPlayer();
        }
    }, this);
    this.buttons[3].events.onInputDown.add(function () {
        if (this.game.activePlayer.isHuman()) {
            this.game.launchReady = false;
            this.game.hideTargets();
            this.game.activePlayer.buildCity();
            this.game.nextPlayer();
        }
    }, this);

    this.game.add.text(102, 494, "Launch missiles", { font: "12px monospace", fill: "#fff" });
    this.game.add.text(276, 494, "Buy missiles", { font: "12px monospace", fill: "#fff" });
    this.game.add.text(427, 494, "Upgrade defences", { font: "12px monospace", fill: "#fff" });
    this.game.add.text(600, 494, "Build factory", { font: "12px monospace", fill: "#fff" });
};