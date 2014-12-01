NEG.Module('Biz.Cookie.CookieName', function (require) {
    var name = {
        CFG: "NV_CONFIGURATION",
        LOGIN: (Web.Config.SiteCookieInfo.bizUnit == "B2B") ? "NV_B2BCUSTOMERLOGIN" : "NV_CUSTOMERLOGIN",
        CART: "NV_CARTINFO",
        CPCOMBO: "CELL_PHONE_COMBO",
        CPPACKAGE: "CELL_PHONE_PACKAGE",
        PRDLIST: "NV_PRDLIST",
        CUSTOMER_REVIEW: "NV_CUSTOMERREVIEWCOOKIE",
        DEVICEINFO: "NV_DVINFO",
        GOOGLEANALYTICS: "NV_GOOGLE_ANALYTICS",
        ANTIPRICE: "NV_Anti",
        UTMA: "__utma",
        CustomerInfoInternalUser: "NV_CUSTOMERLOGININTERNALUSER",
        NEGSTORAGE: "NEG_STORAGE"
    };

    return name;
});