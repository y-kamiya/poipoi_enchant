/**
 * JobFrame
 * 背景たまご
 * @link https://confluence.gree-office.net/pages/viewpage.action?pageId=105847379
 */
var JobFrame = (function(){

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
    that.makeSprite = function(x, y, jobType) {
        var game = enchant.Game.instance;
        var sprite = new Sprite(that.size.width, that.size.height);

        // public variable
        sprite.x = x;
        sprite.y = y;
        if (jobType==that.TYPE.FUNCTION) {
            sprite.image = game.assets[poipoi.imgPaths['egg_bg_func']];
        } else {
            sprite.image = game.assets[poipoi.imgPaths['egg_bg']];
        }
        return sprite;
    };

    return that;
}());
