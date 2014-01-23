var Enemy = (function Enemy() {

    var that = {};
    var my = {};

    // private const
    my.FRAME = 0.07;
    
    that.initByObjectData = function initByObjectData(imgName, enemyData) {
        var initialPosition = {
            x : parseInt(enemyData.x),
            y : parseInt(enemyData.y),
        };
        return that.init(imgName, initialPosition);
    };


    that.init = function init(imgName, initialPosition) {

        var attacked = false;
        var enemy    = Charactor.init(imgName, initialPosition);
        var uper     = _.clone(enemy);
        enemy.width  = poipoi.ENEMY.WIDTH;
        enemy.height = poipoi.ENEMY.HEIGHT;

        enemy.on(enchant.Event.ENTER_FRAME, function() {
            enemy.frame += my.FRAME;
        });
        enchant.Game.instance.on(poipoi.event.ATTACK_DROP, _.bind(actions.attackDrop, enemy));

        // set public methods
        return _.extend(enemy, {
            attacked   : _.bind(my.attacked      , enemy, attacked),
            reset      : _.bind(my.reset         , enemy, uper, attacked),
        });
    };

    my.attacked = function attacked(attacked) {
        attacked = true;
    };

    my.reset = function reset(uper, attacked) {
        uper.reset();
        attacked = false;
    };

    var actions = {

        attackDrop: function attackDrop() {
            this.tl.moveBy(0, poipoi.MAP.TILE_HEIGHT * poipoi.MAP.MAP_HEIGHT, 20)
                   
        },
    };

    return that;


}());

