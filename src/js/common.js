/***define 모듈화***/
define(["bootstrap"], function(){

    /*** 메인 페이지로 가는 것***/
    $("#main-logo").on("click",function () {
        location.href ="/";
    });



    function initHotPlaces() {
        $.ajax({
            url: "/api/common/hotplaces",
            success: function(hotPlaces) {
                for ( var i= 0; i<hotPlaces.length; i++){
                    $("#footer-location>ul").append("<li>"+hotPlaces[i]+"</li>");
                }
            }
        });

    }
    return {
        initHotPlaces :initHotPlaces
    };


});
