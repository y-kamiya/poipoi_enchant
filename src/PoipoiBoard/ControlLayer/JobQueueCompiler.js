/**
 * JobQueueCompiler
 *  - compile main and function jobQueue
 */
var JobQueueCompiler = (function(){

    var that = {};

    var compileFunc = function(jobQueueMain, name, jobQueueFunc) {
        var index = _.indexOf(jobQueueMain, Command.type[name]);
        if (index < 0) {
            console.log('return',jobQueueMain);
            return jobQueueMain;
        }
        var list1 = jobQueueMain.slice(0, index);
        var list2 = jobQueueMain.slice(index+1);
        var compiledJobQueueMain = [].concat(list1,jobQueueFunc,list2);
        return compileFunc(compiledJobQueueMain, name, jobQueueFunc);
    };

    that.compile = function(jobQueueOrigin) {
        console.log(jobQueueOrigin);
        var compiledQueue = compileFunc(jobQueueOrigin.main, 'func1', jobQueueOrigin.func1);
        compiledQueue = compileFunc(compiledQueue, 'func2', jobQueueOrigin.func2);
        return compiledQueue;
    };
    return that;
}());
