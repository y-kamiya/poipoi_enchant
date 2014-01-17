var PlayerLayer = (function PlayerLayer() {

    var that = {},
        my = {};

    that.init = function init(objectData) {
        var game = enchant.Game.instance,
            playerLayer = new Group(),
            player = Player.initByObjectData('player_walk', objectData);

        //player.tl.then(function() { player.frame++; }).delay(15).loop();
        player.on('enterframe', function() {
            player.frame++;
        });
        playerLayer.addChild(player);

        player.on(enchant.Event.TOUCH_START, function() {
            var event = new enchant.Event(poipoi.event.actionStart);
            playerLayer.dispatchEvent(event);
        });

        var doActionList = function doActionList(actionList) {
            _.each(actionList, function(action) {
                player.tl.then(function() {
                    player.doAction(action);
                });
            });
        };

        var notClear = function notClear(enemyLayer) {
            // display panel
            var notClearSpr = new Sprite(poipoi.NOT_CLEAR_PANEL.WIDTH, poipoi.NOT_CLEAR_PANEL.HEIGHT);
            notClearSpr.image = game.assets[poipoi.imgPaths['not_clear']];
            notClearSpr.x = (poipoi.gameSize.width / 2) - (poipoi.NOT_CLEAR_PANEL.WIDTH / 2);
            notClearSpr.y = (poipoi.gameSize.height / 2) - (poipoi.NOT_CLEAR_PANEL.HEIGHT / 2);

            // player animation
            var position = { x: player.x, y: player.y };
            playerFail = Player.init('player_false', position);
            playerFail.tl.then(function() { playerFail.frame++; }).delay(15).loop();

            playerLayer.tl.cue({
                0 : function() { 
                    player.tl.clear().hide(); 
                    player.reset(); 
                    playerLayer.addChild(notClearSpr); 
                    playerLayer.addChild(playerFail); 
                },
                60 : function() { 
                    playerLayer.removeChild(notClearSpr); 
                    playerLayer.removeChild(playerFail); 
                    player.tl.show();
                    player.tl.then(function() { player.frame++; }).delay(15).loop();
                    enemyLayer.reset();
                },
            });
        };

        var clear = function clear() {
            // display panel
            var clearPanel = new Sprite(poipoi.CLEAR_PANEL.WIDTH, poipoi.CLEAR_PANEL.HEIGHT);
            clearPanel.image = game.assets[poipoi.imgPaths['clear']];
            clearPanel.x = (poipoi.gameSize.width / 2) - (poipoi.CLEAR_PANEL.WIDTH / 2);
            clearPanel.y = (poipoi.gameSize.height / 2) - (poipoi.CLEAR_PANEL.HEIGHT / 2);

            // player animation
            var position = { x: player.x, y: player.y };
            playerSuccess = Player.init('player_clear', position);
            playerSuccess.tl.then(function() { playerSuccess.frame++; }).delay(15).loop();

            playerLayer.tl.cue({
                0 : function() { 
                    player.tl.hide(); 
                    player.reset(); 
                    playerLayer.addChild(clearPanel); 
                    playerLayer.addChild(playerSuccess); 
                },
                60 : function() { 
                    var resultScene = ResultScene.init();
                    enchant.Game.instance.replaceScene(resultScene);
                },
            });
        };


        return _.extend(playerLayer, {
            player         : player,

            // methods
            doActionList   : doActionList,
            notClear       : notClear,
            clear          : clear,
        });
    };


    return that;
}());
