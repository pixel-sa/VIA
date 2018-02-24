var DASHBOARD = {
    runtime:{
        busTripDate:'',
        routeSelectedId: ''

    },

    init: function () {
        console.log("bus javascript init");

        DASHBOARD.logTripButton();
        DASHBOARD.formInputEvents();

        $("#log-trip-form").submit(function (e) {
           console.log("form submitted");
            e.preventDefault();

            var busTripDate = $("#bus-trip-date").val();

            if(!busTripDate){
                //TODO NEED TO ADD SOME VALIDATION HERE.... color being overwritten
                console.log("error");
                $("#bus-trip-date").css("background-color","#ff706d;");
                return false;
            }

            DASHBOARD.runtime.busTripDate = busTripDate
            $('#log-trip-modal').modal('toggle');

            console.log(DASHBOARD.runtime.busTripDate);
            console.log(DASHBOARD.runtime.routeSelectedId);
            return false;
        });

    },

    logTripButton: function () {
        $("#save-trip-btn").on("click", function () {
            console.log("log a trip button clicked");
        });

    },

    formInputEvents: function () {
        $('#route-select').on('change',function() {
            console.log($(this).val());
            DASHBOARD.runtime.routeSelectedId = $(this).val();

        });

        $("#bus-trip-date").datepicker({
          autoclose: true

      });

    },

    html: {

    },
    ajax: {

    }
};