var Player = (function Player() {

    var that   = {};
    var my     = {};
    var acions = {};

    // private constant
    my.FRAME = 0.07;

    that.initByObjectData = function initByObjectData(imgName, objectData) {
        var initialPosition = {
            x : parseInt(objectData.player.x),
            y : parseInt(objectData.player.y),
        };
        console.log('x: ' + initialPosition.x + ' y: ' + initialPosition.y);
        return that.init(imgName, initialPosition);
    };


    that.init = function init(imgName, initialPosition) {

        var player = Charactor.init(imgName, initialPosition);
        var uper   = _.clone(player);
        player.width  = poipoi.PLAYER.WIDTH;
        player.height = poipoi.PLAYER.HEIGHT;
        
        player.on(enchant.Event.ENTER_FRAME, function() {
            player.frame += my.FRAME;
        });

        // set public methods
        return _.extend(player, {
            doAction   : _.bind(my.doAction      , player),
            reset      : _.bind(my.reset         , player, uper),
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
    
    my.reset = function reset(uper) {
        uper.reset();
        this.faceToRight();
    };

    var actions = {

        go: function go() {
            var player = this;
            this.tl.then(function() { player.faceToRight(); }).delay(10)
                   .moveBy(poipoi.MAP.TILE_WIDTH * 0.75, 0, 10)
                   .moveBy(poipoi.MAP.TILE_WIDTH * 0.25, 0, 10)
        },

        back: function back() {
            var player = this;
            this.tl.then(function() { player.faceToLeft(); }).delay(10)
                   .moveBy(-poipoi.MAP.TILE_WIDTH * 0.75, 0, 10)
                   .moveBy(-poipoi.MAP.TILE_WIDTH * 0.25, 0, 10)
        },

        goJump: function jump() {
            var player = this;
            this.tl.then(function() { player.faceToRight(); }).delay(10)
                   .moveBy(poipoi.MAP.TILE_WIDTH * 0.75, -poipoi.MAP.TILE_HEIGHT * 1.2, 10)
                   .moveBy(poipoi.MAP.TILE_WIDTH * 0.25,  poipoi.MAP.TILE_HEIGHT * 0.2, 10)
        },

        backJump: function backjump() {
            var player = this;
            this.tl.then(function() { player.faceToLeft(); }).delay(10)
                   .moveBy(-poipoi.MAP.TILE_WIDTH * 0.75, -poipoi.MAP.TILE_HEIGHT * 1.2, 10)
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

