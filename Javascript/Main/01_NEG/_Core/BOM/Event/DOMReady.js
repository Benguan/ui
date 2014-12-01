;(function (neg) {
    // 此方法待重构
    var isReady = false;
    var readyHandleQueue = [];

    var readyHandle = function () {
        neg.base.BOM.Event.removeEventListener(document, "readystatechange", ieReadyHandle);
        neg.base.BOM.Event.removeEventListener(document, "DOMContentLoaded", readyHandle);
        neg.base.BOM.Event.removeEventListener(window, "load", readyHandle);


        //readyHandle = function () { };
        
        //fn();
        var acctiveHandle;
        while (acctiveHandle = readyHandleQueue.shift()) {
            isReady || acctiveHandle();
        }
        isReady = true;
    }

    var ieReadyHandle = function () {
        //if (/loaded|interactive|complete/.test(document.readyState) && isReady == false) {
        if (/loaded|complete/.test(document.readyState) || isReady == true) {
            readyHandle();
        }
    };
    neg.base.BOM.Event.addEventListener(document, "readystatechange", ieReadyHandle);
    neg.base.BOM.Event.addEventListener(document, "DOMContentLoaded", readyHandle);
    neg.base.BOM.Event.addEventListener(window, "load", readyHandle);
    document.documentElement.doScroll && checkDoScroll();

    function checkDoScroll() {
        try {
            document.documentElement.doScroll("left");
        } catch (err) {
            setTimeout(checkDoScroll, 1);
            return
        }
        readyHandle();
    }

    function _domReady(fn) {
        if (isReady == true) {
            fn();
            return
        }
        readyHandleQueue.push(fn);

    }


    base.NS("NEG.base.BOM").DOMReady = _domReady;
})(NEG);
