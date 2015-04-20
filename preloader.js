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
        this.load.image("menubg", "assets/menu_bg.png");
        this.load.image("textbg", "assets/textbg.png");
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
        this.load.spritesheet("missile", "assets/missile.png", 5, 15);
        this.load.image("target", "assets/target.png");
    },

    create: function() {

    },

    update: function() {
        this.state.start("Menu");
    }
};