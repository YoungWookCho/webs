/**
 * Created by hb on 2016-12-15.
 */
require.config({
    baseUrl: global.root,
    paths:{
        "async"     : "js/vendor/requirejs/async",
        "console"   : "js/plugins",
        "jquery"    : "js/vendor/jquery-3.1.1.min",
        "bootstrap" : "js/vendor/bootstrap/js/bootstrap.min",
        "clipboard" : "js/vendor/clipboard/clipboard.min",
        "common"    :  "js/common",
        "easteregg" :   "js/easteregg"
    },
    shim:{
        "bootstrap": {
            deps:["jquery"]
        }
    },
    deps: ["console"]
});
