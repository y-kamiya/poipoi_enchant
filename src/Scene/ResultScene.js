var ResultScene = (function ResultScene() {
	var my = {},
		that = {};
    my.sceneColor = 'rgb(132, 210, 219)';

	that.init = function init() {
        var game  = enchant.Game.instance;
		var	scene = new Scene();
		scene.backgroundColor = my.sceneColor;

        var R = poipoi.RESULT;

        var ground = new Sprite(R.GROUND.WIDTH, R.GROUND.HEIGHT);
        ground.image = game.assets[poipoi.imgPaths.ground];
        ground.moveTo(R.GROUND.X, R.GROUND.Y);
        scene.addChild(ground);

        scene.addChild(my.makeSpr('weed', 1));

        for (var i = 1; i <= 4; i++) {
            scene.addChild(my.makeFlowerSpr(i));
        }

        scene.addChild(my.makeSpr('tamago', 1));

        for (var i = 1; i <= 2; i++) {
            scene.addChild(my.makeSpr('star', i));
        }

        scene.addChild(my.makeSpr('clear', 1));

        var result = new Sprite(R.RESULT.WIDTH, R.RESULT.HEIGHT);
        result.image = game.assets[poipoi.imgPaths.result];
        result.moveTo(R.RESULT.X, R.RESULT.Y);
        scene.addChild(result);

        var user = User.init();
        var currentScore = new Label();
        currentScore.text = user.getScore();
        currentScore.font = '32px Marker Felt';
        currentScore.moveTo(poipoi.RESULT.SCORE.X, poipoi.RESULT.SCORE.Y);
        scene.addChild(currentScore);

        var bestScore = new Label();
        bestScore.text = StageManager.getBestScore(user.get('currentDifficulty'), user.get('currentStageIndex'));
        bestScore.font = '32px Marker Felt';
        bestScore.moveTo(poipoi.RESULT.BEST_SCORE.X, poipoi.RESULT.BEST_SCORE.Y);
        scene.addChild(bestScore);

        var next = new Sprite(R.NEXT.WIDTH, R.NEXT.HEIGHT);
        next.image = game.assets[poipoi.imgPaths.next];
        next.moveTo(R.NEXT.X, R.NEXT.Y);
        scene.addChild(next);

        next.on(enchant.Event.TOUCH_START, function() {
            var currentDifficulty = user.get('currentDifficulty');
            var currentStageIndex = user.get('currentStageIndex');
            var stageMax = StageManager.getStageMax(currentDifficulty);
            if (stageMax <= currentStageIndex) {
                return game.replaceScene(EndingScene.init());
            }

            user.set('currentStageIndex', ++currentStageIndex);
            var mapName = MapManager.getCurrentMapName();
            var	gameScene = GameScene.init(mapName);
            game.replaceScene(gameScene);
        });


		return scene;
	};

    my.makeFlowerSpr = function makeFlowerSpr(index) {
        var game = enchant.Game.instance;
        var R    = poipoi.RESULT;

        var flower = new Sprite(R.FLOWER.WIDTH, R.FLOWER.HEIGHT);
        flower.image = game.assets[poipoi.imgPaths['flower']];
        flower.moveTo(R.FLOWER[index].X, R.FLOWER[index].Y);
        flower.frame = index;
        flower.tl.then(function() { flower.frame++; }).delay(15).loop();
        return flower;
    };

    my.makeSpr = function makeSpr(imgName, index) {
        var game = enchant.Game.instance;
        var R    = poipoi.RESULT;
        var capitalName = imgName.toUpperCase();

        var sprite = new Sprite(R[capitalName].WIDTH, R[capitalName].HEIGHT);
        sprite.image = game.assets[poipoi.imgPaths[imgName]];
        sprite.moveTo(R[capitalName][index].X, R[capitalName][index].Y);
        sprite.frame = 0;
        sprite.tl.then(function() { sprite.frame++; }).delay(15).loop();
        return sprite;
    };

	my.onTapNextButton = function onTapNextButton() {
        var game = enchant.Game.instance;
		var	gameScene = GameScene.init();
		game.replaceScene(gameScene);
	};


	return that;

}());
