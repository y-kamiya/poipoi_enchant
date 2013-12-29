/**
 * WeatherLayer
 */
var WeatherLayer = (function(){
    var that = {};
    that.WEATHER = {'SUNNY':1, 'RAINY':2};
    /**
     * init
     * @param int x :group's coodinateX
     * @param int y :group's coodinateY
     * @return Group group
     */
    that.init = function(x, y, weather) {
        console.log('WeatherLayer init');
        var group = new Group();
        var my = {};

        weather = that.WEATHER[weather.toUpperCase()];
        group.cloudSprSize = {'width':621, 'height':128};
        group.sunSprSize = {'width':747, 'height':705};

        my.setBackGround = function(game, group, weather) {
            var sky = new Entity();
            sky.width = poipoi.gameSize.width;
            sky.height = poipoi.gameSize.height;
            sky.x = x;
            sky.y = y;
            group.addChild(sky);
            if (weather==WeatherLayer.WEATHER.SUNNY) {
                sky.backgroundColor = poipoi.SKY_BLUE;
                my.setSun(game, group);
            } else if(weather==WeatherLayer.WEATHER.RAINY){
                sky.backgroundColor = poipoi.RAINY_BLUE;
                my.setRain(game, group);
                my.setCloudSpr(game, group);
            }
            return sky;
        };

        my.setCloudSpr = function(game, group) {
            var cloudSpr = new Sprite(group.cloudSprSize.width, group.cloudSprSize.height);
            cloudSpr.x = (poipoi.gameSize.width - group.cloudSprSize.width)/2;
            cloudSpr.y = y;
            cloudSpr.image = game.assets[poipoi.imgPaths['cloud']];
            cloudSpr.tl.delay(30).then(function(){this.frame += 1;}).loop();
            group.addChild(cloudSpr);
            return cloudSpr;
        };

        my.setRain = function(game, group) {
            var rainSpr = new Sprite(20, 38);
            rainSpr.startPos = {'x':250 + Math.floor( Math.random() * 500), 'y': -40 + Math.floor( Math.random() * 100)};
            rainSpr.x = rainSpr.startPos.x;
            rainSpr.y = rainSpr.startPos.y;
            var rainType = Math.floor(Math.random() * 2) + 1;
            rainSpr.image = game.assets[poipoi.imgPaths['raindrop'+rainType]];
            group.insertBefore(rainSpr, group.lastChild);
            rainSpr.tl.moveTo(rainSpr.startPos.x,rainSpr.startPos.y,0).delay(10).fadeIn(10).moveBy(0, 300, 25).and().fadeOut(25).then(function(){
                group.removeChild(rainSpr);
            });
            setTimeout(function(){my.setRain(game, group);}, 200);
        };

        my.setSun = function(game, group) {
            var sunSpr = new Sprite(747, 705);
            sunSpr.scaleX = 0.5;
            sunSpr.scaleY = 0.5;
            sunSpr.x = (poipoi.gameSize.width - group.sunSprSize.width)/2;
            sunSpr.y = - (group.sunSprSize.height * sunSpr.scaleX) * 0.80;
            sunSpr.image = game.assets[poipoi.imgPaths['sun']];
            group.addChild(sunSpr);
            sunSpr.tl.then(function(){sunSpr.rotate(90);}).delay(20).loop();
            return sunSpr;
        };

        return (function(){
            var game = enchant.Game.instance;
            my.setBackGround(game, group, weather);
            return group;
        }());

    };
    return that;
}());
