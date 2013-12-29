/**
 * ProgramLayer
 */
var ProgramLayer = (function(){
    var that = {};

    that.init = function(x, y) {
        var my = {};
        var game = enchant.Game.instance;
        var group = new Group();

        my.CodeTexts = {};
        my.CodeTexts[Command.type.go]       = 'go();';
        my.CodeTexts[Command.type.gojump]   = 'goJump();';
        my.CodeTexts[Command.type.back]     = 'back();';
        my.CodeTexts[Command.type.backjump] = 'backJump();';
        my.CodeTexts[Command.type.sunny] = 'if sunny:';
        my.CodeTexts[Command.type.rainy] = 'if rainy:';
        my.CodeTexts[Command.type.func1] = 'func1();';
        my.CodeTexts[Command.type.func2] = 'func2();';

        group.codeMainLayer = new Group();
        group.codeFunc1Layer = new Group();
        group.codeFunc2Layer = new Group();

        group.syncJobQueueToProgramBoard = function(jobQueue) {
            my.syncJobQueueMainToProgramBoard(jobQueue.main);
            my.syncJobQueueFuncToProgramBoard(jobQueue.func1, jobQueue.func2);
        };

        my.syncJobQueueMainToProgramBoard = function(jobQueueMain) {
            group.removeChild(group.codeMainLayer);
            group.codeMainLayer = new Group();
            var indentFlag = false;
            for (var i = 0; i < jobQueueMain.length; i++) {
                var job = jobQueueMain[i];
                var label = new Label();
                label.text = my.CodeTexts[job];
                label.font = '18px MarkerFelt';
                var indent = 0;
                if (i > 0) {
                    var beforeJob = jobQueueMain[i-1];
                    indent = (beforeJob == Command.type.sunny || beforeJob == Command.type.rainy) ? 30 : 0;
                }
                label.x = 45 + indent;
                label.y = 30 + 35 * parseInt(i);
                group.codeMainLayer.addChild(label);
            }
            group.addChild(group.codeMainLayer);
        };

        my.syncJobQueueFuncToProgramBoard = function(jobQueueFunc1, jobQueueFunc2) {
            group.removeChild(group.codeFunc1Layer);
            group.codeFunc1Layer = new Group();
            group.codeFunc1Layer.x = 205;
            for (var i = 0; i < jobQueueFunc1.length; i++) {
                var job = jobQueueFunc1[i];
                var label = new Label();
                label.text = my.CodeTexts[job];
                label.font = '18px MarkerFelt';
                label.x = 0;
                label.y = 60 + 35 * parseInt(i);
                group.codeFunc1Layer.addChild(label);
            }
            group.addChild(group.codeFunc1Layer);

            group.removeChild(group.codeFunc2Layer);
            group.codeFunc2Layer = new Group();
            group.codeFunc2Layer.x = 205;
            group.codeFunc2Layer.y = 140;
            for (var i = 0; i < jobQueueFunc2.length; i++) {
                var job = jobQueueFunc2[i];
                var label = new Label();
                label.text = my.CodeTexts[job];
                label.font = '18px MarkerFelt';
                label.x = 0;
                label.y = 60 + 35 * parseInt(i);
                group.codeFunc2Layer.addChild(label);
            }
            group.addChild(group.codeFunc2Layer);
        };

        my.setWhiteBoard = function(game, group) {
            var whiteBoard = new Sprite(353,331);
            whiteBoard.x = 0;
            whiteBoard.y = 0;
            whiteBoard.image = game.assets[poipoi.imgPaths['program_white_board']];
            whiteBoard.scaleX = 0.8;
            group.addChild(whiteBoard);
            return whiteBoard;
        };

        my.setTitles = function(group) {
            var labelTitleFuncList = [
                {'name':'func1','x':185,'y':30},
                {'name':'func2','x':185,'y':30 + 35 * 4},
            ];
            for (var i = 0; i < labelTitleFuncList.length; i++) {
                var name = labelTitleFuncList[i].name;
                var x = labelTitleFuncList[i].x;
                var y = labelTitleFuncList[i].y;
                var labelTitleFunc = new Label();
                labelTitleFunc.text = name + ' :';
                labelTitleFunc.font = '18px MarkerFelt';
                labelTitleFunc.x = x;
                labelTitleFunc.y = y;
                group.addChild(labelTitleFunc);
            }
        };

        return (function(){
            my.setWhiteBoard(game, group);
            my.setTitles(group);
            group.moveTo(x,y);
            return group;
        }());
    };

    return that;
}());