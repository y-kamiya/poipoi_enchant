/**
 * TitleScene
 * 起動時に立ち上がる最初の画面
 */
var TitleScene = (function(){
    var my = {},
        that = {};
    my.sceneColor = 'rgb(132, 210, 219)';
    my.titleSprSize = {'width' : 832, 'height' : 439};
    my.titleSprPos = {
        'x' : poipoi.gameSize.width/2 - my.titleSprSize.width/2,
        'y' : poipoi.gameSize.height/2 - my.titleSprSize.height/2,
    };
    my.setTitleSpr = function(game, group) {
        var titleSpr = new Sprite(my.titleSprSize.width, my.titleSprSize.height);
        titleSpr.x = my.titleSprPos.x;
        titleSpr.y = my.titleSprPos.y;
        titleSpr.image = game.assets[poipoi.imgPaths['start']];
        group.addChild(titleSpr);
        return titleSpr;
    };

    that.init = function(){
        var game = enchant.Game.instance;
        var scene = new Scene();
        scene.backgroundColor = my.sceneColor;
        var group = new Group();
        titleSpr = my.setTitleSpr(game, group);
        scene.addChild(group);
        scene.addEventListener('touchstart', function(){
            titleSpr.tl.fadeOut(30).then(function(){
                var mapName = MapManager.getCurrentMapName();
                var gameScene = GameScene.init(mapName);
                game.replaceScene(gameScene);
            });
        });
        return scene;
    };
    return that;
}());
