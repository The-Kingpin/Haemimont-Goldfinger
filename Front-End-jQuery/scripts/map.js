$(document).ready(function () {
    console.log("ready!");

    const mapUrl = "http://localhost:8082/map";

    map.doubleClickZoom.disable();

    let shape = "";

    let layersID = [];

    $("#shape_type").change(function () {

        clearLayers();
        shape = `${this.value}`;

        //TODO clear comments
        // console.log(layersID);
        // console.log(shape);
        // console.log(map);
    });

    map.on("dblclick", function (e) {
        let pointClicked = e.lngLat;
        let x = pointClicked.lng;
        let y = pointClicked.lat;

        //TODO clear comments
        // console.log(x + " " + y);

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

            if (data.id === undefined) {
                console.log("No data for this point!");
            } else if (map.getLayer(data.id)) {
                map.removeLayer(data.id);
                map.removeSource(data.id);

                let indexOfLayer = layersID.indexOf(data.id);

                layersID.splice(indexOfLayer, indexOfLayer);

            } else {

                //TODO clear comments
                // console.log("layer was added");
                layersID.push(data.id);
                map.addLayer(data);
            }
        }

        function printError(data) {
            alert(data);
        }
    });

    function clearLayers() {
        for (let i = 0; i < layersID.length; i++) {
            map.removeLayer(layersID[i]);
            map.removeSource(layersID[i]);

        }

        layersID = [];
    }

});
