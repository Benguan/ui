
; (function (neg) {
    var stringHelper = {
        trim: function (str) {
            return str.replace(/(^\s+)|(\s+$)/g, '');
        }
    };
    neg.utility && (neg.utility.String = stringHelper);
})(NEG)