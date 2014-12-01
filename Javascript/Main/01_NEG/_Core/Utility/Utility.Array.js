
; (function (neg) {
    var ap = Array.prototype;
    var arrayHelper = {
        indexOf: ap.indexOf
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
        }
    };
    neg.utility && (neg.utility.Array = arrayHelper);
})(NEG)