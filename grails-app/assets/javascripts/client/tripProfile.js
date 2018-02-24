var BUS = {
    runtime:{
        startingAddress: ''

    },
    init: function () {
        console.log("bus javascript init");
    },
    html: {

    },
    ajax: {

    }
};

// $(document).ready(function () {
//     var startingAddress;
//     var endingAddress;
//     var origin1;
//     var destination1;
//
//
//     $("#test-btn").on("click", function() {
//         calculateDistance();
//     });
//
//     function saveStartingAddress(){
//         var startingAddressInput = document.getElementById("starting-address-input");
//         var searchBox = new google.maps.places.SearchBox(startingAddressInput);
//         searchBox.addListener('places_changed', function () {
//             var place = searchBox.getPlaces();
//             console.log(place);
//             startingAddress = place[0].formatted_address;
//             origin1 = startingAddress;
//             calculateDistance();
//
//         });
//
//         //when submit button clicked, geocoding will run
//         // $("#test-btn").on("click", function() {
//         //     geocodeSearch();
//         // });
//     }
//
//     function saveEndingAddress(){
//         var endingAddressInput = document.getElementById("ending-address-input");
//         var searchBox = new google.maps.places.SearchBox(endingAddressInput);
//         searchBox.addListener('places_changed', function () {
//             var place = searchBox.getPlaces();
//             console.log(place);
//             endingAddress = place[0].formatted_address;
//             destination1 = endingAddress;
//             calculateDistance();
//         });
//
//         //when submit button clicked, geocoding will run
//
//     }
//
//     function geocodeSearch(){
//         var userAddressInput = $("#starting-address-input").val();
//         var geocoder = new google.maps.Geocoder();
//         var geocoderOptions = {
//             address: userAddressInput
//         };
//         geocoder.geocode(geocoderOptions, function (results,status){
//             if (status == "OK"){
//                 console.log(results);
//             } else {
//                 console.log("Geocoder Error " + status);
//             }
//         });
//     }
//
//     function calculateDistance() {
//         //https://developers.google.com/maps/documentation/distance-matrix/intro
//         if(origin1 && destination1){
//             console.log("can calculate distance");
//             var geocoder = new google.maps.Geocoder;
//             var service = new google.maps.DistanceMatrixService;
//             service.getDistanceMatrix({
//                 origins: [origin1],
//                 destinations: [destination1],
//                 travelMode: 'DRIVING',
//                 unitSystem: google.maps.UnitSystem.IMPERIAL
//             }, function(response, status){
//                 if(status !== "OK"){
//                     console.log("error" + status);
//                 }else {
//                     console.log(response);
//                     var tripName = "Test Trip";
//                     var distanceInMiles = response.rows[0].elements[0].distance.text;
//                     saveTripInformation(tripName,origin1,destination1,distanceInMiles, function (response) {
//                         console.log("save trip information");
//                         console.log(response);
//                         if(response && response.result){
//                             //sucess
//                         } else {
//                             // error service response
//                         }
//                     });
//
//                 }
//             });
//         } else {
//             console.log("cannot calculate");
//         }
//     }
//
//     /// Calling initial functions ///
//     saveStartingAddress();
//     saveEndingAddress();
//
//     /// AJAX CALLS ///
//
//     function saveTripInformation(tripName, startingAddress, endingAddress, distanceInMiles, callback){
//         var params = "?tripName=" + tripName + "&startingAddress=" + startingAddress + "&endingAddress=" + endingAddress +
//             "&distanceInMiles=" + distanceInMiles;
//
//         $.ajax({
//             url:"/tripProfile/saveTripInformation" + params,
//             success: function (response) {
//                 console.log(response);
//                 callback(response);
//             },
//             error: function () {
//                 // show error
//                 console.log("error saving trip information");
//             }
//         })
//
//
//     }
//
//
//
// });