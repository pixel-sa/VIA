"use strict";
$(document).ready(function () {
    "use strict";

    $("#testScrape").on("click", function(){
        var zipcode = $("#gasZipcode").val();

        $.ajax({
            url: "/application/getGasPrices?zipcode=" + zipcode,
            success: function (response) {
                if (response && response.result){
                    console.log(response.data)
                }

            }
        })
    })


});