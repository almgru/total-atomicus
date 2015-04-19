"use strict";
/**
 * Created by teh_daniel_37 on 4/18/15.
 */

var LDGame = {

};

LDGame.Boot = function(game) {

};

LDGame.Boot.prototype = {
    init: function() {
        this.input.maxPointers = 1;

        if (this.game.device.desktop) {

        } else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(320, 200, 800, 600);
            this.scale.forceLandScape = true;
        }

        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },

    preload: function() {
        //TODO: add Preloader bar
    },

    create: function() {
        this.state.start("Preloader");
    }
};