var Goal = (function Goal() {

    var that = {};
    var my   = {};

    that.initByObjectData = function initByObjectData(imgName, objectData) {
        var initialPosition = {
            x : parseInt(objectData.goal.x),
            y : parseInt(objectData.goal.y),
        };
        return that.init(imgName, initialPosition);
    };


    that.init = function init(imgName, initialPosition) {
        var goal = Charactor.init(imgName, initialPosition);
        my.initialize.call(goal, imgName, initialPosition);

        return _.extend(goal, {
        });
    }

    my.initialize = function initialize(imgName, initialPosition) {
        this.width = poipoi.GOAL.WIDTH;
        this.height = poipoi.GOAL.HEIGHT;
        // TODO もっとよい座標の取り方考えるべき
        this.moveTo(initialPosition.x, initialPosition.y - poipoi.GOAL.HEIGHT + poipoi.PLAYER.HEIGHT);
    };

    return that;
}());
