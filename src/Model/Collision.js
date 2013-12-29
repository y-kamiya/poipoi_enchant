var Collision = (function Collision() {

    var that = {};
    var my   = {};

    var COLLISION = {
        NO  : 0,
        YES : 1,
    };
    var ACTION = {
        GO             : 'go',
        GO_JUMP        : 'goJump',
        BACK           : 'back',
        BACK_JUMP      : 'backJump',
        DOWN           : 'down',
        WAIT           : 'wait',
        END            : 'end',
        CLEAR          : 'clear',
        NOT_CLEAR      : 'notClear',
        ATTACK_DROP    : 'attackDrop',
    };

    that.init = function init(screenLayer) {
        var collision = {};

        return _.extend(collision, {
            collisionData    : screenLayer.map.collisionData,
            player           : screenLayer.playerLayer.player,
            goal             : screenLayer.goal,
            enemyLayer       : screenLayer.enemyLayer,

            getActionList    : _.bind(my.getActionList, collision),
        });
    };

    my.getActionList = function(job) {
        var currentTileCoord = this.player.getCurrentTileCoord();
        var goalTileCoord   = this.goal.getCurrentTileCoord();

        if (my.isClear(currentTileCoord, goalTileCoord)) {
            return [ACTION.CLEAR];
        }
        if (!job) {
            return [ACTION.NOT_CLEAR];
        }


        var nextTileCoord = this.player.getNextTileCoord(my.job2Command(job));

        if (my.isCollision(nextTileCoord, this.collisionData)) {
            return [ACTION.WAIT, ACTION.END];
        }

        var actionList = [my.job2Command(job)];
        var downCount = my.getDownCount(nextTileCoord, this.collisionData);
        if (my.isCollisionEnemy(nextTileCoord, this.enemyLayer.enemyList)) {
            return [ACTION.NOT_CLEAR];
        }

        for (var i = 0; i < downCount; i++) {
            actionList.push(ACTION.DOWN);
        }
        if (my.isAttackedEnemy(nextTileCoord, this.enemyLayer.enemyList)) {
            actionList.pop();
            actionList.push(ACTION.ATTACK_DROP);

        }
        actionList.push(ACTION.END);


        return actionList;
    };

    my.isClear = function isClear(currentTileCoord, goalTileCoord) {
        if (_.isEqual(currentTileCoord, goalTileCoord)) {
            return true;
        }
        return false;
    };

    my.isCollision = function isCollision(nextTileCoord, collisionData) {
        if (collisionData[nextTileCoord.y][nextTileCoord.x] === COLLISION.YES) {
            return true;
        }
        return false;
    };

    my.isCollisionEnemy = function isCollisionEnemy(nextTileCoord, enemyList) {
        var length = enemyList.length
        for (var i = 0; i < length; i++) {
            var enemyTileCoord = enemyList[i].getCurrentTileCoord();
            if (_.isEqual(nextTileCoord, enemyTileCoord)) {
                return true;
            }
        };
        return false;
    };

    my.isAttackedEnemy = function isAttackedEnemy(nextTileCoord, enemyList) {
        var isAttack = false;
        var length = enemyList.length
        for (var i = 0; i < length; i++) {
            var enemyTileCoord = enemyList[i].getCurrentTileCoord();
            if (nextTileCoord.x === enemyTileCoord.x 
               && nextTileCoord.y < enemyTileCoord.y) {
                   enemyList[i].attacked();
                   isAttack = true;
            }
        };
        return isAttack;
    };

    my.job2Command = function job2Command(job) {
        if (!_.isString(job)) {
            throw new Error('[Collision job2Command] job is not String: ' + job);
        }
        return ACTION[job];
    };

    my.getDownCount = function getDownCount(nextTileCoord, collisionData) {
        var x = nextTileCoord.x;
        var y = nextTileCoord.y + 1;
        if (collisionData[y][x] === COLLISION.YES) {
            return 0;
        } else {
            return 1 + my.getDownCount({x:x, y:y}, collisionData);
        }
    };

    return that;

}());
