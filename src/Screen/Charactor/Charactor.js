var Charactor = (function Charactor() {

    var that = {};
    var my   = {};


    that.init = function init(imgName, initialPosition) {

        var charactor = new Sprite(poipoi.MAP.TILE_WIDTH, poipoi.MAP.TILE_HEIGHT);
        var tileCoord = my.tileCoordFromPosition(initialPosition);
        my.initialize.call(charactor, imgName, initialPosition);

        return _.extend(charactor, {
            tileCoord     : {
                x : tileCoord.x,
                y : tileCoord.y,
            },

            reset                 : _.bind(my.reset                 , charactor, initialPosition),
            getPosition           : _.bind(my.getPosition           , charactor),
            getCurrentTileCoord   : _.bind(my.getCurrentTileCoord   , charactor),
            getNextTileCoord      : _.bind(my.getNextTileCoord      , charactor),
        });
    };

    my.initialize = function initialize(imgName, initialPosition) {
        var game = enchant.Game.instance;
        this.image = game.assets[poipoi.imgPaths[imgName]];
        this.originX = 0;
        this.originY = 0;
        this.moveTo(initialPosition.x, initialPosition.y);
    };

    my.reset = function reset(initialPosition) {
        var tileCoord = my.tileCoordFromPosition(initialPosition);
        this.tileCoord.x = tileCoord.x;
        this.tileCoord.y = tileCoord.y;
        this.x = initialPosition.x;
        this.y = initialPosition.y;
    };

    my.getPosition = function getPosition() {
        return { x : this.x, y : this.y };
    };

    my.getCurrentTileCoord = function getCurrentTileCoord() {
        return { x : this.tileCoord.x , y : this.tileCoord.y };
    };

    my.getNextTileCoord = function getNextTileCoord(action) {
        if (!_.isFunction(my.actions[action])) {
            return this.getCurrentTileCoord();
        }
        return my.actions[action].call(this);
    };

    my.tileCoordFromPosition = function tileCoordFromPosition(position) {
        return {
            x : Math.floor(position.x / poipoi.MAP.TILE_WIDTH),
            y : Math.floor(position.y / poipoi.MAP.TILE_HEIGHT),
        };
    };



    my.actions = {

        go: function go() {
            return {
                x : this.tileCoord.x + 1,
                y : this.tileCoord.y,
            };
        },
        goJump: function jump() {
            return {
                x : this.tileCoord.x + 1,
                y : this.tileCoord.y - 1,
            };
        },
        back: function back() {
            return {
                x : this.tileCoord.x - 1,
                y : this.tileCoord.y,
            };
        },
        backJump: function backjump() {
            return {
                x : this.tileCoord.x - 1,
                y : this.tileCoord.y - 1,
            };
        },
        down: function down() {
            return {
                x : this.tileCoord.x,
                y : this.tileCoord.y + 1,
            };
        },
        attackDrop: function attack() {
            var e = new enchant.Event(poipoi.event.ATTACK_DROP);
            enchant.Game.instance.dispatchEvent(e);
            return {
                x : this.tileCoord.x,
                y : this.tileCoord.y + 1,
            };
        },
        wait: function wait() {
            return {
                x : this.tileCoord.x,
                y : this.tileCoord.y,
            };
        },

    };

    return that;
}());
