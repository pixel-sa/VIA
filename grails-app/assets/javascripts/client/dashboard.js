var DASHBOARD = {
    runtime:{
        busTripDate:'',
        routeSelectedId: '',
        getUserRoutesLink: '',
        userRouteList: '',
        logTripToDatabaseLink: ''
    },

    init: function (getUserRoutesLink, logTripToDatabaseLink) {

        DASHBOARD.runtime.getUserRoutesLink = getUserRoutesLink;
        DASHBOARD.runtime.logTripToDatabaseLink = logTripToDatabaseLink;

        DASHBOARD.logTripButtonClicked();
        DASHBOARD.addNewRouteEvent();
    },

    logTripFormSubmitted: function () {
        $("#log-trip-form").submit(function (e) {
            e.preventDefault();

            var busTripDate = $("#bus-trip-date").val();

            //TODO NEED TO ADD SOME VALIDATION HERE.... color being overwritten
            // if(!busTripDate){
            //     console.log("error");
            //     $("#bus-trip-date").css("background-color","#ff706d;");
            //     return false;
            // }

            DASHBOARD.runtime.busTripDate = busTripDate;

            DASHBOARD.ajax.logTripToDatabase(function (response) {
                console.log(response);
                DASHBOARD.html.updateStatistics(response.data[1]);
            });

            $('#log-trip-modal').modal('toggle');

            return false;
        });
    },

    logTripButtonClicked: function () {
        $("#log-trip-btn").on("click", function () {
            //modal html rendered
            DASHBOARD.html.showLogTripModal();
            DASHBOARD.formInputEvents();
            //getting user routes
            DASHBOARD.ajax.getUserRoutes(function (response) {
               if(response && response.result){
                   DASHBOARD.renderRoutesInSelect(response.data);
                   DASHBOARD.logTripFormSubmitted();

               } else{
                   //TODO HANDLE error if routes were not successfully received.
               }
            });
        });
    },

    addNewRouteEvent: function () {
        $("#add-new-route-btn").on("click", function () {
            DASHBOARD.html.showNewRouteModal();
        })
    },

    formInputEvents: function () {
        $('#route-select').on('change',function() {
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
            html += '<div class="col-sm-10 col-sm-offset-1 text-center">';
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
        },
        showNewRouteModal: function () {
            var html = "";
            html += '<div id="add-new-route-modal" class="modal fade" role="dialog">';
            html += '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">Add new route</h4>';
            html += '</div>';
            html += '<div class="modal-body">';
            html += '<form class="form-horizontal" role="form" id="log-trip-form">';
            html += '<div class="form-group">';
            html += '<input type="text" class="form-control" placeholder="Starting Address" id="starting-address-input">';
            html += '</div>';
            html += '<div class="form-group">';
            html += '<input type="text" class="form-control" placeholder="Ending Address" id="ending-address-input">';
            html += '</div>';
            html += '<div class="form-group">';
            html += '<input type="text" class="form-control" placeholder="Trip Name" id="route-name-input">';
            html += '</div>';
            html += '<div class="form-group">';
            html += '<div class="col-sm-10 col-sm-offset-1 text-center">';
            html += '<button type="submit" class="btn btn-default" id="add-new-route-btn">Save Route</button>';
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
        },
        updateStatistics: function(statistics) {
            $("#statsRow").show();
            $("#totalRides").text(statistics.totalBusRides);
            $("#moneySaved").text('$' + statistics.totalMoneySaved);
            $("#carbonSaved").text(statistics.totalCarbonReduced);
            $("#minSaved").text(statistics.totalMinutesNotDriving);
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
            $.ajax({
                url: DASHBOARD.runtime.logTripToDatabaseLink + params,
                success: function (response) {
                    callback(response)
                }
            })

        }
    }
};