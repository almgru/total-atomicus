"use strict";
/**
 * Created by teh_daniel_37 on 2015-04-19.
 */
LDGame.Menu = function(game) {

};

LDGame.Menu.prototype = {

    create: function() {
        this.add.text(this.game.width / 2, this.game.height / 3,
            "Terminal", { font: "32px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);
        this.add.text(this.game.width / 2, this.game.height / 2,
            "Press 'Enter' to start", { font: "24px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);
    },

    update: function() {
        if (this.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            this.state.start("Game");
        }
    }
};