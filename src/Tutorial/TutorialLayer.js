/**
 * TutorialLayer
 */
var TutorialLayer = (function(){
    var that = {};

    /**
     * init
     * @param int x :group's coodinateX
     * @param int y :group's coodinateY
     * @return Group group
     */
    that.init = function(x, y) {
        console.log('TutorialLayer init');
        var my = {};

        my.setBackGroundSpr = function(game, group) {
            var backGroundSpr = new Sprite(poipoi.gameSize.width,poipoi.gameSize.height);
            backGroundSpr.x = 0;
            backGroundSpr.y = 0;
            backGroundSpr.image = game.assets[poipoi.imgPaths['tutorial_back']];
            group.addChild(backGroundSpr);
            return backGroundSpr;
        };

        /**
         * egg and finger animation
         */
        my.setFinger = function(game, group) {
            // set egg and finger sprite into group
            var fingerLayer = new Group();
            var commandGoSpr = Command.makeSprite(0,0,Command.type.go);
            fingerLayer.addChild(commandGoSpr);
            var fingerSpr = new Sprite(152,269);
            fingerSpr.x = 0;
            fingerSpr.y = 60;
            fingerSpr.image = game.assets[poipoi.imgPaths['finger']];
            fingerLayer.addChild(fingerSpr);
            // moving start position
            fingerLayer.startPos = {'x':360,'y':440};
            // moving end position
            fingerLayer.lastPos  = {'x':360,'y':555};
            group.addChild(fingerLayer);
            // animation
            fingerLayer.tl.moveTo(fingerLayer.startPos.x,fingerLayer.startPos.y,0).delay(20).moveTo(fingerLayer.lastPos.x, fingerLayer.lastPos.y, 20).loop().delay(30);
            return fingerLayer;
        };

        return (function(){
            var group = new Group();
            var game = enchant.Game.instance;
            my.setBackGroundSpr(game, group);
            my.setFinger(game, group);
            group.moveTo(x,y);
            group.addEventListener('touchstart', function(){
                group.parentNode.removeChild(group);
            });
            return group;
        }());

    };
    return that;
}());
