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

LDGame.Menu = function(game) {

};

LDGame.Menu.prototype = {

    create: function() {
        this.add.sprite(0, 0, "menubg");
        this.add.sprite(143, 120, "titlebg").alpha = 0.6;
        this.add.text(this.game.width / 2, this.game.height / 4,
            "Total Atomicus", { font: "42px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2, this.game.height / 4 + 50,
            "Made by Daniel Alm Grundström, LinkPact Games", { font: "18px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

        this.singlePlayerButton = this.add.button(this.game.width / 2, this.game.height / 2, "menubutton",
            this.singlePlayer, this, 0, 0, 1);
        this.singlePlayerButton.anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2, this.game.height / 2 + 1,
            "Single Player", { font: "12px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

        this.multiPlayerButton = this.add.button(this.game.width / 2, this.game.height / 2 + 80, "menubutton",
            this.multiplayer, this, 0, 0, 1);
        this.multiPlayerButton.anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2, this.game.height / 2 + 81,
            "Multiplayer", { font: "12px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);
    },

    update: function() {

    },

    singlePlayer: function() {
        this.state.start("SinglePlayer");
    },

    multiplayer: function() {
        this.state.start("Multiplayer");
    }
};