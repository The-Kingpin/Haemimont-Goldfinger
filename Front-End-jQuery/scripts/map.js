$(document).ready(function () {
    console.log("ready!");

    const mapUrl = "http://localhost:8082/map";

    map.doubleClickZoom.disable();

    map.on("dblclick", function (e) {
        let pointClicked = e.lngLat;
        let x = pointClicked.lng;
        let y = pointClicked.lat;
        let shape = "soils";
        console.log(x + " " + y);

        $.ajax({
            type: "GET",
            url: `${mapUrl}/draw?x=${x}&y=${y}&shape=${shape}`,
            headers: {
                "Content-Type": "application/json"
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: addPolygonLayer,
            error: printError
        });

        function addPolygonLayer(data) {
            if (data) {
                map.addLayer(data);
            } else {
                allert("No data found for this point!");
            }
        }

        function printError(data) {
            alert(data);
        }
    })
});
