var Player = (function Player() {

    var that = {},
        my = {},
        acions = {};

    that.initByObjectData = function initByObjectData(imgName, objectData) {
        var initialPosition = {
            x : parseInt(objectData.player.x),
            y : parseInt(objectData.player.y),
        };
        return that.init(imgName, initialPosition);
    };


    that.init = function init(imgName, initialPosition) {

        var player = Charactor.init(imgName, initialPosition);
        player.width = poipoi.player.width;
        player.height = poipoi.player.height;
        player.scale(0.4);

        // set public methods
        return _.extend(player, {
            doAction   : _.bind(my.doAction      , player),
            /*
            go         : _.bind(actions.go       , player),
            back       : _.bind(actions.back     , player),
            jump       : _.bind(actions.jump     , player),
            backjump   : _.bind(actions.backjump , player),
            down       : _.bind(actions.down     , player),
            end        : _.bind(actions.end      , player),
            notClear   : _.bind(actions.notClear , player),
            clear      : _.bind(actions.clear    , player),
           */
        });
    };


    my.doAction = function doAction(action) {
        // set next tile coord
        this.tl.then(function() { 
            this.tileCoord = this.getNextTileCoord(action); 
        });
        // move charactor on screen
        actions[action].call(this);
    };

    var actions = {

        go: function go() {
            this.tl.moveBy(poipoi.MAP.TILE_WIDTH * 0.75, 0, 10)
                   .moveBy(poipoi.MAP.TILE_WIDTH * 0.25, 0, 10)
        },

        back: function back() {
            this.tl.moveBy(-poipoi.MAP.TILE_WIDTH * 0.75, 0, 10)
                   .moveBy(-poipoi.MAP.TILE_WIDTH * 0.25, 0, 10)
        },

        goJump: function jump() {
            this.tl.moveBy(poipoi.MAP.TILE_WIDTH * 0.75, -poipoi.MAP.TILE_HEIGHT * 1.2, 10)
                   .moveBy(poipoi.MAP.TILE_WIDTH * 0.25,  poipoi.MAP.TILE_HEIGHT * 0.2, 10)
        },

        backJump: function backjump() {
            this.tl.moveBy(-poipoi.MAP.TILE_WIDTH * 0.75, -poipoi.MAP.TILE_HEIGHT * 1.2, 10)
                   .moveBy(-poipoi.MAP.TILE_WIDTH * 0.25,  poipoi.MAP.TILE_HEIGHT * 0.2, 10)
        },

        down: function down() {
            this.tl.moveBy(0, poipoi.MAP.TILE_HEIGHT * 1.0, 10)
        },

        attackDrop: function attack() {
            this.tl.moveBy(0, poipoi.MAP.TILE_HEIGHT * 1.0, 3).delay(7)
        },

        wait: function wait() {
            this.tl.moveBy(poipoi.MAP.TILE_WIDTH * 0.25, 0, 10)
                   .moveBy(-poipoi.MAP.TILE_WIDTH * 0.25, 0, 10)
        },

        end: function actionEnd() {
            var player = this;
            var event = new enchant.Event(poipoi.event.actionEnd);
            this.tl.then(function() {
                player.dispatchEvent(event);
            });
        },

        notClear: function notClear() {
            var player = this;
            var event = new enchant.Event(poipoi.event.actionNotClear);
            this.tl.delay(10).then(function() {
                player.dispatchEvent(event);
            });
        },

        clear: function clear() {
            var player = this;
            var event = new enchant.Event(poipoi.event.actionClear);
            this.tl.then(function() {
                player.dispatchEvent(event);
            });
        },
    };

    return that;


}());

