var MapManager = (function MapManager() {
	var my = {},
		that = {};

	that.createMap = function factory(tmxFileName) {
		var game = enchant.Game.instance;
		var map = new Map(poipoi.MAP.TILE_WIDTH, poipoi.MAP.TILE_HEIGHT);

        map.y = poipoi.MAP.OFFSET_Y;
		map.image = game.assets[poipoi.imgPaths['earth_tile']];
		
		var path = poipoi.mapPaths[tmxFileName];
		var contents = game.assets[path];
		var mapLoader = mapParser(contents);
		map.loadData.apply(map, mapLoader.map);
		map.collisionData = mapLoader.collision;
		map.objectData = mapLoader.objects;
		return map;
	};

    that.getCurrentMapName = function getCurrentMapName() {
        var user = User.init();
        var stageKey = user.makeStageKey();
        var defaultWeather = StageManager.getDefaultWeather(
            user.get('currentDifficulty')
            , user.get('currentStageIndex')
        );
        return 'map' + stageKey + '_' + defaultWeather;
    };


    var createFromAttr = function(source, target) {
        if(typeof source != typeof {} && typeof target != typeof {}){
            return;
        }
        if(source.localName == 'property'){
            target[source.getAttribute('name')] = source.getAttribute('value');
            return;
        }
        for(var i in source.attributes) {
            if(source.attributes.hasOwnProperty(i)) {
                //console.log(i);
                target[source.attributes[i].name] = source.attributes[i].value;
            }
        }
    };
    /**
   * mapデータをパースする
   * @param {String} str 解析対象の文字列
   * @return {Array}
   */
	function mapParser(str) {
		var mapLoader = {};
		try {
			mapLoader.map = [];
			mapLoader.collision = [];
			mapLoader.foreground = [];
			mapLoader.objects = {};

			mapLoader.xml = document.createElement('div');//XML.parser(str);
			mapLoader.xml.innerHTML = str;
			var layers = mapLoader.xml.getElementsByTagName('layer');

			for(var i = 0;i < layers.length;i++) {//レイヤー
				var isCollision = layers[i].getAttribute('name').toLowerCase() === 'collision';
				var isForeground = /^foreground/.test(layers[i].getAttribute('name').toLowerCase());
				var isUnvisible = layers[i].getAttribute('visible') === '0';

				var encoding = layers[i].getElementsByTagName('data')[0].getAttribute('encoding');
				if(encoding !== 'csv') {
					alert('Tiled Map Editorの編集＞設定から「レイヤーデータの保持方法」をCSVに設定してください');
					return false;
				}

				if(isUnvisible && !isCollision) {
					continue;
				}
				var lines = layers[i].getElementsByTagName('data')[0].innerHTML.split(',\n');
				//レイヤーごとの行
				for(var j = 0;j < lines.length;j++) {
					var params = lines[j].split(',');
					//行ごとのパラメータ
					for(var k = 0;k < params.length;k++) {
						if(isCollision) {
							params[k] = params[k] > 0 ? 1 : 0;
						} else {
							params[k] = parseInt(params[k], 10) - 1;
						}
					}
					lines[j] = params;
				}
				if(isCollision) {
					mapLoader.collision = lines;
				} else if(isForeground) {
					mapLoader.foreground.push(lines);
				} else {
					mapLoader.map.push(lines);
				}
			}

			var objects = mapLoader.xml.getElementsByTagName('object');
			mapLoader.objDOM = objects;
			for(var j = 0;j < objects.length;j++) {
				var name = objects[j].getAttribute('name');
				if(name) {
					mapLoader.objects[name] = {};
					//console.dir(objects);
					createFromAttr(objects[j], mapLoader.objects[name]);
					var properties = objects[j].getElementsByTagName('property');
					for(var k = 0;k < properties.length;k++){
						createFromAttr(properties[k], mapLoader.objects[name]);
					}
				}
			}
		} catch (e) {
			console.log(e);
		}
		return mapLoader;
	}

	return that;
}());
