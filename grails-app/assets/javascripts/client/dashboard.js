var DASHBOARD = {
    runtime:{
        busTripDate:'',
        routeSelectedId: '',
        getUserRoutesLink: '',
        userRouteList: '',
        logTripToDatabaseLink: ''
    },

    init: function (getUserRoutesLink, logTripToDatabaseLink) {
        console.log("bus javascript init");

        DASHBOARD.runtime.getUserRoutesLink = getUserRoutesLink;
        DASHBOARD.runtime.logTripToDatabaseLink = logTripToDatabaseLink;

        DASHBOARD.logTripButtonClicked();
    },

    logTripFormSubmitted: function () {
        $("#log-trip-form").submit(function (e) {
            console.log("form submitted");
            e.preventDefault();

            var busTripDate = $("#bus-trip-date").val();
            console.log(busTripDate);

            //TODO NEED TO ADD SOME VALIDATION HERE.... color being overwritten
            // if(!busTripDate){
            //     console.log("error");
            //     $("#bus-trip-date").css("background-color","#ff706d;");
            //     return false;
            // }

            DASHBOARD.runtime.busTripDate = busTripDate;

            DASHBOARD.ajax.logTripToDatabase(function (response) {
                console.log(response);
            });

            $('#log-trip-modal').modal('toggle');

            return false;
        });
    },

    logTripButtonClicked: function () {
        $("#log-trip-btn").on("click", function () {
            console.log("log a trip button clicked");
            //modal html rendered
            DASHBOARD.html.showLogTripModal();
            DASHBOARD.formInputEvents();
            //getting user routes
            DASHBOARD.ajax.getUserRoutes(function (response) {
               console.log(response);
               if(response && response.result){
                   DASHBOARD.renderRoutesInSelect(response.data);
                   DASHBOARD.logTripFormSubmitted();

               } else{
                   //TODO HANDLE error if routes were not successfully received.
               }
            });
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

    renderRoutesInSelect:function (routes) {
        $.each(routes, function (i, value){
            $("#route-select")
                .append($("<option></option>")
                    .attr("value" , value.id)
                    .text(value.routeName));
        });
    },

    html: {
        showLogTripModal: function () {
            var html = "";
            html += '<div id="log-trip-modal" class="modal fade" role="dialog">';
            html += '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">Log a Ride</h4>';
            html += '</div>';
            html += '<div class="modal-body">';
            html += '<form class="form-horizontal" role="form" id="log-trip-form">';
            html += '<div class="form-group">';
            html += '<label for="route-select">Select Route</label>';
            html += '<select class="form-control" id="route-select">';
            html += '<option value=""> - SELECT ROUTE -</option>';

            html += '</select>';
            html += '</div>';
            html += '<div class="form-group">';
            html += '<label for="bus-trip-date">Select Date</label>';
            html += '<input class="form-control" id="bus-trip-date" placeholder="Select Date">';
            html += '</div>';
            html += '<div class="form-group">';
            html += '<div class="col-sm-10 text-center">';
            html += '<button type="submit" class="btn btn-default" id="log-trip-btn">Save Ride</button>';
            html += '</div>';
            html += '</div>';
            html += '</form>';
            html += '</div>';
            html += '<div class="modal-footer">';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';

            $("#modal-div").html(html);
        }
    },
    ajax: {
        getUserRoutes: function (callback) {
            $.ajax({
                url: DASHBOARD.runtime.getUserRoutesLink,
                success: function (response) {
                    DASHBOARD.runtime.userRouteList = response.data;
                    callback(response)
                }
            })

        },
        logTripToDatabase: function (callback) {
            var params = "?routeId=" + DASHBOARD.runtime.routeSelectedId + "&tripDate=" + DASHBOARD.runtime.busTripDate;
            console.log(params);

            $.ajax({
                url: DASHBOARD.runtime.logTripToDatabaseLink + params,
                success: function (response) {
                    console.log(response);
                    callback(response)
                }
            })

        }
    }
};