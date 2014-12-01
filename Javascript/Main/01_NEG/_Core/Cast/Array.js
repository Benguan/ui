
internalClass._Array = (function () {
    var constructor = function (array) {
        this.source = array;
    };

    var thePrototype = (function () {
        var result = {};
        var ap = Array.prototype;
        var baseFn = ["join", "toString", "pop", "push", "concat", "reverse", "shift", "unshift", "slice", "splice", "sort"];
        for (var i = 0; i < baseFn.length ; i++) {
            (function (arg) {
                result[arg] = function () {
                    return ap[arg].apply(this.source, arguments);
                };
            })(baseFn[i]);
        }

        //ECMAScript5 functions implement
        if ("indexOf" in ap && ap.indexOf) {
            result.indexOf = function () {
                return ap.indexOf.apply(this.source, arguments);
            };
        } else {
            result.indexOf = function (obj) {
                var i = this.source.length;
                for (; i--;) {
                    if (this.source[i] === obj) {
                        break;
                    }
                }
                return i;
            };
        }
        result.addRange = function (array) {
            if (array) {
                var len = array.length;
                if (len && array instanceof Array) {
                    len > 0 && ap.push.apply(this.source, array);
                } else {
                    this.source.push(array);
                }
                return this.source.length;
            }
        };
        return result;
    })();

    //begin customlize function
    thePrototype.constructor = constructor;

    thePrototype.each = function (fn) {
        var len = this.source.length;
        for (var i = 0; i < len; i++) {
            var res = fn.apply(this.source[i], [this.source[i], i]);
            if (res) {
                break;
            }
        };
    };

    thePrototype.get = function (index) {
        if (typeof index == "number") {
            return this.source[index];
        }
        return null;
    };

    constructor.prototype = thePrototype;
    return constructor;
})();

