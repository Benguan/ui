; (function (neg) {
    var theUtility = neg.utility;

    var vc = (function () {
        var versions = [],  theModules = neg.cast([]);

        return {
            getVersion: function (module) {
                var result = "";
                if (module) {
                    var moduleName = neg.cast(module).trim();
                    if (moduleName) {
                        moduleName = moduleName.toLowerCase();
                        var index = theModules.indexOf(moduleName);
                        if (index > -1) {
                            return versions[index];
                        }
                    }
                } else {
                    for (var i = 0; i < versions.length; i++) {
                        result += (theModules.get(i) + ":" + versions[i]) + "  ";
                    }

                }
                return result;
            },
            setVersion: function (versionInfo) {
                var info = [].concat(versionInfo);
                if (info.length > 0) {
                    for (var i = 0; i < info.length; i++) {
                        var item = info[i];
                        if (theUtility.isDefined(item.version) && theUtility.isDefined(item.module)) {
                            var moduleName = neg.cast(item.module).trim();
                            if (moduleName) {
                                moduleName = moduleName.toLowerCase();
                                if (theModules.indexOf(moduleName) == -1) {
                                    theModules.push(moduleName);
                                    versions.push(neg.cast(item.version).trim());
                                }
                            }
                        }
                    }
                }
            }
        };
    })();

    neg.VersionControl = vc;
})(NEG)