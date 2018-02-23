"use strict";
$(document).ready(function () {
    "use strict";

    $("#testScrape").on("click", function(){
        var zipcode = $("#gasZipcode").val();

        $.ajax({
            url: "/vehicleProfile/getGasPrices?zipcode=" + zipcode,
            success: function (response) {
                if (response && response.result){
                    console.log(response.data)
                    $("#gasPriceForm").append('<h2>Local Avg Gas Price ' + response.data + '</h2>');
                }

            }
        })
    })


});