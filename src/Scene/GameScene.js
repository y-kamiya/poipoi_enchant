var GameScene = (function(){
    var that = {};
    that.sceneColor = 'rgb(132, 210, 219)';

    that.init = function(mapName){
        console.log('GameScene init');
        var game = enchant.Game.instance,
            my = {},
            scene = new Scene(),
            group = new Group(),
            controlLayer;

        my.homeButtonSize = {'width' : 143, 'height' : 56};
        my.homeButtonPos = {'x' : 10, 'y' : 10};

        scene.backgroundColor = that.sceneColor;

        my.setHomeButton = function(game, group) {
            var homeButton = new Sprite(my.homeButtonSize.width, my.homeButtonSize.height);
            homeButton.x = my.homeButtonPos.x;
            homeButton.y = my.homeButtonPos.y;
            homeButton.image = game.assets[poipoi.imgPaths['home_button']];
            homeButton.addEventListener('touchstart', function(){
                titleScene = TitleScene.init();
                game.replaceScene(titleScene);
            });
            group.addChild(homeButton);
            return homeButton;
        };

        return (function(){
            var screenLayer = ScreenLayer.init(mapName);
            scene.addChild(screenLayer);

            controlLayer = ControlLayer.init(410,420);
            group.addChild(controlLayer);
            my.setHomeButton(game, group);
            scene.addChild(group);

            var tutorialLayer = TutorialLayer.init(0,0);
            scene.addChild(tutorialLayer);

            var doAction = function doAction(e) {
                var weather = screenLayer.getWeather();
                var nextJob = controlLayer.getNextJob(weather);
                screenLayer.doAction(nextJob);
            };
            var notClear = function notClear(e) {
                //var scene = GameScene.init();
                //enchant.Game.instance.replaceScene(scene);
                currentJobCount = 0;
                screenLayer.notClear();
            };
            var clear = function clear(e) {
                var user = User.init();
                var jobQueueLength = controlLayer.getMainJobQueueLength();
                user.setScore(jobQueueLength);
                screenLayer.clear();
            };
            
            screenLayer.playerLayer.on(poipoi.event.actionStart, doAction);
            screenLayer.playerLayer.clickPanel.on(poipoi.event.actionStart, doAction);
            screenLayer.playerLayer.player.on(poipoi.event.actionEnd, doAction);
            screenLayer.playerLayer.player.on(poipoi.event.actionNotClear, notClear);
            screenLayer.playerLayer.player.on(poipoi.event.actionClear, clear);

            controlLayer.jobLayer.on('SyncJobs', function() {
                var jobCount = controlLayer.getMainJobQueueLength;
                screenLayer.playerLayer.clickPanel.action(jobCount);
            });
            // set public methods
            scene.doAction = doAction;

            return scene;
        }());
    };

    return that;

}());


