let colorBy = "";

$(document).ready(function () {
    console.log("ready!");

    const mapUrl = "http://localhost:8082/map";

    map.doubleClickZoom.disable();

    let shape = "";



    $("#shape_type").change(function () {

        resetInfoBox();
        clearLayers();

        shape = `${this.value}`;

        resetColorByDropDown();

        getFields(shape);
    });

    map.on("dblclick", function (e) {
        let pointClicked = e.lngLat;
        let x = pointClicked.lng;
        let y = pointClicked.lat;

        // console.log(`${mapUrl}/draw?x=${x}&y=${y}&shape=${shape}&colorByField=${colorBy}`);
        // console.log(`${colorBy}`);

        $.ajax({
            type: "GET",
            url: `${mapUrl}/draw?x=${x}&y=${y}&shape=${shape}&colorByField=${colorBy}`,
            headers: {
                "Content-Type": "application/json"
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: addPolygonLayer,
            error: printError
        });

        function addPolygonLayer(data) {


            // console.log(colorBy);

            if (data.id === undefined) {
                console.log("No data for this point!");
            } else if (map.getLayer(data.id)) {
                map.removeLayer(data.id);
                map.removeSource(data.id);
                resetInfoBox();

            } else {

                // console.log(data);
                map.addLayer(data);
            }
        }

        function printError(data) {
            alert(data);
        }
    });

    map.on("click", function (e) {

        let pointClicked = e.lngLat;
        let x = pointClicked.lng;
        let y = pointClicked.lat;

        $.ajax({
            type: "GET",
            url: `${mapUrl}/draw?x=${x}&y=${y}&shape=${shape}&colorByField=${colorBy}`,
            headers: {
                "Content-Type": "application/json"
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: fillInfoBox,
            error: printError
        });

        function fillInfoBox(data) {

            if (map.getLayer(data.id) === undefined) {

                console.log("Not marked layer!");

            } else {

                let info = data.properties;

                resetInfoBox();

                for (let key in info) {

                    if (info.hasOwnProperty(key)) {

                        let paragraph = "";

                        if (info[key] === null) {
                            paragraph = `<p>${key}: No data</p>`;
                        } else {

                            paragraph = `<p>${key}: ${info[key]}</p>`;
                        }


                        $("#info_box").append(paragraph);
                    }

                }
            }
        }

        function printError(data) {
            alert(data);
        }

    });

    function clearLayers() {

        for (let property in map.style._layers) {

            if (map.style._layers.hasOwnProperty(property)) {

                if (!isNaN(property)) {

                    map.removeLayer(property);

                    map.removeSource(property);

                } else {

                    break;
                }
            }

        }
    }

    function resetInfoBox() {

        let infoBoxTitle = document.createElement("h2");

        infoBoxTitle.innerText = "Info Box";

        let element = document.createElement("div");

        element.id = "info_box";

        element.append(infoBoxTitle);

        document.getElementById("info_box").replaceWith(element);

    }

});