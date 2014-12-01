
; (function (neg) {

    var environment;
    var os = { Unknown: "Unknown", Window: "Window", Mac: "Mac", Linux: "Linux", FreeBSD: "FreeBSD" };
    var device = { Unknown: "Unknown", iPhone: "iPhone", iPad: "iPad", iPod: "iPod" };
    var browserType = { Unknown: "Unknown", IE: "IE", Firefox: "Firefox", Chrome: "Chrome", Opera: "Opera", Safari: "Safari" };
    if (window) {
        var getEnvironment = function () {
            var userAgent = neg.cast(window.navigator.userAgent);

            var p = (function () {
                return neg.cast(window.location.protocol).trimRight(":");
            })();

            var operationSys = (function () {
                if (/Win/.test(userAgent)) {
                    return os.Window;
                }
                if (/Mac/.test(userAgent)) {
                    return os.Mac;
                }
                if (/Linux/.test(userAgent)) {
                    return os.Linux;
                }
                if (/FreeBSD/.test(userAgent)) {
                    return os.FreeBSD;
                }
                return os.Unknown;
            })();

            var browser = (function () {
                if (/MSIE/.test(userAgent)) {
                    var appNameBegin = userAgent.indexOf("MSIE");
                    var appNameEnd = userAgent.indexOf(";", appNameBegin);
                    var ver = parseFloat(userAgent.substring(appNameBegin + 5, appNameEnd));
                    return { name: browserType.IE, version: ver };
                }
                if (/Firefox/.test(userAgent)) {
                    var ver = parseFloat(userAgent.substring(userAgent.indexOf("Firefox") + 8));
                    return { name: browserType.Firefox, version: ver };
                }
                if (/Chrome/.test(userAgent)) {
                    var ver = parseFloat(userAgent.substring(userAgent.indexOf("Chrome") + 7));
                    return { name: browserType.Chrome, version: ver };
                }
                if (/Safari/.test(userAgent)) {
                    var ver = parseFloat(userAgent.substring(userAgent.indexOf("Safari") + 7));
                    return { name: browserType.Safari, version: ver };
                }
                if (/Opera/.test(userAgent)) {
                    var ver = parseFloat(userAgent.substring(userAgent.indexOf("Opera") + 6));
                    return { name: browserType.Opera, version: ver };
                }
                return { name: browserType.Unknown, version: null };
            })();

            var d = (function () {
                if (/iPhone/.test(userAgent)) {
                    return device.iPhone;
                }
                if (/iPad/.test(userAgent)) {
                    return device.iPad;
                }
                if (/iPod/.test(userAgent)) {
                    return device.iPod;
                }
                return device.Unknown;
            })();

            return {
                protocol: p,
                os: operationSys,
                browserInfo: browser,
                device: d
            };
        };


        environment = {
            refresh: function () {
                neg.base.blend(environment, getEnvironment(), { cover: true, mergePrototype: false });
            }
        };

        neg.base.blend(environment, getEnvironment(), { cover: true, mergePrototype: false });
    }
    neg.utility && (neg.utility.Environment = environment);
})(NEG)