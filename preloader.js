LDGame.Preloader = function(game) {

};

LDGame.Preloader.prototype = {

    preload: function() {
        this.add.text(this.game.width / 2, this.game.height / 2,
            "Loading...", { font: "32px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

        this.load.image("ocean", "assets/bg.png");
        this.load.image("land", "assets/country.png");
    },

    create: function() {

    },

    update: function() {
        this.state.start("Game");
    }
};