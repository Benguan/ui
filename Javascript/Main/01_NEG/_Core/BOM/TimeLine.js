;(function (neg, window) {
    neg = neg || {};
    var base = neg.base || {};
    var timeLine = []
       , timeoutHandel
       , timeLineControler = {
           start: function (timeLine) {
               this.isStart = true;
               var controler = this;
               this.timerHandle = window.setInterval(function () {
                   timeLine.length || controler.stop();
                   var taskIndex = timeLine.length;
                   while ((function () {
                       var currentTask = timeLine[--taskIndex]
                       , currentDate = ~ ~new Date();
                       controler.isStart && currentTask
                                          && currentDate >= currentTask.timestamp
                                          && function () {
                                              currentTask.fn && currentTask.fn();
                                              timeLine.splice(taskIndex, 1);
                                          } ();
                       return (controler.isStart && currentTask);
                   })()) { }
               }, 0);
           } // #end start

            , timerHandle: null
            , isStart: false
            , stop: function () {
                this.isStart = false;
                window.clearInterval(this.timerHandle);
                this.timerHandle = null;
            }
            , add: function (fn, timeout) {
                timeLine.push({ fn: fn, timeout: timeout, timestamp: ~ ~new Date() + timeout });
                this.timerHandle || this.start(timeLine);

            }
        };
    /**
    * @name NEG.base.BOM.TimeLine
    * @class [时间轴函数]
    * @param [Function] fn [函数句柄]
    * @param [Int] timeout [TimeOut时间，以毫秒为单位]
    */
    base.BOM.TimeLine = function (fn, timeout) {
        timeLineControler.add(fn, timeout);
    };
})(NEG, window);