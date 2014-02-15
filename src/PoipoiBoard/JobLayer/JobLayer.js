/**
 * JobLayer
 * @link https://confluence.gree-office.net/pages/viewpage.action?pageId=105847379
 */
var JobLayer = (function(){
    var that = {};

    that.init = function(x, y, jobFrameRows, jobFrameColumns, jobType) {
        if(typeof jobType === 'undefined') jobType = JobFrame.TYPE.DEFAULT;
        var my = {};
        var group = new Group();

        group.type = jobType;

        my.jobQueue = [];
        my.jobSprs = [];
        my.jobFrameSprs = [];
        my.jobFrameMargin = {'x':18,'y':20};

        my.jobFrameRows = jobFrameRows;
        my.jobFrameColumns = jobFrameColumns;

        my.jobQueueMax = my.jobFrameRows * my.jobFrameColumns;

        my.currentJobId = -1;

        my.jobFlash = null;

        my.getJobFramePosition = function(jobFrameId) {
            return {
                'x' : (JobFrame.size.width + my.jobFrameMargin.x) * parseInt(jobFrameId % my.jobFrameRows),
                'y' : (JobFrame.size.height + my.jobFrameMargin.y) * parseInt(jobFrameId / my.jobFrameRows),
            };
        };

        my.setJobFrameSprs = function(group, rows, columns) {
            for (var i = 0; i < rows * columns; i++) {
                var jobFramePos = my.getJobFramePosition(i);
                var jobFrameSpr = JobFrame.makeSprite(jobFramePos.x, jobFramePos.y, jobType);
                jobFrameSpr.id = i;
                my.jobFrameSprs.push(jobFrameSpr);
                group.addChild(jobFrameSpr);
            }
            return my.jobFrameSprs;
        };

        my.setJobFlash = function(x, y) {
            my.jobFlash = JobFlash.makeSprite(x, y);
            my.jobFlash.opacity = 0.3;
            group.addChild(my.jobFlash);
        };

        /**
         * insertJobQueue
         * @access private
         * @param int jobFrameId
         * @param Command.type commandType
         * @return bool
         */
        my.insertJobQueue = function(jobFrameId, commandType) {
            if (my.jobQueue.length >= my.jobQueueMax) {
                return false;
            }
            my.jobQueue.splice(jobFrameId, 0, commandType);
            return true;
        };

        /**
         * insertJobSpr
         * @access private
         * @param Group group  :this layer group
         * @param int jobFrameId
         * @param Command.type commandType
         * @return bool
         */
        my.insertJobSpr = function(group, jobFrameId, commandType) {
            if (my.jobSprs.length >= my.jobQueueMax) {
                return false;
            }
            var jobSprPos = my.getJobFramePosition(jobFrameId);
            var jobSpr = Command.makeSprite(jobSprPos.x, jobSprPos.y, commandType);
            my.jobSprs.splice(jobFrameId, 0, jobSpr);
            my.addTouchTriggerToJobSpr(group, jobSpr);
            group.addChild(jobSpr);
            return true;
        };

        /**
         * removeJobQueue
         * @access private
         * @param int jobId
         * @return bool
         */
        my.removeJobQueue = function(jobId) {
            if (my.jobQueue.length < jobId) {
                return false;
            }
            my.jobQueue.splice(jobId, 1);
            return true;
        };

        /**
         * removeJobSpr
         * @access private
         * @param Group group
         * @param CommandSpr jobSpr
         * @return bool
         */
         my.removeJobSpr = function(group, jobSpr) {
            var jobSprId = jobSpr.id;
            if (my.jobSprs.length < jobSprId) {
                return false;
            }
            group.removeChild(jobSpr);
            my.jobSprs.splice(jobSprId, 1);
            return true;
         };

        /**
         * syncPositionAndIdOfJobSprs
         * @access private
         */
        my.syncPositionAndIdOfJobSprs = function(group) {
            for (var i = 0; i < my.jobSprs.length; i++) {
                var jobSpr = my.jobSprs[i];
                jobSpr.id = i;
                var jobSprPos = my.getJobFramePosition(i);
                jobSpr.moveTo(jobSprPos.x, jobSprPos.y);
            }
            var syncJobsEvent = new enchant.Event('SyncJobs');
            group.dispatchEvent(syncJobsEvent);
        };

        /**
         * addTouchTriggerToJobSpr
         * @access private
         * @param Group group
         * @param CommandSpr jobSpr
         */
        my.addTouchTriggerToJobSpr = function(group, jobSpr) {
            jobSpr.addEventListener('touchstart', function(){
                my.removeJobQueue(jobSpr.id);
                my.removeJobSpr(group, jobSpr);
                my.syncPositionAndIdOfJobSprs(group);
            });
        };

        group.getJobFrameSprs = function() {
            return my.jobFrameSprs;
        };
        /**
         * insertJob
         * @access public
         * @param int jobFrameId
         * @param CommandSpr commandSpr
         * @return bool isSuccess
         */
        group.insertJob = function(jobFrameId, commandSpr) {
            my.insertJobQueue(jobFrameId, commandSpr.type);
            my.insertJobSpr(group, jobFrameId, commandSpr.type);
            my.syncPositionAndIdOfJobSprs(group);
        };

        group.getJobQueue = function() {
            return my.jobQueue;
        };

        group.updateCurrentJobId = function() {
            my.currentJobId += 1;
            if (my.currentJobId >= my.jobQueue.length) {
                my.currentJobId = -1;
                my.resetFlashJob();
                return false;
            }
            return true;
        };

        group.getCurrentJob = function() {
            return my.jobQueue[my.currentJobId];
        };

        group.flashCurrentJob = function() {
            my.resetFlashJob();
            var x = my.jobFrameSprs[my.currentJobId].x;
            var y = my.jobFrameSprs[my.currentJobId].y;
            my.setJobFlash(x, y);
        };

        my.resetFlashJob = function() {
            if (!my.jobFlash) {
                return false;
            }
            my.jobFlash.parentNode.removeChild(my.jobFlash);
            my.jobFlash = null;
            return true;
        };

        return (function(){
            var jobFrameSprs = my.setJobFrameSprs(group, my.jobFrameRows, my.jobFrameColumns);
            group.moveTo(x,y);
            return group;
        }());
    };

    return that;
}());
