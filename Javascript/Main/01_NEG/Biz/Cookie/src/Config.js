NEG.Module('Biz.Cookie.Config',function(require) {
    var siteCookieInfo = Web.Config.SiteCookieInfo; //Web.Config.SiteCookieInfo Ŀǰ�ɷ���������ҳ��
    var cookieEnvironment = Web.Config.Environment.Cookies; //Ŀǰ�ɷ���������ҳ��
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