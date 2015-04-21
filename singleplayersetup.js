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

LDGame.SinglePlayerSetup = function(game) {

};

LDGame.SinglePlayerSetup.prototype = {

    create: function() {
        this.add.sprite(0, 0, "menubg");
        this.add.text(this.game.width / 2, this.game.height / 4,
            "Select continent", { font: "32px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

        this.africaButton = this.add.button(this.game.width / 2, this.game.height / 2 - 60, "menubutton",
            function()
            {
                this.game.players.push("Africa");
                this.startGame();
            }, this, 0, 0, 1);
        this.africaButton.anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2, this.game.height / 2 -59,
            "Africa", { font: "12px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

        this.asiaButton = this.add.button(this.game.width / 2, this.game.height / 2, "menubutton",
            function()
            {
                this.game.players.push("Asia");
                this.startGame();
            }, this, 0, 0, 1);
        this.asiaButton.anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2, this.game.height / 2 + 1,
            "Asia", { font: "12px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

        this.europeButton = this.add.button(this.game.width / 2, this.game.height / 2 + 60, "menubutton",
            function()
            {
                this.game.players.push("Europe");
                this.startGame();
            }, this, 0, 0, 1);
        this.europeButton.anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2, this.game.height / 2 + 61,
            "Europe", { font: "12px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

        this.northAmerica = this.add.button(this.game.width / 2, this.game.height / 2 + 120, "menubutton",
            function()
            {
                this.game.players.push("North America");
                this.startGame();
            }, this, 0, 0, 1);
        this.northAmerica.anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2, this.game.height / 2 + 121,
            "North America", { font: "12px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

        this.southAmerica = this.add.button(this.game.width / 2, this.game.height / 2 + 180, "menubutton",
            function()
            {
                this.game.players.push("South America");
                this.startGame();
            }, this, 0, 0, 1);
        this.southAmerica.anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2, this.game.height / 2 + 181,
            "South America", { font: "12px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);
    },

    update: function() {

    },

    startGame: function() {
        this.state.start("Game");
    }
};