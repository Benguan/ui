; (function (NEG) {

    var openAPI = {
        run: NEG.base.run,
        iRun: function (fn) { NEG.base.run(fn, true) },
        /**
        * @name NEG.on
        * @class [事件监听及广播]
        * @param {Object} eventName   [事件名]
        * @param {*} option [事件句柄 或 事件处理参数]
        */
        //, on: NEG.base.Event.publicDispatchEvent

        Module: NEG.base.Module,
        NS: NEG.base.NS,
        merge: NEG.base.merge,
        blend: NEG.base.blend,
        setCDNTimestamp: NEG.base.setCDNTimestamp,
        moduleURL: NEG.base.setBaseURL,
        loadJS: NEG.base.BOM.loadJS,
        domReady: NEG.base.BOM.DOMReady,

        ArrayIndexOf: NEG.utility.Array.indexOf,
        isType: NEG.utility.isType,
        encodeHTML: NEG.utility.Encoding.encodeHTML,
        decodeHTML: NEG.utility.Encoding.decodeHTML,
        Enum: NEG.utility.getEnum,
        documentWriteScript: NEG.utility.Script.documentWriteScript,
        trim: NEG.utility.String.trim
    },

    avatarAPI = {
        /**
        * @name NEG(id).on
        * @class [具体对象的事件绑定]
        * @param {Object} eventName   [事件名]
        * @param {Function} eventHandle [事件处理句柄:若没有指定会将targetId和对应eventName的事件句柄全部清除]
        * @param {Object} option      [配置选项]
        * @example
        * NEG("body").on("load",function(){console.info("i am ready");},{});
        * 结果：在onload时间后 输出 i am ready
        */
        on: function (eventType, eventHandle, option) {
            var target = this.target,
                base = NEG.base,
                addEventListener = (base.BOM.Utility.isHTMLElement(target) && base.BOM.Event.isEventSupported(target, eventType)) ?
               //, addEventListener = base.BOM.Utility.isHTMLElement(target) ?
                                       base.BOM.Event.addEventListener :
                                       base.Event.addEventListener;

            base.each(target, function (i, target) {
                addEventListener(target, eventType, eventHandle, option);
            });
            /*
            NEG.base.BOM.Selector(target).each(function(i,el){
                 addEventListener(el, eventType, eventHandle, option); 
              });*/
        },

        trigger: function (eventType, data) {
            var target = this.target,
                base = NEG.base,
                dispatchEvent = (base.BOM.Utility.isHTMLElement(target) && base.BOM.Event.isEventSupported(target, eventType)) ?
            //, dispatchEvent = base.BOM.Utility.isHTMLElement(target) ?
                                base.BOM.Event.dispatchEvent :
                                base.Event.dispatchEvent;

            base.each(target, function (i, target) {
                dispatchEvent(target, eventType, data);
            });
        },
        /**
        * @name NEG(id).off
        * @class [具体对象 事件移除]
        * @param {Object} eventName   [事件名]
        * @param {Function} eventHandle [事件处理句柄:若没有指定会将targetId和对应eventName的事件句柄全部清除]
        * @param {Object} option      [配置选项]
        * @example
        * var fn=function(){};
        * NEG("body").off("load",fn,{});
        */
        off: function (eventType, eventHandle, option) {
            if (arguments.length <= 0) { return }
            var target = this.target
                , base = NEG.base
                , removeEventListener = (base.BOM.Utility.isHTMLElement(target) && base.BOM.Event.isEventSupported(target, eventType))
                                      ? base.BOM.Event.removeEventListener
                                      : base.Event.removeEventListener

            base.each(target, function (i, target) {
                removeEventListener(target, eventType, eventHandle, option);
            });
        }
    };

    //base.on, base.off, base.trigger
    (function () {
        var hostProxy = {};
        var base = NEG.base;
        var isType = base.isType;
        var publicDispatchEvent = base.Event.publicDispatchEvent;
        var addEventListener = base.Event.addEventListener;

        var _on = function (eventName, option) {
            var args = [].slice.call(arguments, 0);
            if (option && isType(option, 'Function')) {
                args.unshift(hostProxy);
                addEventListener.apply(hostProxy, args);
            } else {
                publicDispatchEvent.apply(hostProxy, args);
            }
        },
        _trigger = function (eventName, data) {
            var args = [].slice.call(arguments, 0);
            publicDispatchEvent.apply(hostProxy, args);
        },
        _off = function (eventName, option) {
            var args = [].slice.call(arguments, 0);
            if (option && isType(option, 'Function')) {
                args.unshift(hostProxy);
                base.Event.removeEventListener.apply(hostProxy, args);
            }
        };

        openAPI.on = _on;
        openAPI.off = _off;
        openAPI.trigger = _trigger;
    })();

    //VersionControl
    (function () {
        if (NEG.VersionControl) {
            NEG.setVersion = NEG.VersionControl.setVersion;
            NEG.getVersion = NEG.VersionControl.getVersion;
        }
    })();

    NEG.base.merge(NEG.base.avatarCore, avatarAPI);
    NEG.base.merge(NEG, openAPI);
    NEG.base.init();
})(NEG);