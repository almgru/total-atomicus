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

var Missile = function(game, x, y, id, targetX, targetY) {
    Phaser.Sprite.call(this, game, x, y, id);

    this.targetX = targetX;
    this.targetY = targetY;
    this.radius = 10;
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.isKilled = false;
    this.body.allowRotation = false;
    //this.animations.add("fly", [0, 1, 2], 20, true);
    //this.animations.play("fly");
    this.game.add.existing(this);
    this.game.physics.arcade.moveToXY(this, this.targetX, this.targetY, 60, 2000);
};

Missile.prototype = Object.create(Phaser.Sprite.prototype);
Missile.prototype.constructor = Missile;

Missile.prototype.update = function() {
    if (Phaser.Math.distance(this.x, this.y, this.targetX, this.targetY) < this.radius) {
        this.explode();
    }
};

Missile.prototype.explode = function() {
    this.isKilled = true;
    this.kill();
    // TODO: Create explosion
};