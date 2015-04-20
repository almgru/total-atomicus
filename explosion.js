"use strict";
/**
 * Created by teh_daniel_37 on 4/18/15.
 */

var Explosion = function(game, x, y, id, lifeSpan) {
    Phaser.Sprite.call(this, game, x, y, id);

    this.killTime = this.game.time.now + lifeSpan;
    this.anchor.setTo(0.5, 0.5);
};

Explosion.prototype = Object.create(Phaser.Sprite.prototype);
Explosion.prototype.constructor = Explosion;

Explosion.prototype.update = function() {
    if (this.game.time.now > this.killTime) {
        this.destroy();
    }
}