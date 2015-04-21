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