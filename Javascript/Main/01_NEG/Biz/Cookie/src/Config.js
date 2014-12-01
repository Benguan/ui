NEG.Module('Biz.Cookie.Config',function(require) {
    var siteCookieInfo = Web.Config.SiteCookieInfo; //Web.Config.SiteCookieInfo 目前由服务端输出到页面
    var cookieEnvironment = Web.Config.Environment.Cookies; //目前由服务端输出到页面
    var config = {
        bizUnit : siteCookieInfo.bizUnit,
        enableReformattedCookie : siteCookieInfo.enableReformattedCookie,
        writeReformattedCookie : siteCookieInfo.siteCookieInfo,
        EnableCookieNameMapping : cookieEnvironment.EnableCookieNameMapping,
        CookieMapping : Web.Config.CookieMapping,
        version : cookieEnvironment.EnableCookieNameMapping ? "#5" : "#4"
    };
    return config;
});