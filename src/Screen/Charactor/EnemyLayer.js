var EnemyLayer = (function EnemyLayer() {

    var that = {};
    var my   = {};

    that.init = function init(objectData) {
        var game = enchant.Game.instance;
        var enemyLayer = new Group();
        var enemyList = [];

        _.each(objectData, function(property) {
            var prefix = property.name.substr(0, 5);
            if (prefix === 'enemy') {
                var enemy = Enemy.initByObjectData('enemy', objectData[property.name]);
                enemyList.push(enemy);
                enemyLayer.addChild(enemy);
            }
        });


        return _.extend(enemyLayer, {
            enemyList     : enemyList,

            reset         : _.bind(my.reset, enemyLayer),
        });
    };

    my.onActionStart = function onActionStart(e) {
        var event = new enchant.Event(poipoi.event.actionStart);
        enchant.Game.instance.dispatchEvent(event);
    };

    my.reset = function reset() {
        _.each(this.enemyList, function(enemy) {
            enemy.reset();
        });
    };


    return that;
}());
