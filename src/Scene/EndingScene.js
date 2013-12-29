var EndingScene = (function EndingScene() {
	var my = {},
		that = {};
    my.sceneColor = 'rgb(132, 210, 219)';

	my.onTap = function onTap() {
        var game = enchant.Game.instance;
        var titleScene = TitleScene.init();
        var user = User.init();
        user.set('currentStageIndex', 1);
        endBoard.tl.fadeOut(30).then(function(){
            game.replaceScene(titleScene);
        });
	};

	that.init = function init() {
        var game  = enchant.Game.instance;
		var	scene = new Scene();
		scene.backgroundColor = my.sceneColor;

        var chara = new Sprite(poipoi.ENDING.CHARA.WIDTH, poipoi.ENDING.CHARA.HEIGHT);
        chara.image = game.assets[poipoi.imgPaths['player_end']];
        chara.moveTo(poipoi.ENDING.CHARA.X, poipoi.ENDING.CHARA.Y);
        chara.tl.then(function() { chara.frame++; }).delay(15).loop();
        scene.addChild(chara);

        var endBoard = new Sprite(poipoi.ENDING.BOARD.WIDTH, poipoi.ENDING.BOARD.HEIGHT);
        endBoard.image = game.assets[poipoi.imgPaths['end_board']];
        scene.addChild(endBoard);

        scene.on(enchant.Event.TOUCH_START, function() {
            var titleScene = TitleScene.init();
            var user = User.init();
            user.set('currentStageIndex', 1);
            chara.tl.fadeOut(30);
            endBoard.tl.fadeOut(30).then(function(){
                game.replaceScene(titleScene);
            });
        });

        return scene;
    };



	return that;

}());
