var PlayerLayer = (function PlayerLayer() {

    var that = {},
        my = {};

    that.init = function init(objectData) {
        var game = enchant.Game.instance;
        var playerLayer = new Group();
        
        var player = Player.initByObjectData('player_walk', objectData);
        playerLayer.addChild(player);
        my.bindTauchStartEvent(player, playerLayer);
        
        var clickPanel = ClickPanel.initByObjectData('click', objectData);
        playerLayer.addChild(clickPanel);

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
                    clickPanel.action();
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
            clickPanel     : clickPanel,

            // methods
            doActionList   : doActionList,
            notClear       : notClear,
            clear          : clear,
        });
    };
    
    my.bindTauchStartEvent = function bindTauchStartEvent(sprite, dispatcher) {
        sprite.on(enchant.Event.TOUCH_START, function() {
            var event = new enchant.Event(poipoi.event.actionStart);
            dispatcher.dispatchEvent(event);
        });
    };


    return that;
}());
