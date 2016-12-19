/**
 * Created by hb on 2016-12-15.
 */
require.config({
    baseUrl: "js",
    paths:{
        "console"   : "plugins",
        "jquery"    : "vendor/jquery-3.1.1.min",
        "bootstrap" : "vendor/bootstrap/js/bootstrap.min",
        "common"    :  "common"
    },
    shim:{
        "bootstrap": {
            deps:["jquery"]
        }
    },
    deps: ["console"]
});
