"use strict";
/**
 * Created by teh_daniel_37 on 2015-04-19.
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
                this.game.players.push("africa");
                this.startGame();
            }, this, 0, 0, 1);
        this.africaButton.anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2, this.game.height / 2 -59,
            "Africa", { font: "12px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

        this.asiaButton = this.add.button(this.game.width / 2, this.game.height / 2, "menubutton",
            function()
            {
                this.game.players.push("asia");
                this.startGame();
            }, this, 0, 0, 1);
        this.asiaButton.anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2, this.game.height / 2 + 1,
            "Asia", { font: "12px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

        this.europeButton = this.add.button(this.game.width / 2, this.game.height / 2 + 60, "menubutton",
            function()
            {
                this.game.players.push("europe");
                this.startGame();
            }, this, 0, 0, 1);
        this.europeButton.anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2, this.game.height / 2 + 61,
            "Europe", { font: "12px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

        this.northAmerica = this.add.button(this.game.width / 2, this.game.height / 2 + 120, "menubutton",
            function()
            {
                this.game.players.push("north america");
                this.startGame();
            }, this, 0, 0, 1);
        this.northAmerica.anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2, this.game.height / 2 + 121,
            "North America", { font: "12px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

        this.southAmerica = this.add.button(this.game.width / 2, this.game.height / 2 + 180, "menubutton",
            function()
            {
                this.game.players.push("south america");
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