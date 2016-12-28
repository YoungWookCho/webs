require([
    "common"
], function () {

    var common = require("common");

    function configureMap(list) {
        var center = {
            lat: 0,
            lng: 0
        };

        var minLat = 5000, maxLat = -5000, minLng = 5000, maxLng = -5000;

        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById("map"), {
            center: center,
            scrollwheel: false,
            zoom: 15
        });

        for (var i=0;i<list.stores.length;i++) {
            var store = list.stores[i];

            // Create a marker and set its position.
            var marker = new google.maps.Marker({
                map: map,
                position: store.latLng,
                title: store.name
            });

            minLat = Math.min(minLat, store.latLng.lat);
            maxLat = Math.max(maxLat, store.latLng.lat);
            minLng = Math.min(minLng, store.latLng.lng);
            maxLng = Math.max(maxLng, store.latLng.lng);

            console.log(marker);
        }

        center = {
            lat: (maxLat + minLat) / 2,
            lng: (maxLng + minLng) / 2
        };

        var zoom = common.getBestZoom(minLat, maxLat, minLng, maxLng,
            $("#map").width(), $("#map").height(), 18);

        map.panTo(center);
        map.setZoom(zoom);
    }

    function initMap(list) {
        require(["async!https://maps.googleapis.com/maps/api/js?key=" +
        "AIzaSyAOTSLj132cWOhCddu9kOwj7u2yBQLJ4PQ"], function() {
            configureMap(list);
        });
    }

    var tempList = {
        "stores": [{
            "name": "믹스앤몰트",
            "latLng": {
                "lat": 37.5567962,
                "lng": 126.9313453
            }
        }, {
            "name": "믹스앤몰트",
            "latLng": {
                "lat": 37.5526233,
                "lng": 126.9375131
            }
        }

        ]
    };

    $("#filter").on('click', function () {

        $(".search-filter").show();
    });

    $(".close-filter").on('click', function () {

        $(".search-filter").hide();
    });

    $(".close-filter").on('mouseover', function () {
        var newTop = $(this).position().top+50;

        $(this).css("top",newTop+"px");
    });

    initMap(tempList);

    common.initHotPlaces();

});
