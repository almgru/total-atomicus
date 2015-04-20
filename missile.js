"use strict";
/**
 * Created by daniel on 2015-04-20.
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