$(document).ready(function () {
    console.log("ready!");

    const mapUrl = "http://localhost:8082/map";

    map.doubleClickZoom.disable();

    let shape = "";

    $("#shape_type").change(function () {
        clearLayers();
        shape = `${this.value}`;

        console.log(shape);
    });

    map.on("dblclick", function (e) {
        let pointClicked = e.lngLat;
        let x = pointClicked.lng;
        let y = pointClicked.lat;

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

            if (map.getLayer(data.id)) {
                map.removeLayer(data.id);
                map.removeSource(data.id);

            } else {
                map.addLayer(data);
            }
        }

        function printError(data) {
            alert(data);
        }
    });

    function clearLayers() {
        console.log(map.layers);

    }

});
