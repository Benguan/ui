
; (function (neg) {
    var utility = {
        isType: function (obj, type) {
            //return Object.toString.call(obj).indexOf('[object ' + type) == 0 || !!(obj instanceof Number);
            return (type === "Null" && obj === null) ||
                (type === "Undefined" && obj === void 0) ||
                (type === "Number" && isFinite(obj)) ||
                 Object.prototype.toString.call(obj).slice(8, -1) === type;
        },
        getGUID: function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            }).toUpperCase();
        },
        getEnum: function () {
            var _enum = {};
            for (var i = 0; i < arguments.length; i++) {
                _enum[arguments[i]] = arguments[i];
            }
            return _enum;
        },
        isDefined: function (obj) {
            return typeof (obj) != "undefined";
        }
    };

    var scriptHelper = {
        documentWriteScript: (function (nativeWriteMethod) {
            var fixWriteMethod = function (msg) {
                //var reg = /<script.*?\bsrc\s*=\s*[\'"](.*?)['"].*?>.*?<\s*\/script\s*>/ig;
                var reg = /<script[^>]*?\bsrc\s*=\s*[\'"](.*?)['"][^>]*?>.*?(<\s*?\/script\s*?>)/ig;
                var scripts = [];
                msg = msg && msg.replace(reg, function (msg, script) {
                    script && scripts.push(script);
                    return ''
                });

                scripts.length > 0 && neg.base.BOM.Event.addEventListener(window, 'load', function () {
                    neg.base.BOM.loadJS(scripts);
                });
                nativeWriteMethod.call(document, msg);
            };

            return function (hasScript) {
                document.write = hasScript ? fixWriteMethod : nativeWriteMethod;
            };

        })(document.write)
    };
    utility.Script = scriptHelper;

    neg.utility = utility;
})(NEG)