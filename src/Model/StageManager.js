var StageManager = (function StageManager() {

    var that = {};
    var my   = {};
    var DATA = {
        'difficultyMax' : 1,
        1 : {
            'stageMax' : 3,
            1 : {
                'defaultWeather' : 'sunny',
                'bestScore'      : 4,
            },
            2 : {
                'defaultWeather' : 'rainy',
                'bestScore'      : 11,
            },
            3 : {
                'defaultWeather' : 'sunny',
                'bestScore'      : 12,
            },
        },
    };

    that.getDefaultWeather = function getDefaultWeather(difficulty, stageIndex) {
        my.validate(difficulty, stageIndex);
        return DATA[difficulty][stageIndex]['defaultWeather'];
    };

    that.getBestScore = function getBestScore(difficulty, stageIndex) {
        my.validate(difficulty, stageIndex);
        return DATA[difficulty][stageIndex]['bestScore'];
    }

    that.getStageMax = function getStageMax(difficulty) {
        my.validate(difficulty, 0);
        return DATA[difficulty]['stageMax'];
    };

    my.validate = function validate(difficulty, stageIndex) {
        if (DATA['difficultyMax'] < difficulty) {
            throw new Error('this difficulty is not defined: ' + difficulty);
        }
        if (DATA[difficulty]['stageMax'] < stageIndex) {
            throw new Error('this stage is not defined: ' + stage);
        }
    };

    return that;
}());
