; (function (NEG) {
    var base = NEG.base || {};
    var eventHandelList = {};
    function eventHandlePlus(dom, eventType, eventHandle) {
        return function (eventObject) {
            eventHandle.call(dom, eventObject);
        };
    }


    function updateEventAction(dom, eventType, eventHandle) {
        var eventHandles = eventHandelList[dom.GUID][eventType];
        function update(activeAction) {
            eventHandles.eventAction = function (eventAction, activeAction) {
                return function (eventObject) {
                    eventAction && eventAction.call(dom, eventObject);
                    activeAction.call(dom, eventObject);
                };
            }(eventHandles.eventAction, activeAction);
        }

        if (eventHandle) {
            update(eventHandle);
        }
        else {
            for (var i = 0; i < eventHandles.length; i++) {
                update(eventHandles[i]);
            }
        }
        return eventHandles.eventAction;
    }

    /**
    * @name NEG.base.BOM.Event.addEventListener
    * @class [DOM元素 事件侦听]
    * @param {[type]} dom         [事件宿主]
    * @param {[type]} eventType   [事件名]
    * @param {[type]} eventHandle [事件处理句柄]
    * @param {[type]} option      [配置选项,option.Parameter]
    */
    function addEventListener(dom, eventType, eventHandle, option) {
        option = option || {};
        dom.GUID = dom.GUID || base.getGUID();
        var eventHandles = base.NS(dom.GUID, eventHandelList)[eventType] = (base.NS(dom.GUID, eventHandelList)[eventType] || []);
        var fixFn = eventHandlePlus(dom, eventType, eventHandle);
        eventHandles.push(fixFn);
        if (eventHandles[eventHandle]) {
            var temp = [];
            temp.push(eventHandles[eventHandle]);
            temp.push(fixFn);
            eventHandles[eventHandle] = temp;
        } else {
            eventHandles[eventHandle] = fixFn;
        }
        eventHandles.eventAction = updateEventAction(dom, eventType, fixFn);

        if (dom.addEventListener) {
            dom.addEventListener(eventType, fixFn, false);
        }
        else if (dom.attachEvent) {
            dom.attachEvent('on' + eventType, fixFn);
        }

        /*else {
           var handle = dom['on' + eventType];
           if (typeof handle == 'function') {
               dom['on' + eventType] = function () {
                   handle();
                   fixFn();
               }
           } else {
               dom['on' + eventType] = fixFn;
           }
       }*/
    }

    /**
    * @name NEG.base.BOM.Event.removeEventListener
    * @class [DOM元素 移除事件侦听]
    * @param {[type]} dom         [事件宿主]
    * @param {[type]} eventType   [事件名]
    * @param {[type]} eventHandle [事件处理句柄:若没有指定会将targetId和对应eventName的事件句柄全部清除]
    * @param {[type]} option      [配置选项]
    */

    function removeEventListener(dom, eventType, theEventHandle, option) {
        option = option || {};
        var eventHandleToBeRemoved = eventHandelList[dom.GUID][eventType][theEventHandle];

        var removeEventHandle = function (eventHandle) {
            if (eventType && eventHandle) {
                if (dom.removeEventListener) {
                    dom.removeEventListener(eventType, eventHandle, false);
                } else if (dom.detachEvent) {
                    dom.detachEvent('on' + eventType, eventHandle);
                }
                //action.splice(base.ArrayIndexOf(action,eventHandle),1);
            } else if (eventType && !eventHandle) {
                //delete eventHandelList[dom.GUID][eventType];
                for (var i = 0; i < eventHandelList[dom.GUID][eventType].length; i++) {
                    removeEventListener(dom, eventType, eventHandelList[dom.GUID][eventType][i], option);
                }
                ;
            } else {
                var typeList = eventHandelList[dom.GUID];
                //delete eventHandelList[dom.GUID];
                for (var eventTypeItem in typeList) {
                    removeEventListener(dom, eventTypeItem);
                }
            }
        };
        if (NEG.utility.isType(eventHandleToBeRemoved, "Array")) {
            for (var i = 0; i < eventHandleToBeRemoved.length; i++) {
                removeEventHandle(eventHandleToBeRemoved[i]);
            }
        } else {
            removeEventHandle(eventHandleToBeRemoved);
        }
    }

    /**
    * @name NEG.base.BOM.Event.dispatchEvent
    * @class [DOM元素 广播事件]
    * @param {[type]} dom         [事件宿主]
    * @param {[type]} eventType   [事件名]
    * @param {[type]} option      [配置选项]
    */
    function dispatchEvent(dom, eventType, option) {
        option = option || { bubbles: false, cancelable: false };
        option.ieHack = dom.all && dom.all.toString(); // 规避 IE 异常，当 dom 不在DOM树时，IE7下 fireEVent会抛出异常；此处采用赋值操作以避免js压缩时清除冗余语句；


        if (document.createEvent) {
            var evt = document.createEvent("Event");
            evt.initEvent(eventType, option.bubbles, option.cancelable);
            dom.dispatchEvent(evt);
        }
        else if (document.createEventObject) {
            eventType = 'on' + eventType;
            var evt = document.createEventObject();
            evt.cancelBubble = option.cancelable;
            dom.fireEvent(eventType, evt);
        }
    }

    /**
    * @name NEG.base.BOM.Event.isEventSupported
    * @class [isEventSupported 判断指定HTML元素是否原生支持指定事件]
    * @param  {[HTMLElement]}  dom       [目标HTML元素]
    * @param  {[string]}  eventType [事件名]
    * @param  {[object]}  option    [扩展选项]
    * @return {Boolean}           [支持返回true ，不支持返回false]
    */
    function isEventSupported(dom, eventType, option) {
        if (!base.BOM.Utility.isHTMLElement(dom)) { return false }
        option = option || {};

        var elementName = dom.tagName;
        var eventType = 'on' + eventType;
        dom = (dom === window) ?
            window :
                  document.createElement(elementName);

        var isSupported = (eventType in dom);

        if (!isSupported && ("setAttribute" in window)) {
            dom.setAttribute(eventType, "return;");
            isSupported = typeof dom[eventType] === "function";
        }

        if (dom !== window) {
            dom = null;
        }

        return isSupported;
    }

    base.NS("NEG.base.BOM").Event = {
        addEventListener: addEventListener
       , removeEventListener: removeEventListener
       , dispatchEvent: dispatchEvent
       , isEventSupported: isEventSupported
    };
})(NEG);
