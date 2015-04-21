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

LDGame.MultiplayerSetup = function(game) {

};

LDGame.MultiplayerSetup.prototype = {

    create: function() {
        this.add.sprite(0, 0, "menubg");
        this.text = this.game.add.text(this.game.width / 2, this.game.height / 4,
            "Select continent for player 1", { font: "24px monospace", fill: "#fff" });
        this.text.anchor.setTo(0.5, 0.5);


        this.startButton = undefined;

        this.backButton = this.add.button(this.game.width / 2 - 240, this.game.height / 2 + 60, "menubutton",
            function() {
                this.game.players = [];
                this.state.start("Menu");
            }, this, 0, 0, 1);
        this.backButton.anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2 - 240, this.game.height / 2 + 61,
            "Back", { font: "12px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

        this.africaButton = this.add.button(this.game.width / 2, this.game.height / 2 - 60, "menubutton",
            function() {
                this.game.players.push("Africa");
                this.africaButton.inputEnabled = false;
                this.updateText(-60);
            }, this, 0, 0, 1);
        this.africaButton.anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2, this.game.height / 2 -59,
            "Africa", { font: "12px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

        this.asiaButton = this.add.button(this.game.width / 2, this.game.height / 2, "menubutton",
            function()
            {
                this.game.players.push("Asia");
                this.asiaButton.inputEnabled = false;
                this.updateText(0);
            }, this, 0, 0, 1);
        this.asiaButton.anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2, this.game.height / 2 + 1,
            "Asia", { font: "12px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

        this.europeButton = this.add.button(this.game.width / 2, this.game.height / 2 + 60, "menubutton",
            function()
            {
                this.game.players.push("Europe");
                this.europeButton.inputEnabled = false;
                this.updateText(60);
            }, this, 0, 0, 1);
        this.europeButton.anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2, this.game.height / 2 + 61,
            "Europe", { font: "12px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

        this.northAmerica = this.add.button(this.game.width / 2, this.game.height / 2 + 120, "menubutton",
            function()
            {
                this.game.players.push("North America");
                this.northAmerica.inputEnabled = false;
                this.updateText(120);
            }, this, 0, 0, 1);
        this.northAmerica.anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2, this.game.height / 2 + 121,
            "North America", { font: "12px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

        this.southAmerica = this.add.button(this.game.width / 2, this.game.height / 2 + 180, "menubutton",
            function()
            {
                this.game.players.push("South America");
                this.southAmerica.inputEnabled = false;
                this.updateText(180);
            }, this, 0, 0, 1);
        this.southAmerica.anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2, this.game.height / 2 + 181,
            "South America", { font: "12px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);
    },

    update: function() {

    },

    startGame: function() {
        this.state.start("Game");
    },

    updateText: function(y) {
        if (this.startButton === undefined) {
            this.startButton = this.add.button(this.game.width / 2 + 240, this.game.height / 2 + 60, "menubutton",
                this.startGame, this, 0, 0, 1);
            this.startButton.anchor.setTo(0.5, 0.5);
            this.add.text(this.game.width / 2 + 240, this.game.height / 2 + 61,
                "Start", { font: "12px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);
        }

        this.add.text(this.game.width / 2 + 110, this.game.height / 2 + y,
            "(Player " + (this.game.players.length) + ")", {
                font: "14px monospace",
                fill: "#fff"
            }).anchor.setTo(0.5, 0.5);

        if (this.game.players.length < 5) {
            this.text.setText("Select continent for player " + (this.game.players.length + 1) + ".\nPress 'Start' to begin.");
        }
        else {
            this.text.setText("All continents set!\nPress 'Start' to begin!");
        }
    }
};