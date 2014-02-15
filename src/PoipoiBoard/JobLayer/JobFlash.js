/**
 * JobFlash
 * - light of selected job
 */

var JobFlash = (function(){

    var my = {},
        that = {};

    that.TYPE = {'DEFAULT':1, 'FUNCTION':2};

    that.size = {'width':64, 'height':80};

    /**
     * makeSprite
     *  - make new job sprite
     * @param int x  sprite's coodinateX
     * @param int y  sprite's coodinateY
     * @return Sprite jobSpr
     */
    that.makeSprite = function(x, y) {
        var game = enchant.Game.instance;
        var sprite = new Sprite(that.size.width, that.size.height);

        // public variable
        sprite.x = x;
        sprite.y = y;
        sprite.image = game.assets[poipoi.imgPaths['egg_playing']];

        return sprite;
    };

    return that;
}());
