"use strict";
$(document).ready(function () {
    "use strict";

    <!--  ********  Event Handlers **********   -->


    $("#year").on("change", function(){
        var year = $("#year").val();
        if(year !== '') {
            getMakes(year, function (makes) {
                populateMakes(makes)
            })
        }else {
            //TODO: insert error handling if user doesnt select year.
            console.log("Did not select a year error ")
        }
    });

    $("#make").on("change", function(){
        var year = $("#year").val();
        var make = $(this).val();
        if(make !== '' && year !== '') {
            getModels(make, year, function (models) {
                populateModels(models)
            })
        }else {
            //TODO: insert error handling if user doesnt select make.
            console.log("Did not select a make error ")
        }
    });

    $("#model").on("change", function(){
        var year = $("#year").val();
        var make = $("#make").val();
        var model = $(this).val();
        if(model !== '' && make !== '' && year !== '') {
            getEngines(model, make, year, function (vehicles) {
                if (vehicles.length === 1){
                    // *** WINNER ***
                    saveUserVehicle(vehicles[0]);
                    $("#vehicleResult").html("<h2 class='text-center'>Combined " + vehicles[0].combined + " MPG</h2>");
                }else{

                    $.each(vehicles, function(i, vehicle){
                        console.log(vehicle)
                    });

                    //TODO: check if comined MPG are the same.. if = then no need to pick from engine sizes
                    if (checkIfMPGSame(vehicles)){
                        // ** WINNER **
                        saveUserVehicle(vehicles[0]);
                        $("#vehicleResult").html("<h2 class='text-center'>Combined " + vehicles[0].combined + " MPG</h2>");
                    }else {
                        //TODO: select from displacement and if still not to one then select from transmission
                        populateEngines(vehicles);
                    }
                }

            })
        }else {
            //TODO: insert error handling if user doesnt select model.
            console.log("Did not select a make error ")
        }
    });

    function bindEngineListenerToDom(vehicles) {
        $("#engine").on("change", function(){
            var displacement = $(this).val();
            var matchingVehicles = [];
            $.each(vehicles, function(i, vehicle){
                if(vehicle.displacement == displacement) {
                    matchingVehicles.push(vehicle)
                }
            });

            if(matchingVehicles.length === 1){
                // ** WINNER **
                saveUserVehicle(matchingVehicles[0]);
                $("#vehicleResult").html("<h2 class='text-center'>Combined " + matchingVehicles[0].combined + " MPG</h2>");
            }else{
                console.log(matchingVehicles);
                if(checkIfMPGSame(matchingVehicles)){
                    //** WINNER **
                    saveUserVehicle(matchingVehicles[0]);
                    $("#vehicleResult").html("<h2 class='text-center'>Combined " + matchingVehicles[0].combined + " MPG</h2>");

                }else {
                    //TODO: check to see what additional field to check to differentiate models.. possible transmission
                    populateTransmissions(matchingVehicles);
                }
            }
        })
    }

    function bindTransmissionListenerToDom(vehicles) {
        $("#transmission").on("change", function() {
            var transmission = $(this).val();

            $.each(vehicles, function(i, vehicle) {
                if (vehicle.transmission === transmission) {
                    //**WINNER **
                    saveUserVehicle(vehicle);
                    $("#vehicleResult").html("<h2 class='text-center'>Combined " + vehicle.combined + " MPG</h2>");

                }
            })
        })

    }

    <!--  ******** END Event Handlers **********   -->

    <!--    ******* HTML Render  ********     -->


    function populateMakes(makes) {
        // resets info if year is changed
        $("#model, #additionalVehicleForms, #vehicleResult").html('');

        var html = '';
        html += '<option value="">Select a make</option>';
        $.each(makes, function(i, make) {
            html += '<option value="' + make +'">' + make + '</option>';
        });
        $("#make").html(html);
    }

    function populateModels(models) {
        // resets info if year is changed
        $("#additionalVehicleForms, #vehicleResult").html('');

        var html = '';
        html += '<option value="">Select a make</option>';
        $.each(models, function(i, model) {
            html += '<option value="' + model +'">' + model + '</option>';
        });
        $("#model").html(html);
    }

    function populateEngines(vehicles) {
        // resets info if year is changed
        $("#vehicleResult").html('');

        var html = '';
        html += '<div class="form-group">';
        html += '<label for="engine">Engine</label>';
        html += '<select name="engine" id="engine" class="vehicleSelect">';
        html += '<option value="">Select and engine size</option>';

        $.each(vehicles, function(i, vehicle) {
            if(i === 0 || vehicle.displacement !== vehicles[i - 1].displacement) {
                html += '<option value="' + vehicle.displacement + '">' + vehicle.displacement + '</option>';
            }
        });

        html += '</select>';
        html += '</div>';
        $("#additionalVehicleForms").html(html);
        bindEngineListenerToDom(vehicles);
    }

    function populateTransmissions(vehicles) {
        var html = '';
        html += '<div class="form-group">';
        html += '<label for="transmission">Transmission</label>';
        html += '<select name="transmission" id="transmission" class="vehicleSelect">';
        html += '<option value="">Select Transmission</option>';

        $.each(vehicles, function(i, vehicle){
            html += '<option value"' + vehicle.transmission + '">' + vehicle.transmission + '</option>';
        });

        html += '</select>';
        html += '</div>';
        $("#additionalVehicleForms").append(html);
        bindTransmissionListenerToDom(vehicles);
    }

    <!--    ******* END HTML Render  ********     -->

    <!--  ********  AJAX requests **********   -->


    function getMakes(year, callback) {
        $.ajax({
            url: "/vehicleProfile/getMakes?year=" + year,
            success: function(response) {
                if(response && response.result){
                    callback(response.data)
                }else {
                    //TODO: handle error response
                    console.log(response.errors)
                }
            }
        })
    }


    function getModels(make, year, callback) {
        $.ajax({
            url: "/vehicleProfile/getModels?make=" + make + "&year=" + year,
            success: function(response) {
                if(response && response.result){
                    callback(response.data)
                }else {
                    //TODO: handle error response
                    console.log(response.errors)
                }
            }
        })
    }

    function getEngines(model, make, year, callback) {
        $.ajax({
            url: "/vehicleProfile/getEngines?model=" + model + "&make=" + make + "&year=" + year,
            success: function(response) {
                if(response && response.result){
                    callback(response.data)
                }else {
                    //TODO: handle error response
                    console.log(response.errors)
                }
            }
        })
    }

    function saveUserVehicle(vehicle){
        $.ajax({
            url: "/dashboard/saveUserVehicle?vehicleId=" + vehicle.id,
            success: function(response) {
                if(response && response){
                    $("#vehicleFormContainer").hide();
                    $("#routeFormContainer").show()
                }else{
                    $("#vehicleFormError").text("")
                }
            }
        })

    }

    <!--  ******** END AJAX requests **********   -->

    function checkIfMPGSame(vehicles) {
        var initialVehicleMpg = vehicles[0].combined;
        var matchingVehicles = [];

        $.each(vehicles, function(i, vehicle) {
            if(vehicle.combined === initialVehicleMpg) {
                matchingVehicles.push(vehicle)
            }
        });
        return vehicles.length === matchingVehicles.length
    }

});