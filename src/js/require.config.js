/**
 * Created by hb on 2016-12-15.
 */
require.config({
    baseUrl: "js",
    paths:{
        "async"     : "vendor/requirejs/async",
        "console"   : "plugins",
        "jquery"    : "vendor/jquery-3.1.1.min",
        "bootstrap" : "vendor/bootstrap/js/bootstrap.min",
        "clipboard" : "vendor/clipboard/clipboard.min",
        "common"    :  "common"
    },
    shim:{
        "bootstrap": {
            deps:["jquery"]
        }
    },
    deps: ["console"]
});
