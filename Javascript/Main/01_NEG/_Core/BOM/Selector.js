;(function($,neg){
    if(!$){
        throw('jQuery not found!');
    }
    var selector = function(queryString){
        return $(queryString);       
    };
    neg.base.BOM.Selector = selector;
})(window.jQuery,NEG);