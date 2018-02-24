$(document).ready(function () {
    "use strict";
    <!--  ********  Global varialbles **********   -->
    var userVehicle;
    var userDistance;




    <!--  ********  Event Handlers **********   -->


    $("#yearCalc").on("change", function(){
        var year = $("#yearCalc").val();
        if(year !== '') {
            getMakes(year, function (makes) {
                populateMakesCalc(makes)
            })
        }else {<!--  ********  Start Vehicle Logic **********   -->
            //TODO: insert error handling if user doesnt select year.
            console.log("Did not select a year error ")
        }
    });

    $("#makeCalc").on("change", function(){
        var year = $("#yearCalc").val();
        var make = $(this).val();
        if(make !== '' && year !== '') {
            getModels(make, year, function (models) {
                populateModelsCalc(models)
            })
        }else {
            //TODO: insert error handling if user doesnt select make.
            console.log("Did not select a make error ")
        }
    });

    $("#modelCalc").on("change", function(){
        var year = $("#yearCalc").val();
        var make = $("#makeCalc").val();
        var model = $(this).val();
        if(model !== '' && make !== '' && year !== '') {
            getEngines(model, make, year, function (vehicles) {
                if (vehicles.length === 1){
                    // *** WINNER ***
                    userVehicle = vehicles[0];
                    $("#vehicleResultCalc").html("<h2 class='text-center'>Combined " + vehicles[0].combined + " MPG</h2>");
                }else{

                    $.each(vehicles, function(i, vehicle){
                        console.log(vehicle)
                    });

                    //TODO: check if comined MPG are the same.. if = then no need to pick from engine sizes
                    if (checkIfMPGSame(vehicles)){
                        // ** WINNER **
                        userVehicle = vehicles[0];
                        $("#vehicleResultCalc").html("<h2 class='text-center'>Combined " + vehicles[0].combined + " MPG</h2>");
                    }else {
                        //TODO: select from displacement and if still not to one then select from transmission
                        populateEnginesCalc(vehicles);
                    }
                }

            })
        }else {
            //TODO: insert error handling if user doesnt select model.
            console.log("Did not select a make error ")
        }
    });

    function bindEngineListenerToDom(vehicles) {
        $("#engineCalc").on("change", function(){
            var displacement = $(this).val();
            var matchingVehicles = [];
            $.each(vehicles, function(i, vehicle){
                if(vehicle.displacement == displacement) {
                    matchingVehicles.push(vehicle)
                }
            });

            if(matchingVehicles.length === 1){
                // ** WINNER **
                userVehicle = matchingVehicles[0];
                $("#vehicleResultCalc").html("<h2 class='text-center'>Combined " + matchingVehicles[0].combined + " MPG</h2>");
            }else{
                console.log(matchingVehicles);
                if(checkIfMPGSame(matchingVehicles)){
                    //** WINNER **
                    userVehicle = matchingVehicles[0];
                    $("#vehicleResultCalc").html("<h2 class='text-center'>Combined " + matchingVehicles[0].combined + " MPG</h2>");

                }else {
                    //TODO: check to see what additional field to check to differentiate models.. possible transmission
                    populateTransmissionsCalc(matchingVehicles);
                }
            }
        })
    }

    function bindTransmissionListenerToDom(vehicles) {
        $("#transmissionCalc").on("change", function() {
            var transmission = $(this).val();

            $.each(vehicles, function(i, vehicle) {
                if (vehicle.transmission === transmission) {
                    //**WINNER **
                    userVehicle = vehicle;
                    $("#vehicleResultCalc").html("<h2 class='text-center'>Combined " + vehicle.combined + " MPG</h2>");

                }
            })
        })

    }

    <!--  ******** END Event Handlers **********   -->

    <!--    ******* HTML Render  ********     -->


    function populateMakesCalc(makes) {
        // resets info if year is changed
        $("#modelCalc, #additionalVehicleFormsCalc, #vehicleResultCalc").html('');

        var html = '';
        html += '<option value="">Select a make</option>';
        $.each(makes, function(i, make) {
            html += '<option value="' + make +'">' + make + '</option>';
        });
        $("#makeCalc").html(html);
    }

    function populateModelsCalc(models) {
        // resets info if year is changed
        $("#additionalVehicleFormsCalc, #vehicleResultCalc").html('');

        var html = '';
        html += '<option value="">Select a make</option>';
        $.each(models, function(i, model) {
            html += '<option value="' + model +'">' + model + '</option>';
        });
        $("#modelCalc").html(html);
    }

    function populateEnginesCalc(vehicles) {
        // resets info if year is changed
        $("#vehicleResultCalc").html('');

        var html = '';
        html += '<div class="form-group">';
        html += '<label for="engineCalc">Engine</label>';
        html += '<select name="engineCalc" id="engineCalc" class="vehicleSelect">';
        html += '<option value="">Select and engine size</option>';

        $.each(vehicles, function(i, vehicle) {
            if(i === 0 || vehicle.displacement !== vehicles[i - 1].displacement) {
                html += '<option value="' + vehicle.displacement + '">' + vehicle.displacement + '</option>';
            }
        });

        html += '</select>';
        html += '</div>';
        $("#additionalVehicleFormsCalc").html(html);
        bindEngineListenerToDom(vehicles);
    }

    function populateTransmissionsCalc(vehicles) {
        var html = '';
        html += '<div class="form-group">';
        html += '<label for="transmissionCalc">Transmission</label>';
        html += '<select name="transmissionCalc" id="transmissionCalc" class="vehicleSelect">';
        html += '<option value="">Select Transmission</option>';

        $.each(vehicles, function(i, vehicle){
            html += '<option value"' + vehicle.transmission + '">' + vehicle.transmission + '</option>';
        });

        html += '</select>';
        html += '</div>';
        $("#additionalVehicleFormsCalc").append(html);
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


    <!--  ******** END Vehicle Logic **********   -->

    <!--  ********  Start Vehicle Logic **********   -->

});