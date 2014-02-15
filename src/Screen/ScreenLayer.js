var ScreenLayer = (function ScreenLayer() {

    var that = {};
    var my   = {};


    that.init = function init(mapName) {

        var screenLayer = new Group();
        screenLayer.y = poipoi.SCREEN.OFFSET_Y;

        // weather
        var user = User.init();
        var defaultWeather = StageManager.getDefaultWeather(user.get('currentDifficulty'), user.get('currentStageIndex'));
        var weatherLayer = WeatherLayer.init(0, -screenLayer.y, defaultWeather);
        screenLayer.addChild(weatherLayer);
        screenLayer.getWeather = function() {
            return weatherLayer.getWeather();
        };

		// map 
		var map = MapManager.createMap(mapName);
		screenLayer.addChild(map);

        var goal = Goal.initByObjectData('goal', map.objectData);
        screenLayer.addChild(goal);

        var enemyLayer = EnemyLayer.init(map.objectData);
        screenLayer.addChild(enemyLayer);

        // charactor
        var playerLayer = PlayerLayer.init(map.objectData);
        screenLayer.addChild(playerLayer);


        return _.extend(screenLayer, {
            map          : map,
            playerLayer  : playerLayer,
            enemyLayer   : enemyLayer,
            goal         : goal,

            doAction     : _.bind(my.doAction, screenLayer),
            notClear     : _.bind(my.notClear, screenLayer),
            clear        : _.bind(my.clear   , screenLayer),
        });
    };

    my.doAction = function doAction(job) {
        var collision = Collision.init(this);
        var actionList = collision.getActionList(job); 
        this.playerLayer.doActionList(actionList);
    };

    my.notClear = function notClear() {
        this.playerLayer.notClear(this.enemyLayer);
    };

    my.clear = function clear() {
        this.playerLayer.clear();
    };

    return that;
}());
