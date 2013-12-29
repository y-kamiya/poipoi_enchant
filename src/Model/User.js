var User = (function User() {

    var that = {};
    var my   = {};

    that.init = function init() {
        var user = {};
        var data = my.getUserData();

        return _.extend(user, {
            set           : _.bind(my.set, user, data),
            get           : _.bind(my.get, user, data),
            save          : _.bind(my.save, user, data),
            setScore      : _.bind(my.setScore, user, data),
            getScore      : _.bind(my.getScore, user, data),
            getHighScore  : _.bind(my.getHighScore, user, data),
            setHighScore  : _.bind(my.setHighScore, user, data),
            makeStageKey  : _.bind(my.makeStageKey, user, data),
        });
    };

    my.getUserData = function getUserData() {
        var data = store.get('user');
        data = data || {};
        _.defaults(data, {
            currentDifficulty : 1,
            currentStageIndex : 1,
            clearedStageIndex : 0,
            highScore         : {},
            score             : {}
        });
        return data;
    };

    my.save = function save(data) {
        store.set('user', data);
    };

    my.setScore = function setScore(data, score) {
        var highScore = this.getHighScore();
        if (score < highScore) {
            this.setHighScore(score);
        }
        data.score[this.makeStageKey()] = score;
        store.set('user', data);
    };
    my.getScore = function getScore(data) {
        var score = data.score[this.makeStageKey()];
        if (!score) {
            score = 0;
        }
        return score;
    };
    my.setHighScore = function setHighScore(data, score) {
        data.highScore[this.makeStageKey()] = score;
    };
    my.getHighScore = function getHighScore(data) {
        var highScore = data.highScore[this.makeStageKey()];
        if (!highScore) {
            highScore = 0;
        }
        return highScore;
        
    };
    my.makeStageKey = function makeStageKey(data) {
        return data.currentDifficulty + '-' + data.currentStageIndex;
    };

    my.get = function get(data, key) {
        return data[key];
    };
    my.set = function set(data, key, value) {
        data[key] = value;
        store.set('user', data);
    };

    return that;
}());
