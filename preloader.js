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

LDGame.Preloader = function(game) {

};

LDGame.Preloader.prototype = {

    preload: function() {
        this.add.text(this.game.width / 2, this.game.height / 2,
            "Loading...", { font: "32px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

        this.load.image("ocean", "assets/bg.png");
        this.load.image("menubg", "assets/menu_bg.png");
        this.load.image("textbg", "assets/textbg.png");
        this.load.image("titlebg", "assets/title_backdrop.png");
        this.load.image("africaimg", "assets/africa_low_res.png");
        this.load.image("europeimg", "assets/europe_low_res.png");
        this.load.image("asiaimg", "assets/asia_low_res.png");
        this.load.image("northamericaimg", "assets/north_america_low_res.png");
        this.load.image("southamericaimg", "assets/south_america_low_res.png");
        this.load.image("turnborder", "assets/turn.png");
        this.load.spritesheet("explosion", "assets/explosion.png", 64, 64);
        this.load.image("ui_bar", "assets/ui.png");
        this.load.image("missleUpgrade", "assets/missileupgradebutton.png");
        this.load.image("defenceUpgrade", "assets/upgradedefencebutton.png");
        this.load.image("cityUpgrade", "assets/upgradefactorybutton.png");
        this.load.image("launchButton", "assets/launchbutton.png");
        this.load.spritesheet("menubutton", "assets/button.png", 120, 40);
        this.load.image("target", "assets/target.png");
        this.load.audio("explosion", "assets/explosion.wav");
        this.load.audio("powerup", "assets/powerup.wav");
        this.load.spritesheet("mutebutton", "assets/mute.png", 48, 48);
    },

    create: function() {

    },

    update: function() {
        this.state.start("Menu");
    }
};