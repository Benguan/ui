
internalClass._String = (function () {
    var constructor = function (str) {
        this.source = str;
    };

    var thePrototype = (function () {
        var result = {};
        var sp = String.prototype;
        var baseFn = ["valueOf", "toString", "charAt", "charCodeAt", "concat", "indexOf", "lastIndexOf", "localeCompare", "match", "replace", "search", "slice", "split", "sub", "sup",
            "substring", "substr", "toLowerCase", "toLocaleLowerCase", "toUpperCase", "toLocaleUpperCase", "anchor", "link", "fontcolor", "fontsize", "big", "blink", "bold", "fixed", "italics", "small", "strike"];
        for (var i = 0; i < baseFn.length ; i++) {
            (function (arg) {
                result[arg] = function () {
                    return sp[arg].apply(this.source, arguments);
                };
            })(baseFn[i]);
        }

        //ECMAScript5 functions implement
        if ("trim" in sp && sp.trim) {
            result.trim = function () {
                return sp.trim.apply(this.source, arguments);
            };
        } else {
            result.trim = function () {
                return this.source.replace(/(^\s+)|(\s+$)/g, '');
            };
        }

        if ("trimLeft" in sp && sp.trim) {
            result.trimLeft = function () {
                return sp.trimLeft.apply(this.source, arguments);
            };
        } else {
            result.trimLeft = function () {
                return this.source.replace(/^\s+/, '');
            };
        }

        if ("trimRight" in sp && sp.trim) {
            result.trimRight = function () {
                return sp.trimRight.apply(this.source, arguments);
            };
        } else {
            result.trimRight = function () {
                return this.source.replace(/\s+$/, '');
            };
        }

        return result;
    })();


    //begin customlize function
    thePrototype.constructor = constructor;


    constructor.prototype = thePrototype;
    return constructor;
})();

