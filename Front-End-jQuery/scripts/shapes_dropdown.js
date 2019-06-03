$(document).ready(function () {
    const mapUrl = "http://localhost:8082/map";

    $.ajax({
        type: "GET",
        url: mapUrl + "/shapes",
        success: createDropDown,
        error: printError
    });

    function createDropDown(data) {

        let selectOptions = Object.values(data);

        for (i = 0; i < selectOptions.length; i++) {
            let optionValue = `<option value="${selectOptions[i].toLowerCase()}">${selectOptions[i]}</option>`;
            $("#shape_type").append(optionValue);
        }
    }

    function printError(){
        console.log("Error in \"shape_dropdown.js\"")
    }
    
    console.log("Ready!");
});
