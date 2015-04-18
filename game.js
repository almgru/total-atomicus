"use strict";
/**
 * Created by teh_daniel_37 on 4/18/15.
 */

LDGame.Game = function(game) {

};

LDGame.Game.prototype = {
    preload: function() {

    },

    create: function() {
        this.ocean = this.add.sprite(0, 0, "ocean");

        this.continents = [];
        this.continents.push(new Continent(this, 10, 10, "land", "north america", 3));
        this.continents.push(new Continent(this, 400, 10, "land", "europe", 3));
        this.continents.push(new Continent(this, 600, 180, "land", "asia", 3));
        this.continents.push(new Continent(this, 400, 250, "land", "africa", 3));
        this.continents.push(new Continent(this, 80, 300, "land", "south america", 3));
        for (var i = 0; i < this.continents.length; i++) {
            this.continents[i].inputEnabled = true;
            this.continents[i].events.onInputDown.add(this.onDown, this);
            this.add.existing(this.continents[i]);
        }

        this.humanPlayer = this.continents[1];
        this.activePlayerIndex = this.getIndexOf("europe");
        this.activePlayer = this.continents[this.activePlayerIndex];
        this.activePlayer.tint = 0xffff00;
    },

    update: function() {
        if (this.activePlayer !== this.humanPlayer) {
            if (this.time.now > this.delay) {
                this.activePlayer.doAIAction();
                this.nextPlayer();
            }
        } else {
            if (this.input.keyboard.isDown(Phaser.Keyboard.A)) {
                this.activePlayer.buildAttack();
                this.nextPlayer();
            } else if (this.input.keyboard.isDown(Phaser.Keyboard.D)) {
                this.activePlayer.buildDefence();
                this.nextPlayer();
            }
        }
    },

    render: function() {

    },

    onDown: function(sprite) {
        if (this.activePlayer === this.humanPlayer) {
            this.activePlayer.attack(sprite.name);
            this.nextPlayer();
        }
    },

    getIndexOf: function(string) {
        for (var i = 0; i < this.continents.length; i++) {
            if (this.continents[i].name === string) {
                return i;
            }
        }

        console.log("Could not get value of " + string);
        return -1;
    },

    nextPlayer: function() {
        this.activePlayer.tint = 0x00ff00;

        do {
            this.activePlayerIndex++;
            if (this.activePlayerIndex > this.continents.length - 1) {
                this.activePlayerIndex = 0;
            }
            this.activePlayer = this.continents[this.activePlayerIndex];
        } while (this.activePlayer.dead);

        this.activePlayer.tint = 0xffff00;

        this.delay = this.time.now + 1500;

        console.log(this.activePlayer.name + "'s turn.");
    }
};