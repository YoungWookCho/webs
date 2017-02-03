define([
    "bootstrap",
    "easteregg"
], function () {
    function resizeHeaderSearch() {
        var mainLogoWidth = $("#main-logo").outerWidth();
        var mainMenuWidth = $("#main-menu").outerWidth();

        $("#header-search").css("padding-left", mainLogoWidth + "px");
        $("#header-search").css("padding-right", mainMenuWidth + "px");
    }

    if ($("#header-search").length > 0) {
        $(window).on("resize", function() {
            resizeHeaderSearch();
        });

        resizeHeaderSearch();
    }

    function search() {
        location.href = "search.html";
    }
    var popupCssSelector = "";

    function closeLayerPopup() {
        $(popupCssSelector).hide();
        $(".hp-block-layer").remove();
        $("body").css("overflow", "");

        popupCssSelector = "";
    }

    function openLayerPopup(cssSelector) {
        if(popupCssSelector === cssSelector) {
            return;
        }
        popupCssSelector = cssSelector;

        $("body").css("overflow", "hidden");
        var blockLayerHTML = "<div class='hp-block-layer'></div>";
        $("body").append(blockLayerHTML);
        $(cssSelector).show();

        $(".hp-block-layer").on("click", function () {
            closeLayerPopup();
        });
    }

    function closeAjaxPopup() {
        $(".hp-block-layer.ajax").remove();

        if ($(".hp-block-layer").length === 0) {
            $("body").css("overflow", "");
        }

        $(".hp-layer-popup").remove();
    }



    function signUp() {
        var userId = $("#hp-user-id").val();
        var userPw = $("#hp-user-pw").val();
        var userPwCfm = $("#hp-user-pw-Cfm").val();

        if(userId === undefined || userId === "") {
            alert ("아이디를 입력하세요");
            return;
        }
        else if(userPw === undefined || userPw === "") {
            alert ("비밀번호를를 입력하세요");
            return;
        }
        else if(userPw !== userPwCfm) {
            alert ("비밀번호 확인을 동일하게 입력하세요");
            return;
        }
        $.ajax({
            url: "/api2/member/signup",
            method: "POST",
            data: {
                userId: userId,
                userPw: userPw
            },
            success: function (data) {
                alert(data.result);
            },
            error: function (jqXHR) {
                alert(jqXHR.responseJSON.message);
                console.log(jqXHR);

            }
        });
    }

    function attachPopupEvent(layerName) {
        if (layerName === "sign-up") {
            $("#hp-member-sign-up").on("click",function () {
                signUp();
            });
            $(".hp-reset").on("click", function () {
                $("#hp-user-id").val("");
                $("#hp-user-pw").val("");
                $("#hp-user-pw-Cfm").val("");
                $("#hp-user-id").focus();
            });
        }
        $(".hp-block-layer.ajax, .hp-popup-close").on("click", function () {
            closeAjaxPopup();
        });
    }

    function openAjaxPopup(layerName) {
        $.ajax({
            url: "layers/" + layerName + ".html",
            success: function (html) {
                $("body").css("overflow", "hidden");

                var blockLayerHTML = "<div class='hp-block-layer ajax'></div>";
                $("body").append(blockLayerHTML);
                $("body").append(html);
                $(".hp-popup-contents>input:first-child").focus();
                attachPopupEvent(layerName);
            }
        });
    }

    $("#main-logo").on("click", function() {
        location.href = "/";
    });

    $(".hp-member").on("click", function() {
        openLayerPopup(".hp-member-popup");
    });

    $(".hp-sign-up").on("click", function() {
        openAjaxPopup("sign-up");
    });

    $(".hp-sign-in").on("click", function() {
        openAjaxPopup("sign-in");
    });


    $("#main-search, #top-search").on("keyup", function(event) {
        if (event.keyCode === 13) {
            search();
        }
        else if (event.keyCode === 27) {
            $(this).val("");
        }
    });

    $("#main-search-btn").on("click", function() {
        search();
    });

    $(".search-clear").on("click", function () {
        $("#main-search, #top-search").val("");
    });

    function addHotPlaces(hotPlaces) {
        for (var i=0;i<hotPlaces.length;i++) {
            $("#footer-location>ul").append("<li>" + hotPlaces[i] + "</li>");
        }
    }

    function initHotPlaces() {
        $.ajax({
            url: "/api/common/hotplaces",
            success: function(hotPlaces) {
                addHotPlaces(hotPlaces);
            }
        });
    }

    function getBestZoom(minLat, maxLat, minLng, maxLng, mapWidth, mapHeight, maxZoom) {
        var radius = 6371; // radius of the earth in km
        var oneRadian = 57.2958; // one radian
        var interval = 0;

        if ((maxLat - minLat) > (maxLng - minLng)) {
            interval = (maxLat - minLat) / 2;
        } else {
            interval = (maxLng - minLng) / 2;
        }

        minLat -= interval;
        maxLat += interval;
        minLng -= interval;
        maxLng += interval;

        var dist = (radius * Math.acos(Math.sin(minLat / oneRadian) *
            Math.sin(maxLat / oneRadian) + (Math.cos(minLat / oneRadian) *
            Math.cos(maxLat / oneRadian) *
            Math.cos((maxLng / oneRadian) - (minLng / oneRadian)))));

        var zoom = Math.floor(8 -
            Math.log(1.6446 * dist / Math.sqrt(2 * (mapWidth * mapHeight))) /
            Math.log (2));

        if (!maxZoom) {
            maxZoom = 21;
        }

        return Math.min(zoom, maxZoom);
    }

    return {
        initHotPlaces: initHotPlaces,
        getBestZoom: getBestZoom
    };
});
