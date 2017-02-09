require(["common"], function(){

    var common = require("common");
    common.initHotPlaces();
    $("#calc").on("click", function(){
        $.ajax({
            url: global.root+"/api2/calc",
            method: "POST",
            data: {
                left: $("#left").val(),
                right: $("#right").val(),
                operator: $("#operator").val()
            },
            success: function(data) {
                var result = data.result;
                $("#result").text(result);
            }
        });
    });

});

