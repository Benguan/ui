; (function (Global) {
    var neg = function (obj) {
        var isMath = Math && obj !== Math;
        var theType = typeof (obj);
        if (!isMath || theType == "number" || theType == "string" || theType == "boolean") {
            return;
        }
        return new avatar(obj);
    };

    function avatar(obj) {
        this.target = obj;
    }

    var selfElement = (function () {
        var scripts = document.getElementsByTagName("script");
        for (var i = scripts.length - 1 ; i >= 0 ; i--) {
            var theScript = scripts[i];
            if (/[$NEGFileName$]/.test(theScript.src)) {
                return theScript;
            }
        }
    })();

    var base = {
        avatarCore: avatar.prototype,
        base: _neg,
        baseURL: (selfElement && selfElement.src.replace(/\/[^\/]+$/, '/')) || [$baseURL$],
        CDNTimestamp: (selfElement && selfElement.getAttribute('data-CDNTimestamp')) || '',
        isDebug: [$isDebug$],
        init: function () {
            Global.NEG = neg.base.merge(neg, _neg);
            Global.NEGfixForOldVersion && base.blend(neg, Global.NEGfixForOldVersion, { cover: false });
            if (!base.isDebug) {
                delete Global.NEG.base;
                Global.NEG.VersionControl && delete Global.NEG.VersionControl;
                var freeze = Object.freeze;
                freeze && freeze(Global.NEG);
            }
        }
    }

    var _neg = { base: base };
    neg.base = base;
    neg.toString = function () { return "nesc-sh.mis.neweggec.developer.UI@newegg.com" };
    Global.NEG = _neg;
})(this);
