window.onload = function() {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, "gamecontainer");

    game.state.add("Boot", LDGame.Boot);
    game.state.add("Preloader", LDGame.Preloader);
    game.state.add("Game", LDGame.Game);

    game.state.start("Boot");
}