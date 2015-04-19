"use strict";
/**
 * Created by teh_daniel_37 on 4/18/15.
 */

LDGame.Preloader = function(game) {

};

LDGame.Preloader.prototype = {

    preload: function() {
        this.add.text(this.game.width / 2, this.game.height / 2,
            "Loading...", { font: "32px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

        this.load.image("ocean", "assets/bg.png");
        this.load.image("land", "assets/country.png");
        this.load.image("explosion", "assets/explosion.png");
        this.load.image("ui_bar", "assets/ui.png");
        this.load.image("missleUpgrade", "assets/upgrade_missles_button.png");
        this.load.image("defenceUpgrade", "assets/upgrade_defence_button.png");
        this.load.image("cityUpgrade", "assets/upgrade_cities_button.png");
        this.load.image("launchButton", "assets/launch_button.png");
    },

    create: function() {

    },

    update: function() {
        this.state.start("Game");
    }
};