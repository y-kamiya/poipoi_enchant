var ClickPanel = (function ClickPanel() {

    var that = {};
    var my   = {};

    that.initByObjectData = function initByObjectData(imgName, objectData) {
        var initialPosition = {
            x: parseInt(objectData.player.x),
            y: parseInt(objectData.player.y),
        };
        return that.init(imgName, initialPosition);
    };


    that.init = function init(imgName, initialPosition) {
        var clickSprite = Charactor.init(imgName, initialPosition);
        clickSprite.width = poipoi.CLICK.WIDTH;
        clickSprite.height = poipoi.CLICK.HEIGHT;
        clickSprite.moveBy(0, -poipoi.CLICK.HEIGHT);
        clickSprite.tl.hide();
        
        return _.extend(clickSprite, { 
            action    : _.bind(my.action, clickSprite),
        });
    };
    
    my.action = function action(jobCount) {
        if (jobCount == 0) {
            this.tl.clear().hide();
            this.clearEventListener(enchant.Event.TOUCH_START);
        } else {
            this.tl.clear().show().delay(30).hide().delay(30).loop();
            this.on(enchant.Event.TOUCH_START, function() {
                var event = new enchant.Event(poipoi.event.actionStart);
                this.dispatchEvent(event);
                this.tl.clear().hide();
            });
        }
    };

    my.onTouchStart = function onTouchStart() {
    };

    return that;
}());
