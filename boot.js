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