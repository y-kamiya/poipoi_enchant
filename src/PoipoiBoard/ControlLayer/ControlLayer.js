/**
 * ControlLayer
 */
var ControlLayer = (function() {
    var that = {};

    that.init = function(x, y) {
        console.log('ControlLayer init');
        var my = {};
        var game = enchant.Game.instance;
        var group = new Group();
        my.jobLayerStack = [];

        my.setBackGroundSpr = function(game, group) {
            var backGroundSpr = new Sprite(603,337);
            backGroundSpr.x = -35;
            backGroundSpr.y = 0;
            backGroundSpr.image = game.assets[poipoi.imgPaths['poipoi_board_back']];
            backGroundSpr.scaleX = 1.1;
            group.addChild(backGroundSpr);

            var borderHorizon = new Sprite(559, 11);
            borderHorizon.x = -15;
            borderHorizon.y = 115;
            borderHorizon.image = game.assets[poipoi.imgPaths['borderHorizon']];
            borderHorizon.scaleX = 1.15;
            group.addChild(borderHorizon);

            var borderVertical = new Sprite(20, 293);
            borderVertical.x = 270;
            borderVertical.y = 80;
            borderVertical.image = game.assets[poipoi.imgPaths['borderVertical']];
            borderVertical.scaleX = 0.8;
            borderVertical.scaleY = 0.7;
            group.addChild(borderVertical);
        };

        my.setFuncMarkSpr = function(game, group) {
            var funcMarkSpr1 = new Sprite(43,36);
            funcMarkSpr1.x = 300;
            funcMarkSpr1.y = 160;
            funcMarkSpr1.image = game.assets[poipoi.imgPaths['MarkFunc1']];
            group.addChild(funcMarkSpr1);

            var funcMarkSpr2 = new Sprite(43,36);
            funcMarkSpr2.x = 300;
            funcMarkSpr2.y = 260;
            funcMarkSpr2.image = game.assets[poipoi.imgPaths['MarkFunc2']];
            group.addChild(funcMarkSpr2);
        };

        /**
         * CommandSprとJobFrameSprsの衝突を見て、衝突しているjobFrameSprを返す
         * @access private
         * @param JobLayer jobLayer
         * @param CommandSpr commandSpr
         * @param Array jobFrameSprs
         * @return JobFrameSpr jobFrameSpr
         */
        my.getCollisionJobFrameSpr = function(jobLayer, commandSpr) {
            var jobFrameSprs = jobLayer.getJobFrameSprs();
            for (var i = 0; i < jobFrameSprs.length; i++) {
                jobFrameSpr = jobFrameSprs[i];
                if (!jobFrameSpr.intersect(commandSpr)) {
                    continue;
                }
                // if jobLayer's type is FUNCTION, deny special type command.
                if (jobLayer.type == JobFrame.TYPE.FUNCTION) {
                    if (commandSpr.type==Command.type.sunny ||
                        commandSpr.type==Command.type.rainy ||
                        commandSpr.type==Command.type.func1 ||
                        commandSpr.type==Command.type.func2) {
                            return;
                    }
                }
                return jobFrameSpr;
            }
            return;
        };

        my.getJobQueueOrigin = function() {
            var jobQueueMain = jobLayer.getJobQueue();
            var jobQueueFunc1 = jobLayerFunc1.getJobQueue();
            var jobQueueFunc2 = jobLayerFunc2.getJobQueue();
            return {
                'main'  : jobQueueMain,
                'func1' : jobQueueFunc1,
                'func2' : jobQueueFunc2
            };
        };


        group.getNextJob = function(weather) {
            if (my.jobLayerStack.length === 0) {
                my.jobLayerStack.unshift(jobLayer);
                return;
            }
            var currentJobLayer = my.jobLayerStack[0];
            var isUpdated = currentJobLayer.updateCurrentJobId();
            if (!isUpdated) {
                my.jobLayerStack.shift();
                return group.getNextJob();
            }

            nextJob = currentJobLayer.getCurrentJob();
            currentJobLayer.flashCurrentJob();

            if (nextJob == Command.type.func1) {
                my.jobLayerStack.unshift(jobLayerFunc1);
                return group.getNextJob(weather);
            }
            if (nextJob == Command.type.func2) {
                my.jobLayerStack.unshift(jobLayerFunc2);
                return group.getNextJob(weather);
            }
            if (nextJob == Command.type.sunny) {
                if (weather != WeatherLayer.WEATHER.SUNNY) {
                    currentJobLayer.updateCurrentJobId();
                }
                return group.getNextJob(weather);
            }
            if (nextJob == Command.type.rainy) {
                if (weather != WeatherLayer.WEATHER.RAINY) {
                    currentJobLayer.updateCurrentJobId();
                }
                return group.getNextJob(weather);
            }
            return nextJob;
        };

        group.resetFlashJob = function() {
            jobLayer.resetFlashJob();
            jobLayerFunc1.resetFlashJob();
            jobLayerFunc2.resetFlashJob();
        };

        group.getMainJobQueueLength = function() {
            return jobLayer.getJobQueue().length;
        };

        my.syncJobs = function() {
            var jobQueueOrigin = my.getJobQueueOrigin();
            programLayer.syncJobQueueToProgramBoard(jobQueueOrigin);
        };

        my.setBackGroundSpr(game, group);
        my.setFuncMarkSpr(game, group);

        var jobLayer = JobLayer.init(-50, 135, poipoi.MAIN_JOB_FRAME_ROWS, poipoi.MAIN_JOB_FRAME_COLUMNS);
        group.addChild(jobLayer);

        var jobLayerFunc1 = JobLayer.init(360, 135, 3, 1, JobFrame.TYPE.FUNCTION);
        group.addChild(jobLayerFunc1);

        var jobLayerFunc2 = JobLayer.init(360, 235, 3, 1, JobFrame.TYPE.FUNCTION);
        group.addChild(jobLayerFunc2);

        var commandLayer = CommandLayer.init(-57,0);
        group.addChild(commandLayer);

        var programLayer = ProgramLayer.init(-420,4);
        group.addChild(programLayer);

        // set properties
        group.jobLayer = jobLayer;
        my.jobLayerStack.unshift(jobLayer);

        commandLayer.onReleaseCommand = function() {
            var commandSpr = commandLayer.getSelectedCommandSpr();
            var jobFrameSpr = my.getCollisionJobFrameSpr(jobLayer, commandSpr);
            if (typeof jobFrameSpr!=="undefined") {
                jobLayer.insertJob(jobFrameSpr.id, commandSpr);
            }
            var jobFrameSprFunc1 = my.getCollisionJobFrameSpr(jobLayerFunc1, commandSpr);
            if (typeof jobFrameSprFunc1!=="undefined") {
                jobLayerFunc1.insertJob(jobFrameSprFunc1.id, commandSpr);
            }
            var jobFrameSprFunc2 = my.getCollisionJobFrameSpr(jobLayerFunc2, commandSpr);
            if (typeof jobFrameSprFunc2!=="undefined") {
                jobLayerFunc2.insertJob(jobFrameSprFunc2.id, commandSpr);
            }
        };

        jobLayer.onSyncJobs = function() {
            my.syncJobs();
        };

        jobLayerFunc1.onSyncJobs = function() {
            my.syncJobs();
        };

        jobLayerFunc2.onSyncJobs = function() {
            my.syncJobs();
        };

        group.moveTo(x, y);
        return group;
    };

    return that;
}());
