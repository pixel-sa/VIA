$(document).ready(function () {
    "use strict";
    <!--  ********  Global varialbles **********   -->
    var userVehicle;
    var startingAddress;
    var endingAddress;
    var distance;
    var zipcode;
    var gasPrice;


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
                }else{
                    if (checkIfMPGSame(vehicles)){
                        // ** WINNER **
                        userVehicle = vehicles[0];
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
            }else{
                console.log(matchingVehicles);
                if(checkIfMPGSame(matchingVehicles)){
                    //** WINNER **
                    userVehicle = matchingVehicles[0];

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


    function saveStartingAddressCalc() {
        var startingAddressInput = document.getElementById("starting-address-input-calc");
        var searchBox = new google.maps.places.SearchBox(startingAddressInput);
        searchBox.addListener('places_changed', function () {
            var place = searchBox.getPlaces();
            startingAddress = place[0].formatted_address;
            zipcode = place[0].address_components[7].short_name;
        });
    };

    function saveEndingAddressCalc() {
        var endingAddressInput = document.getElementById("ending-address-input-calc");
        var searchBox = new google.maps.places.SearchBox(endingAddressInput);
        searchBox.addListener('places_changed', function () {
            var place = searchBox.getPlaces();
            endingAddress = place[0].formatted_address;

        });
    }

    function calculateDistanceCalc() {

        //https://developers.google.com/maps/documentation/distance-matrix/intro
        if(startingAddress && endingAddress){
            var geocoder = new google.maps.Geocoder;
            var service = new google.maps.DistanceMatrixService;
            service.getDistanceMatrix({
                origins: [startingAddress],
                destinations: [endingAddress],
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.IMPERIAL
            }, function(response, status){
                if(status !== "OK"){
                    console.log("error" + status);
                }else {
                    console.log(response);
                    console.log(response.rows[0].elements[0].distance.text);
                   distance = response.rows[0].elements[0].distance.text;

                }
            });
        } else {
            console.log("cannot calculate");
        }

    }

    $("#starting-address-input-calc").off().focus(function () {
        saveStartingAddressCalc();
    });

    $("#ending-address-input-calc").off().focus(function() {
        saveEndingAddressCalc();
    });



        <!--  ********  END Vehicle Logic **********   -->

    <!--  ********   START Calculation Logic **********   -->

    function getGasPrice(callback){
        $.ajax({
            url: "/vehicleProfile/getGasPrices?zipcode=" + zipcode,
            success: function (response) {
                if (response && response.result){
                    console.log(response.data);
                    gasPrice = response.data;
                    callback();
                }

            }
        })
    }

    function calculateMonthlyCost(mpg, commuteDistance, currentGasPrice, daysPerWeek, miscCosts, callback){
        var roundTrip = commuteDistance * 2;
        var gasNeeded = roundTrip / mpg;
        var costOfFuel = gasNeeded * currentGasPrice;
        var timesPerMonth = daysPerWeek * 4.34;
        var monthlyCostofFuel = costOfFuel * timesPerMonth;
        var totalCost = monthlyCostofFuel + miscCosts;
        var carbonEmmited = calculateMontlyCarbonEmmitted(roundTrip * timesPerMonth, userVehicle.fuelType);
        callback(totalCost, carbonEmmited);
    }

    function calculateMontlyCarbonEmmitted(milesDriven, fuelType) {
        var carbonRate;
        if (fuelType === 'Diesel'){
            carbonRate = 22.4
        }else{
            carbonRate = 19.6
        }
        return carbonRate * milesDriven;
    }


    $("#submitCalculatorBtn").on("click", function(){
        $(".calculatorContainer").hide();
        $("#loadContainer").show();

        calculateDistanceCalc();

        getGasPrice(function(){
        var daysOfWeek = $("#daysCalc").val();
        var otherCosts = $("#otherCalc").val();
        var distanceInt = distance.split(' ');
        distanceInt = parseFloat(distanceInt[0]);
        var gasInt = parseFloat(gasPrice.substr(1));
        var mpg = userVehicle.combined;


        console.log(daysOfWeek);
        console.log(parseInt(otherCosts));
        console.log(distanceInt);
        console.log(gasInt);
        console.log(mpg);
        console.log("-----");
        calculateMonthlyCost(mpg, distanceInt, gasInt, parseInt(daysOfWeek), parseInt(otherCosts), function(totalCost, carbonEmmitted){
        console.log(totalCost);
        if (totalCost > 0){
            $("#loadContainer").hide();
            var html = "<h1 class='text-center'>Your monthly cost to commute is $" + totalCost.toFixed(2) + " per month</h1>";
            html += "<h1 class='text-center'>Your will reduce your carbon footprint by " + carbonEmmitted.toFixed(2) + " lbs of CO2 per month*</h1>";
            $("#calculatorResults").html(html);
        }
        });

        });
    });


});