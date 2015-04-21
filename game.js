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

LDGame.Game = function(game) {

};

LDGame.Game.prototype = {
    preload: function() {

    },

    create: function() {
        this.ocean = this.add.sprite(0, 0, "ocean");
        this.add.sprite(0, 500, "ui_bar").tint = 0x808080;

        this.add.text(105, 500, "Launch missile", { font: "12px monospace", fill: "#fff" });
        this.add.text(286, 500, "Upgrade attack", { font: "12px monospace", fill: "#fff" });
        this.add.text(450, 500, "Restore defences", { font: "12px monospace", fill: "#fff" });
        this.add.text(614, 500, "Build factory", { font: "12px monospace", fill: "#fff" });

        this.launchReady = false;

        this.continents = [];
        this.continents.push(new Continent(this, 10, 50, "northamericaimg", "North America", 3));
        this.continents[0].setInfo(-10, -50);
        this.continents.push(new Continent(this, 400, 50, "europeimg", "Europe", 3));
        this.continents[1].setInfo(-50, -50);
        this.continents.push(new Continent(this, 509, 50, "asiaimg", "Asia", 3));
        this.continents[2].setInfo(120, 150);
        this.continents.push(new Continent(this, 346, 216, "africaimg", "Africa", 3));
        this.continents[3].setInfo(-50, 75);
        this.continents.push(new Continent(this, 160, 250, "southamericaimg", "South America", 3));
        this.continents[4].setInfo(-120, 50);
        for (var i = 0; i < this.continents.length; i++) {
            this.add.existing(this.continents[i]);
        }

        this.buttons = [];
        this.buttons.push(this.add.sprite(122, 520, "launchButton"));
        this.buttons.push(this.add.sprite(286, 520, "missleUpgrade"));
        this.buttons.push(this.add.sprite(450, 520, "defenceUpgrade"));
        this.buttons.push(this.add.sprite(614, 520, "cityUpgrade"));
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].inputEnabled = true;
        }

        this.buttons[0].events.onInputDown.add(function () {
            if (this.activePlayer.isHuman()) {
                this.launchReady = true;
                this.showTargets();
                console.log("Preparing missle launch. Select target.");
            }
        }, this);
        this.buttons[1].events.onInputDown.add(function () {
            if (this.activePlayer.isHuman()) {
                this.hideTargets();
                this.launchReady = false;
                this.activePlayer.buildAttack();
                this.nextPlayer();
            }
        }, this);
        this.buttons[2].events.onInputDown.add(function () {
            if (this.activePlayer.isHuman()) {
                this.launchReady = false;
                this.hideTargets();
                this.activePlayer.buildDefence();
                this.nextPlayer();
            }
        }, this);
        this.buttons[3].events.onInputDown.add(function () {
            if (this.activePlayer.isHuman()) {
                this.launchReady = false;
                this.hideTargets();
                this.activePlayer.buildCity();
                this.nextPlayer();
            }
        }, this);

        this.humanPlayers = [];

        for (var i = 0; i < this.game.players.length; i++) {
            for (var j = 0; j < this.continents.length; j++) {
                if (this.game.players[i] === this.continents[j].name) {
                    this.humanPlayers.push(this.continents[j]);
                }
            }
        }

        this.activePlayerIndex = this.rnd.integerInRange(0, this.continents.length -1);
        this.activePlayer = this.continents[this.activePlayerIndex];
        this.nextPlayer();
        this.hasWon = false;
    },

    update: function() {
        if (!this.activePlayer.isHuman()
                && !this.hasWon) {

            if (this.time.now > this.delay
                    && this.activePlayer.activeMissiles.length === 0
                    && this.activePlayer.deadMissiles.length === 0) {
                this.activePlayer.doAIAction();
                this.nextPlayer();
            }
        } else if (this.hasWon) {
            this.winText.bringToTop();

            if (this.input.activePointer.isDown
                    && this.time.now > this.inputDelay) {
                this.hasWon = false;
                this.state.start("Menu");
            }
        }
    },

    render: function() {

    },

    nextPlayer: function() {
        if (this.checkWinningConditions() === true) {
            this.hasWon = true;
        }
        else {
            this.activePlayer.turnBorder.visible = false;
            do {
                this.activePlayerIndex++;

                if (this.activePlayerIndex > this.continents.length - 1) {
                    this.activePlayerIndex = 0;
                }

                this.activePlayer = this.continents[this.activePlayerIndex];
            } while (this.activePlayer.dead);

            this.delay = this.time.now + 1500;
            this.activePlayer.turnBorder.visible = true;
            console.log(this.activePlayer.name + "'s turn." + (this.activePlayer.isHuman() ? " (Player)" : ""));
        }
    },

    showTargets: function() {
        for (var i = 0; i < this.continents.length; i++) {
            if (this.continents[i] !== this.activePlayer) {
                this.continents[i].target.visible = true;
            }
        }
    },

    hideTargets: function() {
        for (var i = 0; i < this.continents.length; i++) {
            this.continents[i].target.visible = false;
        }
    },

    checkWinningConditions: function() {
        var deadCount = 0;
        for (var i = 0; i < this.continents.length; i++) {
            if (this.continents[i].dead) {
                deadCount++;
            }
        }

        if (deadCount < 4) {
            return false;
        }

        this.winText = this.add.text(this.game.width / 2, this.game.height / 2, this.activePlayer.name + " has won!\n" +
            "Click/Touch to go back to menu.",
            { font: "22px monospace", fill: "#fff" });
        this.winText.anchor.setTo(0.5, 0.5);
        this.inputDelay = this.time.now + 200;

        return true;
    },

    getTargetParent: function(target) {
    for (var i = 0; i < this.continents.length; i++) {
        if (target === this.continents[i].target) {
            return this.continents[i];
        }
    }

    console.log("Could not get parent");
    return undefined;
    }
};