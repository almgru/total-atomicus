"use strict";
/**
 * Created by teh_daniel_37 on 2015-04-19.
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

        this.africaButton = this.add.button(this.game.width / 2, this.game.height / 2 - 60, "menubutton",
            function()
            {
                this.game.players.push("africa");
                this.africaButton.inputEnabled = false;
                this.updateText(-60);
            }, this, 0, 0, 1);
        this.africaButton.anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2, this.game.height / 2 -59,
            "Africa", { font: "12px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

        this.asiaButton = this.add.button(this.game.width / 2, this.game.height / 2, "menubutton",
            function()
            {
                this.game.players.push("asia");
                this.asiaButton.inputEnabled = false;
                this.updateText(0);
            }, this, 0, 0, 1);
        this.asiaButton.anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2, this.game.height / 2 + 1,
            "Asia", { font: "12px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

        this.europeButton = this.add.button(this.game.width / 2, this.game.height / 2 + 60, "menubutton",
            function()
            {
                this.game.players.push("europe");
                this.europeButton.inputEnabled = false;
                this.updateText(60);
            }, this, 0, 0, 1);
        this.europeButton.anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2, this.game.height / 2 + 61,
            "Europe", { font: "12px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

        this.northAmerica = this.add.button(this.game.width / 2, this.game.height / 2 + 120, "menubutton",
            function()
            {
                this.game.players.push("north america");
                this.northAmerica.inputEnabled = false;
                this.updateText(120);
            }, this, 0, 0, 1);
        this.northAmerica.anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2, this.game.height / 2 + 121,
            "North America", { font: "12px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

        this.southAmerica = this.add.button(this.game.width / 2, this.game.height / 2 + 180, "menubutton",
            function()
            {
                this.game.players.push("south america");
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
                font: "12px monospace",
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