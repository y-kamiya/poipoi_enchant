/**
 * poipoi
 * global name space
 */
var poipoi = (function(){
    var that = {};
    that.imgDir = {
        'egg'                  : '../img/eggs/',
        'poipoiBoard'          : '../img/poipoi_board/',
        'gameScene'            : '../img/GameScene/',
        'programBoard'         : '../img/program_board/',
        'map'                  : '../img/map/',
        'chara'                : '../img/chara/',
        'clearMessage'         : '../img/clearMessage/',
        'gameScene'            : '../img/GameScene/',
        'weather'              : '../img/weather/',
        'resultScene'          : '../img/ResultScene/',
        'EndingScene'          : '../img/EndingScene/',
    };
	that.mapDir = '../map/';

    that.imgPaths = {
        'EggGo'                 : that.imgDir.egg + 'egg_go.png',
        'EggGoJump'             : that.imgDir.egg + 'egg_gojump.png',
        'EggBack'               : that.imgDir.egg + 'egg_back.png',
        'EggBackJump'           : that.imgDir.egg + 'egg_backjump.png',
        'EggSunny'              : that.imgDir.egg + 'sunny_egg.png',
        'EggRainy'              : that.imgDir.egg + 'rainy_egg.png',
        'EggFunc1'              : that.imgDir.egg + 'egg_func_1.png',
        'EggFunc2'              : that.imgDir.egg + 'egg_func_2.png',
        'MarkFunc1'             : that.imgDir.egg + 'egg_func_1_mark.png',
        'MarkFunc2'             : that.imgDir.egg + 'egg_func_2_mark.png',
        'start'                 : '../img/start.png',
        'poipoi_board_back'     : that.imgDir.poipoiBoard + 'poipoi_back.png',
        'home_button'           : that.imgDir.gameScene + 'home_button.png',
        'egg_bg'                : that.imgDir.egg + 'egg_bg.png',
        'egg_bg_func'           : that.imgDir.egg + 'egg_bg_func.png',
        'egg_playing'           : that.imgDir.egg + 'egg_playing.png',
        'program_white_board'   : that.imgDir.programBoard + 'program_white_board.png',
        'earth_tile'            : that.imgDir.map + 'earth.png',
        'player_clear'          : that.imgDir.chara + 'hiyoko_clear.png',
        'player_false'          : that.imgDir.chara + 'hiyoko_false.png',
        'player_end'            : that.imgDir.chara + 'hiyoko_end.png',
        'player_walk'           : that.imgDir.chara + 'hiyoko_walk.png',
        'worm'                  : that.imgDir.chara + 'worm.png',
        'clear'                 : that.imgDir.clearMessage + 'clear.png',
        'not_clear'             : that.imgDir.clearMessage + 'not_clear.png',
        'goal'                  : that.imgDir.gameScene + 'goal.png',
        'tutorial_back'         : that.imgDir.gameScene + 'tutorial_back.png',
        'finger'                : that.imgDir.poipoiBoard + 'finger.png',
        'borderHorizon'         : that.imgDir.poipoiBoard + 'border_horizon.png',
        'borderVertical'        : that.imgDir.poipoiBoard + 'border_vertical.png',
        'cloud'                 : that.imgDir.weather + 'cloud.png',
        'raindrop1'             : that.imgDir.weather + 'raindrop01.png',
        'raindrop2'             : that.imgDir.weather + 'raindrop02.png',
        'sun'                   : that.imgDir.weather + 'sun.png',
        'flower'                : that.imgDir.resultScene + 'flower.png',
        'ground'                : that.imgDir.resultScene + 'ground.png',
        'next'                  : that.imgDir.resultScene + 'next.png',
        'result'                : that.imgDir.resultScene + 'result.png',
        'tamago'                : that.imgDir.resultScene + 'tamago.png',
        'star'                  : that.imgDir.resultScene + 'star.png',
        'weed'                  : that.imgDir.resultScene + 'weed.png',
        'end_board'             : that.imgDir.EndingScene + 'end_board.png',
    };

	that.mapPaths = {};
    for (var i = 1; i < 5; i++) {
        for (var j = 1; j < 5; j++) {
            that.mapPaths['map' + i + '-' + j + '_sunny'] = that.mapDir + 'map' + i + '-' + j + '_sunny.tmx';
            that.mapPaths['map' + i + '-' + j + '_rainy'] = that.mapDir + 'map' + i + '-' + j + '_rainy.tmx';
        }
    }

    that.event = {
        'actionStart'     : 'playerActionStart', 
        'actionEnd'       : 'playerActionEnd', 
        'actionNotClear'  : 'playerActionNotClear', 
        'actionClear'     : 'playerActionClear', 
        ATTACK_DROP       : 'attackDrop',
    };


	that.MAP = {
        MAP_WIDTH    : 16,
        MAP_HEIGHT   : 8,
		TILE_WIDTH   : 63,
		TILE_HEIGHT  : 63,
		OFFSET_Y     : 30,
	};

    that.PLAYER = {
		WIDTH       : 80,
		HEIGHT      : 86.4,
    };

    that.ENEMY = {
		WIDTH       : 87,
        HEIGHT      : 81,
    };

    that.GOAL = {
        WIDTH       : 130.5,
        HEIGHT      : 193.5,
    };

    that.SCREEN = {
        OFFSET_Y     : -130,
    };

    that.NOT_CLEAR_PANEL = {
        WIDTH       : 425,
        HEIGHT      : 205,
    };
    that.CLEAR_PANEL = {
        WIDTH       : 540,
        HEIGHT      : 255,
    };

    that.RESULT = {
        GROUND : {
            WIDTH  : 1080,
            HEIGHT : 800,
            X      : 0,
            Y      : 0,
        },
        WEED : {
            WIDTH  : 935,
            HEIGHT : 380,
            1 : {
                X      : 30,
                Y      : 250,
            },
        },
        FLOWER : {
            WIDTH  : 122,
            HEIGHT : 127,
            1 : {
                X      : 25,
                Y      : 440,
            },
            2 : {
                X      : 100,
                Y      : 350,
            },
            3 : {
                X      : 350,
                Y      : 200,
            },
            4 : {
                X      : 700,
                Y      : 300,
            },
        },
        NEXT : {
            WIDTH  : 100,
            HEIGHT : 120,
            X      : 620,
            Y      : 595,
        },
        CLEAR : {
            WIDTH       : 540,
            HEIGHT      : 255,
            1 : {
                X      : 250,
                Y      : 10,
            },
        },
        RESULT : {
            WIDTH  : 630,
            HEIGHT : 167,
            X      : 200,
            Y      : 570,
        },
        TAMAGO : {
            WIDTH  : 300,
            HEIGHT : 349,
            1 : {
                X      : 370,
                Y      : 200,
            },
        },
        STAR : {
            WIDTH  : 300,
            HEIGHT : 349,
            1 : {
                X      : 150,
                Y      : 230,
            },
            2 : {
                X      : 600,
                Y      : 230,
            },
        },
        SCORE : {
            X : 330,
            Y : 640,
        },
        BEST_SCORE : {
            X : 415,
            Y : 685,
        },
    };

    that.ENDING = {
        BOARD : {
            WIDTH  : 1024,
            HEIGHT : 768,
        },
        CHARA : {
            WIDTH  : 505,
            HEIGHT : 388,
            X      : 250,
            Y      : 70,
        },
    };

    that.gameSize = {'width' : 1024, 'height' : 768};
    that.SKY_BLUE = 'rgb(132, 210, 219)';
    that.RAINY_BLUE = 'rgb(63, 123, 146)';
    that.FRAME_RATE = 30;

    that.MAIN_JOB_FRAME_ROWS = 4;
    that.MAIN_JOB_FRAME_COLUMNS = 2;
    return that;
}());
