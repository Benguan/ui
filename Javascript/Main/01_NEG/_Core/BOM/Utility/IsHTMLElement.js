;(function (neg) {
    var bom = neg.base.BOM = neg.base.BOM || {};
    bom.Utility = bom.Utility || {};
    function isHTMLElement(obj) {
        var _isHTMLElement = obj == document || obj == window;
        var testNodeName = function (target) {
            var nodeName = target.nodeName;
            return nodeName &&
                document.createElement(nodeName).constructor === target.constructor
        };
        return _isHTMLElement || testNodeName(obj);
    }

    /**
    * @name NEG.base.BOM.Utility.isHTMLElement
    * @class [判断是否是HTML元素]
    * @param {Object} obj [被判断对象]
    * @return {Bool} 是否是HTML元素
    * @example
    * NEG.base.BOM.Utility.isHTMLElement(document.body);
    * 结果：返回true
    *
    * NEG.base.BOM.Utility.isHTMLElement("document.body");
    * 结果：返回false
    */
    bom.Utility.isHTMLElement = isHTMLElement;
})(NEG);