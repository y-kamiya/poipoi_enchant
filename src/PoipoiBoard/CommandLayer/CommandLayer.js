/**
 * CommandLayer
 */
var CommandLayer = (function(){
    var that = {};

    /**
     * init
     * @param int x  :group's coodinateX
     * @param int y  :group's coodinateY
     * @return Group group
     */
    that.init = function(x, y) {
        console.log('CommandLayer init');

        var group = new Group();
        var my = {};


        my.selectType = null;
        my.commandSprs = [];

        /**
         * getSelectedCommandSpr
         * @return CommandSpr commandspr  : touch selected command sprite
         */
        group.getSelectedCommandSpr = function() {
            for (var i = 0; i < my.commandSprs.length; i++) {
                var commandSpr = my.commandSprs[i];
                if (commandSpr.type == my.selectType) {
                    return commandSpr;
                }
            }
            return null;
        };

        /**
         * getCommandPos
         * @return nestedHash commandPos  : command position list
         *         {Command.type.xxxx : {'x':(int), 'y(int)'}, ..}
         */
        my.getCommandPos = function() {
            var commandPos = {},
                commandCount = 0;
            for (var key in Command.type) {
                // if (key=='func1') {
                //     commandPos[Command.type[key]] = {
                //         'x' : (Command.size.width + 15) * 4,
                //         'y' : 132
                //     };
                // } else if (key=='func2') {
                //     commandPos[Command.type[key]] = {
                //         'x' : (Command.size.width + 15) * 4,
                //         'y' : 233
                //     };
                // } else {
                    commandPos[Command.type[key]] = {
                        'x' : (Command.size.width + 15) * commandCount,
                        'y' : 20
                    };
                    commandCount += 1;
                // }
            }
            return commandPos;
        };

        /**
         * setCommandSprs
         * @param Group group
         * @return Array commandSprs
         */
        my.setCommandSprs = function(group) {
            var commandPos = my.getCommandPos();
            for(var key in Command.type){
                var type = Command.type[key];
                var commandSpr = Command.makeSprite(
                    commandPos[type].x,
                    commandPos[type].y,
                    type
                );
                my.commandSprs.push(commandSpr);
                group.addChild(commandSpr);
            }
            return my.commandSprs;
        };

        /**
         * addTouchTriggerToCommandSpr
         * @param Group group  :this layer group
         * @param CommandSpr commandSpr  : triggered sprite
         */
        my.addTouchTriggerToCommandSpr = function(group, commandSpr) {
            commandSpr.addEventListener('touchstart', function() {
                my.selectType = commandSpr.type;
            });
            commandSpr.addEventListener('touchmove', function(e) {
                // coodinate on commandLayer
                var relativeX = e.x - commandSpr.width/2;
                var relativeY = e.y - commandSpr.height/2;
                // absolute coodinate
                var x = relativeX - group._offsetX;
                var y = relativeY - group._offsetY;
                commandSpr.moveTo(x, y);
            });
            commandSpr.addEventListener('touchend', function(e) {
                // emit event
                var newevent = new enchant.Event('ReleaseCommand');
                group.dispatchEvent(newevent);
                // reset position
                var commandPos = my.getCommandPos();
                var pos = commandPos[my.selectType];
                commandSpr.moveTo(pos.x, pos.y);
                // reset selectType
                my.selectType = null;
            });
        };

        /**
         * addTouchTriggerToCommandSprs
         * @param Group group
         * @param Array commandSprs
         */
        my.addTouchTriggerToCommandSprs = function(group, commandSprs) {
            for (var i = 0; i < commandSprs.length; i++) {
                var commandSpr = commandSprs[i];
                my.addTouchTriggerToCommandSpr(group, commandSpr);
            }
        };

        return (function(){
            group.moveTo(x,y);
            var commandSprs = my.setCommandSprs(group);
            my.addTouchTriggerToCommandSprs(group, commandSprs);
            return group;
        }());
    };

    return that;
}());
