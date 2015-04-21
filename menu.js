"use strict";
/**
 * Created by teh_daniel_37 on 2015-04-19.
 */
LDGame.Menu = function(game) {

};

LDGame.Menu.prototype = {

    create: function() {
        this.add.sprite(0, 0, "menubg");
        this.add.text(this.game.width / 2, this.game.height / 4,
            "Total Atomicus", { font: "42px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);


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