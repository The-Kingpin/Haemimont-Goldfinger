function getFields(shape) {

    document.getElementById("color_by").addEventListener("change", function () {

        colorBy = this.value;

    });



    if (shape !== "default") {

        const mapUrl = "http://localhost:8082/map";

        $.ajax({
            type: "GET",
            url: mapUrl + `/fields?shape=${shape.toLowerCase()}`,
            success: createColorDropDown,
            error: printError
        });

        function createColorDropDown(data) {

            let selectOptions = Object.values(data);

            for (i = 0; i < selectOptions.length; i++) {
                let optionValue = `<option value="${selectOptions[i].toLowerCase()}">${selectOptions[i]}</option>`;
                $("#color_by").append(optionValue);
            }
        }

        function printError() {
            console.log("Error in \"color_dropdown.js\"")
        }
    }

    console.log("Ready!");
}

function resetColorByDropDown() {

    let element = document.createElement("select");

    element.id = "color_by";

    let elementOption = document.createElement("option");
    elementOption.value="default";

    element.append(elementOption);

    document.getElementById("color_by").replaceWith(element);
}

