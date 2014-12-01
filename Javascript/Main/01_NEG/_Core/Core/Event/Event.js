!function (neg) {
    var base = neg.base || {};

    var _Event = {};

    var eventList = [],
        targetList = [];

    function getTargetId(target) {
        var targetId = (targetId = base.ArrayIndexOf(targetList, target)) >= 0
                           ? targetId
                           : targetList.push(target) - 1;
        return targetId;
    };

    /**
    * @name NEG.base.Event.addEventListener
    * @class [非DOM元素 事件侦听]
    * @param {Object} target      [事件宿主]
    * @param {[type]} eventName   [事件名]
    * @param {Function} eventHandle [事件处理句柄]
    * @param {Object} option      [配置选项,option.Parameter]
    * @example
    */
    _Event.addEventListener = function (target, eventName, eventHandle, option) {

        option = option || {};
        option.Parameter = option.Parameter || [];
        //var targetList = eventList.targetList

        //获取事件目标id                
        var targetId = getTargetId(target),
        //压入事件处理句柄
            eventNames = eventList[eventName] = eventList[eventName] || {},
            eventHandles = eventNames[targetId] = eventNames[targetId] || [];
        eventHandles.eventHandleAction = eventHandles.eventHandleAction || function () { };
        var theEventHandle = { target: target, eventHandle: eventHandle, Parameter: option };
        eventHandles.push(theEventHandle);


        eventHandles.eventHandleAction = function (oldevts) {
            return function (data) {
                //var eventObjetc = {
                //    target: target
                //};
                oldevts(data);
                //eventHandle.apply(target, option.Parameter);
                eventHandle.call(theEventHandle.target, theEventHandle.target, data, theEventHandle.Parameter);
            };
        }(eventHandles.eventHandleAction, theEventHandle);
    };

    /**
    * @name NEG.base.Event.removeEventListener
    * @class [非DOM元素 移除事件侦听]
    * @param {Object} target      [事件宿主]
    * @param {[type]} eventName   [事件名]
    * @param {Function} eventHandle [事件处理句柄:若没有指定会将targetId和对应eventName的事件句柄全部清除]
    * @param {Object} option      [配置选项]
    */
    _Event.removeEventListener = function (target, eventName, eventHandle) {
        var targetId = getTargetId(target),
            eventHandles = eventList[eventName][targetId];
        eventHandles.eventHandleAction = function () { };

        var deletedNum = 0;
        var eventLen = eventHandles.length;
        for (var i = 0; i < eventLen; i++) {
            var index = i - deletedNum;
            /*
            *Modify by Ben 2012/04/28                
            *若没有指定eventHanlde,会将targetId和对应eventName的事件句柄全部清除
            */
            if (eventHandles[index] && eventHandles[index].eventHandle == eventHandle || !eventHandle) {
                eventHandles.splice(index, 1);
                deletedNum++;
            }
            else {
                eventHandles.eventHandleAction = function (oldevts, currentHandle) {
                    return function (data) {
                        oldevts(data);
                        currentHandle.eventHandle.call(currentHandle.target, currentHandle.target, data, currentHandle.Parameter);
                    };
                }(eventHandles.eventHandleAction, eventHandles[index]);
            }
        }
    };

    /**
    * @name NEG.base.Event.dispatchEvent
    * @class [非DOM元素 事件广播]
    * @param {Object} target      [事件宿主]
    * @param {String} eventName   [事件名]
    * @param {Function} eventHandle [事件处理句柄:若没有指定会将targetId和对应eventName的事件句柄全部清除]
    * @param {Object} option      [配置选项]
    */
    _Event.dispatchEvent = function (target, eventName, data) {
        /*
        switch (arguments.length) {
        case 2:
        var targetId = getTargetId(target),
        eventNames = eventList[eventName];
        eventNames[targetId] && eventNames[targetId].eventHandleAction();
        break;
        case 1:
        eventName = arguments[0];
        for (var targetId = 0; targetId < targetList.length; targetId++) {
        var currentTarget = targetList[targetId];
        currentTarget && arguments.callee(currentTarget, eventName);
        }
        }
        */

        var eventObjetc = {
            target: target
        };
        var targetId = getTargetId(target),
            eventNames = eventList[eventName];
        //eventNames && eventNames[targetId] && eventNames[targetId].eventHandleAction(data);
        //if (eventNames && eventNames[targetId]) {
        //    for (var i = 0; i < eventNames[targetId].length; i++) {
        //        eventNames[targetId][i].eventHandle.call(target, eventObjetc, data);
        //    }
        //}
        if (eventNames && eventNames[targetId]) {
            var theEventHandleAction = eventNames[targetId].eventHandleAction;
            theEventHandleAction && theEventHandleAction(data);
        }
    };

    _Event.publicDispatchEvent = function (eventName, data) {
        for (var targetId = 0; targetId < targetList.length; targetId++) {
            var currentTarget = targetList[targetId];
            currentTarget && _Event.dispatchEvent(currentTarget, eventName, data);
        }
    };

    base.Event = base.Event || {};
    base.Event = _Event;
}(NEG);