/**
 * Command
 * コマンドを管理する
 * @link https://confluence.gree-office.net/pages/viewpage.action?pageId=105847379
 */
var Command = (function(){

    var that = {};

    that.type = {
        'go'       : 'GO',
        'gojump'   : 'GO_JUMP',
        'back'     : 'BACK',
        'backjump' : 'BACK_JUMP',
        'func1'    : 'FUNC1',
        'func2'    : 'FUNC2',
        'sunny'    : 'SUNNY',
        'rainy'    : 'RAINY',
    };

    that.size = {
        'width' : 68,
        'height' : 84,
    };

    /**
     * makeSprite
     *  - make new command sprite
     * @param int x  sprite's coodinateX
     * @param int y  sprite's coodinateY
     * @param my.type type  command's type
     * @return Sprite commandSprite
     */
    that.makeSprite = function(x, y, type) {
        console.log('Command init');
        var my = {};

        my.scaleX = 1.0;
        my.scaleY = 1.0;

        my.imgPathsMap = {};
        my.imgPathsMap[that.type.go]       = poipoi.imgPaths['EggGo'];
        my.imgPathsMap[that.type.gojump]   = poipoi.imgPaths['EggGoJump'];
        my.imgPathsMap[that.type.back]     = poipoi.imgPaths['EggBack'];
        my.imgPathsMap[that.type.backjump] = poipoi.imgPaths['EggBackJump'];
        my.imgPathsMap[that.type.sunny]    = poipoi.imgPaths['EggSunny'];
        my.imgPathsMap[that.type.rainy]    = poipoi.imgPaths['EggRainy'];
        my.imgPathsMap[that.type.func1]    = poipoi.imgPaths['EggFunc1'];
        my.imgPathsMap[that.type.func2]    = poipoi.imgPaths['EggFunc2'];

        my.getSpriteImage = function(type) {
            var game = enchant.Game.instance;
            var imgPath = my.imgPathsMap[type];
            return game.assets[imgPath];
        };

        return (function(){
            var sprite = new Sprite(68, 84);
            sprite.x = x;
            sprite.y = y;
            sprite.scale(my.scaleX, my.scaleY);
            sprite.image = my.getSpriteImage(type);
            sprite.originX = x;
            sprite.originY = y;
            sprite.type = type;
            return sprite;
        }());
    };

    return that;
}());
