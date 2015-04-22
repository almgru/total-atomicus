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
        this.ui = new UI(this, 0, 480, "ui_bar");
        this.add.existing(this.ui);
        this.ui.createButtons();

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
        this.playersDead = false;
        this.deadHumanPlayers = 0;

        this.muteButton = this.add.button(this.game.width - 58 , 10, "mutebutton", this.toggleMute, this);
        if (this.game.playAudio) {
            this.muteButton.frame = 0;
        } else {
            this.muteButton.frame = 1;
        }
    },

    update: function() {
        if (this.playersDead
                && !this.hasWon) {
            this.playersDeadText.bringToTop();

            if (this.input.activePointer.isDown) {
                this.reset();
            }
        }

        if (!this.activePlayer.isHuman()
                && !this.hasWon) {
            if (this.time.now > this.delay) {
                this.activePlayer.doAIAction();
                this.nextPlayer();
            }
        } else if (this.hasWon) {
            this.winText.bringToTop();

            if (this.input.activePointer.isDown
                && this.time.now > this.inputDelay) {
                this.reset();
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
        if (this.allHumansDead()
                && !this.playersDead) {
            this.playersDead = true;
            this.playersDeadText = this.add.text(this.game.width / 2, (this.game.height - 120) / 2, "All human players are dead!\nClick/Touch to go back to menu!",
                { font: "22px monospace", fill: "#fff" });
            this.playersDeadText.anchor.setTo(0.5, 0.5);
        }

        var deadCount = 0;
        for (var i = 0; i < this.continents.length; i++) {
            if (this.continents[i].dead) {
                deadCount++;
            }
        }

        if (deadCount < 4) {
            return false;
        }

        if (this.playersDeadText !== undefined) {
            this.playersDeadText.destroy();
        }
        this.winText = this.add.text(this.game.width / 2, (this.game.height - 120) / 2, this.activePlayer.name + " has won!\n" +
            "Click/Touch to go back to menu.",
            { font: "22px monospace", fill: "#fff" });
        this.winText.anchor.setTo(0.5, 0.5);
        this.inputDelay = this.time.now + 200;

        return true;
    },

    allHumansDead: function() {
        return (this.deadHumanPlayers === this.game.players.length);
    },

    getTargetParent: function(target) {
        for (var i = 0; i < this.continents.length; i++) {
            if (target === this.continents[i].target) {
            return this.continents[i];
            }
        }

        console.log("Could not get parent");
        return undefined;
    },

    reset: function() {
        this.game.players = [];
        this.deadHumanPlayers = 0;
        this.playersDead = false;
        this.hasWon = false;
        this.state.start("Menu");
    },

    toggleMute: function() {
        this.game.playAudio = !this.game.playAudio;

        if (this.game.playAudio) {
            this.muteButton.frame = 0;
        } else {
            this.muteButton.frame = 1;
        }
    }
};