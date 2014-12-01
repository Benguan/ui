
; (function (neg) {
    base = neg.base || {};

    var ap = Array.prototype;

    var _base = {
        /**
        * @name NEG.base.merge
        * @class [merge 将其他对象赋到mainObj上]
        * @param  {Object} mainObj [merge对象到mainObj上]
        * @param  {Object} p1,p2,p3... [支持一次merge多个对象，从第二个参数开始]
        * @return {Object}         [返回merge之后的对象]
        * @example 
        * NEG.base.merge({x:1,y:1},{z:1},{a:1})
        * 结果：返回 {x:1,y:1,z:1,a:1}
        */
        merge: function (mainObj) {
            for (var index = 1; index < arguments.length; index++) {
                var sourceObj = arguments[index];
                for (var item in sourceObj) {
                    mainObj[item] = sourceObj[item];
                }
            }
            return mainObj;
        },

        blend: function (mainObj, attrSource, options) {
            var _options = {
                cover: true,
                mergePrototype: false
            };
            options = options ? _base.merge(_options, options) : _options;
            attrSource = [].concat(attrSource);
            var sourceLength = attrSource.length;
            for (var index = 0; index < sourceLength; index++) {
                var sourceObj = attrSource[index];
                for (var item in sourceObj) {
                    var rule1 = options.mergePrototype || sourceObj.hasOwnProperty(item);
                    var rule2 = options.cover || typeof (mainObj[item]) == "undefined";
                    if (rule1 && rule2) {
                        mainObj[item] = sourceObj[item];
                    }
                }
            }
            return mainObj;
        },
        /**
        * @name NEG.base.NS
        * @class [创建命名空间]
        * @param {String} NSString [要创建的命名空间，以点号隔开(Biz.Common)]
        * @param {Object} root [参数NSString的根节点，(默认是window)]
        * @return {Object} [返回创建的对象，若已存在则直接返回]
        * @example
        * NEG.base.NS("Biz.Common").ConsoleOne=function(){console.log(1);};
        * Biz.Common.ConsoleOne();
        * 结果：输出 1
        */
        NS: function (NSString, root) {
            var nsPath = NSString.split("."), ns = root || window || {}, root = ns;
            for (var i = 0, len = nsPath.length; i < len; i++) {
                ns[nsPath[i]] = ns[nsPath[i]] || {};
                ns = ns[nsPath[i]];
            };
            return ns;
        },
        /**
        * @name NEG.base.ArrayIndexOf
        * @class [返回对象存在数组的index,不存在返回-1]
        * @param {Array} array [操作的数组]
        * @param {Object} el [查找的对象]
        * @returns {number} [返回对象存在数组的Index,不存在返回-1]
        * @example
        * NEG.base.ArrayIndexOf([1,2,3,5],3);
        * 结果：返回 2
        */
        ArrayIndexOf: ap.indexOf
                    ? function (array, el) {
                        array = [].slice.call(array, 0);
                        return array.indexOf(el);
                    }
                    : function (array, el) {
                        for (var i = array.length, isExist = false; i-- && !isExist;) {
                            isExist = array[i] === el;
                            if (isExist) {
                                return i;
                            }
                        }
                        return i;
                    },

        each: function (array, fn) {
            array = [].concat(array);
            for (var i = array.length - 1; i >= 0; i--) {
                fn.call(array[i], i, array[i]);
            };
        },

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

        // , encodeHTML: function (str) {
        //     str = _base.isType(str, 'String') ? str : '';
        //     return str.replace(/\&/g, "&amp;").replace(/\>/g, "&gt;").replace(/\</g, "&lt;").replace(/\'/g, "&#039;").replace(/\"/g, "&quot;");
        // }

        // , decodeHTML: function (str) {
        //     str = _base.isType(str, 'String') ? str : '';
        //     return str.replace(/(&quot;)/g, "\"").replace(/(&#039;)/ig, "'").replace(/(&lt;)/ig, "<").replace(/(&gt;)/ig, ">").replace(/(&amp;)/ig, "&");
        // }
        //, Enum: function () {
        //    var _enum = {};
        //    for (var i = 0; i < arguments.length; i++) {
        //        _enum[arguments[i]] = arguments[i];
        //    }
        //    return _enum;
        //}
        //, documentWriteScript: function (nativeWriteMethod) {
        //    var fixWriteMethod = function (msg) {
        //        //var reg = /<script.*?\bsrc\s*=\s*[\'"](.*?)['"].*?>.*?<\s*\/script\s*>/ig;
        //        var reg = /<script[^>]*?\bsrc\s*=\s*[\'"](.*?)['"][^>]*?>.*?(<\s*?\/script\s*?>)/ig;
        //        var scripts = [];
        //        msg = msg && msg.replace(reg, function (msg, script) {
        //            script && scripts.push(script);
        //            return ''
        //        });

        //        scripts.length > 0 && neg.base.BOM.Event.addEventListener(window, 'load', function () {
        //            neg.base.BOM.loadJS(scripts);
        //        });
        //        nativeWriteMethod.call(document, msg);
        //    };

        //    return function (hasScript) {
        //        document.write = hasScript ? fixWriteMethod : nativeWriteMethod;
        //    }

        //}(document.write)        ,
        setBaseURL: function (url) {
            return neg.base.baseURL = url || neg.base.baseURL;
        },

        setCDNTimestamp: function (timestamp) {
            var base = neg.base;
            base.CDNTimestamp = timestamp || base.CDNTimestamp;
        }

        //, trim: function (str) {
        //    return str.replace(/(^\s+)|(\s+$)/g, '');
        //}
    };
    _base.merge(base, _base);
})(NEG);