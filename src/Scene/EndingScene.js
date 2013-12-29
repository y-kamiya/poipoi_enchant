var EndingScene = (function EndingScene() {
	var my = {},
		that = {};
    my.sceneColor = 'rgb(132, 210, 219)';

	my.onTap = function onTap() {
        var game = enchant.Game.instance;
        var titleScene = TitleScene.init();
        var user = User.init();
        user.set('currentStageIndex', 1);
		game.replaceScene(titleScene);
	};

	that.init = function init() {
        var game  = enchant.Game.instance;
		var	scene = new Scene();
		scene.backgroundColor = my.sceneColor;

        var label = new Label();
        label.text = 'To Title';
        label.font = '64px Marker Felt';
        scene.addChild(label);

        label.on(enchant.Event.TOUCH_START, my.onTap);
        return scene;
    };



	return that;

}());
