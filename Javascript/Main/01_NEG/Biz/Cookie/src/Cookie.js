NEG.Module('Biz.Cookie',function(require) {
    var cookie = require("Utility.Cookie");
    var cookieNameMap = require("Biz.Cookie.CookieName");
    var subCookieMap = require("Biz.Cookie.SubCookie");
    var cookieConfig = require("Biz.Cookie.Config");    
    var JSON = window.JSON || require("Utility.JSON");
    var regx=/^#\d+/i;
    
    var cookieNameReflection = function () {
        var reflection={};
        for(var key in cookieNameMap){
            reflection[cookieNameMap[key]] = key;
        };
        return reflection;
    }();

    var subCookieReflection = function () {
        var reflection={};
        for(var key in subCookieMap){
            reflection[subCookieMap[key]] = key;
        };
        return reflection;
    }();


    var bizCookie = function(cookieName){

        var me = arguments.callee;
        if ( !(this instanceof me)){
            /*if(!cookieNameReflection[cookieName]){
                throw cookieName + " is not a Newegg cookie name!";
            }*/
            return new me(cookieName);
        }

        var context = this;
        function checkSubCookie(name) {
            if(name && !subCookieReflection[name]){
                //throw name + " is not a Newegg sub cookie name!";
            }else if(!name){
                throw "miss cookie name!";
            }
            return !!subCookieReflection[name];
        }

        var version = cookie.get(cookieName).match(regx)+'';

        function internalDecoders (value,version) {
            switch(version){
                case "#1" :
                    value = value.replace(/"Expired":/g,"\"Exp\":");
                    break;
                case "#2" :    
                    value = value.replace(/%7B/ig,"{").replace(/%7D/ig,"}").replace(/%22/ig,"\"").replace(/%2C/ig,",").replace(/%3A/ig,":").replace(/%2F/ig,"/").replace(/%20/ig," ");
                    break;
                case "#3" :
                    value = value.replace(/\?7B\?/ig,"{").replace(/\?7D\?/ig,"}").replace(/\?22\?/ig,"\"").replace(/\?2C\?/ig,",").replace(/\?3A\?/ig,":").replace(/\?2F\?/ig,"/").replace(/\?20\?/ig," ");
                    break;
                case "#4" :
                    value = value.replace(/\+/ig,"%20");
                    break;
                default :
                    value = value.replace(/\+/ig, " ");
                    break;
            }
            return value;
        }
        
        function getCookieObject(cookieName) {
            var cookieObject = createNegCookieTemplate();
            var cookieString = internalDecoders(cookie.get(cookieName).replace(regx, ''), version);
            //var historyCookie = JSON.parse(cookie.get(cookieName).replace(regx,'') || null) || {};
            var historyCookie = JSON.parse(cookieString || null) || {};
            var currentSite = NEG.merge(cookieObject.Sites,historyCookie.Sites)[cookieConfig.bizUnit]; 
            var cookieOption = getCookieOption(cookieName);
            //cookieOption.exp = context.getExpDate(cookieObject) || cookieOption.exp;
            return {data:cookieObject,currentSite:currentSite,option:cookieOption};
        }

        function createNegCookieTemplate(bizUnit) {
            // newegg cookie 结构参考： #5{"Sites":{"USA":{"Values":{"wf":"9SIA06S06"},"Exp":"1428288699"}}}
            bizUnit = bizUnit || cookieConfig.bizUnit;
            var cookieTemplate = {};
            NEG.NS('Sites',cookieTemplate)[bizUnit]={Values:{},Exp:0};
            return cookieTemplate;
        }

        function getCookieValueString(cookieObject){

            return cookieConfig.version + JSON.stringify(cookieObject);   
        }

        function getCookieOption(cookieName) {
            var config = cookieConfig.CookieMapping[cookieName] || [];
            var cookieOption = {
                domain : config[0],
                exp : config[1] && new Date/1000 + config[1],
                path : config[2],
                secure : config[3]
            };
            return cookieOption;
        }
        
        this.getExpDate = function(cookieObject){
            cookieObject = cookieObject || this.get(cookieName).data;
            var site;
            var maxExpDate = 0;//new Date/1000;
            for(site in cookieObject.data.Sites){
                maxExpDate = Math.max(maxExpDate,cookieObject.data.Sites[site].Exp,cookieObject.option.exp);
            }
            return maxExpDate*1000;
        };

        this.get = function(key){
            var value;
            var cookieObject = getCookieObject(cookieName);
            if(key) {
                value = (new Date/1000 < cookieObject.currentSite.Exp) && checkSubCookie(key) ? cookieObject.currentSite.Values[key] : '';
            }else{
                value = cookieObject.currentSite.Values || cookieObject.currentSite.Value;
            }
            return value || '';
        };

        this.set = function(key,value,exp){
            checkSubCookie(key);
            var negCookie = getCookieObject(cookieName);
            negCookie.currentSite.Values[key] = value;

            negCookie.currentSite.Exp = (exp !== undefined) ? parseInt(exp) : parseInt(negCookie.currentSite.Exp || negCookie.option.exp);
            var valueString = getCookieValueString(negCookie.data);
            negCookie.option.exp = context.getExpDate(negCookie);
            cookie.set(cookieName,valueString,negCookie.option);
        };

        this.remove = function(key){
            //checkSubCookie(key);
            var negCookie = getCookieObject(cookieName);
            if(key){
                delete negCookie.currentSite.Values[key];
            }else{
                delete negCookie.data.Sites[cookieConfig.bizUnit];
            }
            var valueString = getCookieValueString(negCookie.data);
            cookie.set(cookieName,valueString,negCookie.option);                
        };
    };

    bizCookie.names = cookieNameMap;
    bizCookie.subNames = subCookieMap;
    return bizCookie;
});