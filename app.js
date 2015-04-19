"use strict";
/**
 * Created by teh_daniel_37 on 4/18/15.
 */

window.onload = function() {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, "gamecontainer");

    game.players = [];

    game.state.add("Boot", LDGame.Boot);
    game.state.add("Preloader", LDGame.Preloader);
    game.state.add("Menu", LDGame.Menu);
    game.state.add("SinglePlayer", LDGame.SinglePlayerSetup);
    game.state.add("Multiplayer", LDGame.MultiplayerSetup);
    game.state.add("Game", LDGame.Game);

    game.state.start("Boot");
}