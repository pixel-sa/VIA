<%--
  Created by IntelliJ IDEA.
  User: viviancan
  Date: 2/21/18
  Time: 11:21 PM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
    <head>
        <meta name="layout" content="main"/>
        <title>Dashboard</title>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.7.1/css/bootstrap-datepicker.min.css">
    </head>
    <body id="dashboard">
        <div class="container">
            <div class="content">
                <div class="container-fluid">

                    <div id="modal-div"></div>

                    <div class="row">
                        <div class="col-xs-12">
                            <h1>Rider Dashboard </h1>
                            <button type="button" class="btn btn-info btn-sm" data-toggle="modal" id="log-trip-btn"
                                    data-target="#log-trip-modal">Log Ride
                            </button>
                            %{--<button type="button" class="btn btn-info btn-sm" data-toggle="modal" id="add-new-route-btn"--}%
                                    %{--data-target="#add-new-route-modal">Add New Route--}%
                            %{--</button>--}%
                        <g:link controller="tripProfile" action="index">
                            <button type="button" class="btn btn-info btn-sm" id="add-new-route-btn">Add New Route
                            </button>
                        </g:link>
                        </div>
                    </div>


                    <div class="row" id="statsRow" <g:if test="${!hasStats}">style="display: none;"</g:if>>
                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <div class="card card-stats">
                                <div class="card-content" style="padding-bottom: 35px;">
                                    <div class="pull-left">
                                        <i class="material-icons circle-icon" style="background: #0984e3">airport_shuttle</i>
                                    </div>
                                    <p class="category">Number of Rides</p>
                                    <h2 class="title"id="totalRides">${statistics.totalBusRides}</h2>
                                    <small></small>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <div class="card card-stats">
                                <div class="card-content" style="padding-bottom: 35px;">
                                    <div class="pull-left">
                                        <i class="glyphicon glyphicon-piggy-bank circle-icon"
                                           style="background: #ffeaa7"></i>
                                    </div>
                                    <p class="category">Money Saved</p>
                                    <h2 class="title" id="moneySaved">$${statistics.totalMoneySaved}</h2>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <div class="card card-stats">
                                <div class="card-content">
                                    <div class="pull-left">
                                        <i class="glyphicon glyphicon-leaf circle-icon" style="background: #00b894"></i>
                                    </div>
                                    <p class="category">Carbon Reduced</p>
                                    <h2 class="title" id="carbonSaved">${statistics.totalCarbonReduced}</h2>
                                    <small>lbs of CO2</small>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <div class="card card-stats">
                                <div class="card-content">
                                    <div class="pull-left">
                                        <i class="material-icons circle-icon" style="background: #b2bec3">access_time</i>

                                    </div>
                                    <p class="category">Time Not Driving</p>
                                    <h2 class="title" id="minSaved">${statistics.totalMinutesNotDriving}</h2>
                                    <small>minutes</small>
                                </div>
                            </div>
                        </div>

                    </div>
                    %{--<div class="row">--}%
                        %{--<div class="col-md-4">--}%
                            %{--<div class="card">--}%
                                %{--<div class="card-header card-chart" data-background-color="green">--}%
                                    %{--<div class="ct-chart" id="dailySalesChart"></div>--}%
                                %{--</div>--}%
                                %{--<div class="card-content">--}%
                                    %{--<h4 class="title">Daily Sales</h4>--}%
                                    %{--<p class="category">--}%
                                        %{--<span class="text-success"><i class="fa fa-long-arrow-up"></i> 55% </span> increase in today sales.</p>--}%
                                %{--</div>--}%
                                %{--<div class="card-footer">--}%
                                    %{--<div class="stats">--}%
                                        %{--<i class="material-icons">access_time</i> updated 4 minutes ago--}%
                                    %{--</div>--}%
                                %{--</div>--}%
                            %{--</div>--}%
                        %{--</div>--}%
                        %{--<div class="col-md-4">--}%
                            %{--<div class="card">--}%
                                %{--<div class="card-header card-chart" data-background-color="orange">--}%
                                    %{--<div class="ct-chart" id="emailsSubscriptionChart"></div>--}%
                                %{--</div>--}%
                                %{--<div class="card-content">--}%
                                    %{--<h4 class="title">Email Subscriptions</h4>--}%
                                    %{--<p class="category">Last Campaign Performance</p>--}%
                                %{--</div>--}%
                                %{--<div class="card-footer">--}%
                                    %{--<div class="stats">--}%
                                        %{--<i class="material-icons">access_time</i> campaign sent 2 days ago--}%
                                    %{--</div>--}%
                                %{--</div>--}%
                            %{--</div>--}%
                        %{--</div>--}%
                        %{--<div class="col-md-4">--}%
                            %{--<div class="card">--}%
                                %{--<div class="card-header card-chart" data-background-color="red">--}%
                                    %{--<div class="ct-chart" id="completedTasksChart"></div>--}%
                                %{--</div>--}%
                                %{--<div class="card-content">--}%
                                    %{--<h4 class="title">Completed Tasks</h4>--}%
                                    %{--<p class="category">Last Campaign Performance</p>--}%
                                %{--</div>--}%
                                %{--<div class="card-footer">--}%
                                    %{--<div class="stats">--}%
                                        %{--<i class="material-icons">access_time</i> campaign sent 2 days ago--}%
                                    %{--</div>--}%
                                %{--</div>--}%
                            %{--</div>--}%
                        %{--</div>--}%
                    %{--</div>--}%
                    <div class="row">
                        %{--<div class="col-lg-6 col-md-12">--}%
                            %{--<div class="card card-nav-tabs">--}%
                                %{--<div class="card-header" data-background-color="purple">--}%
                                    %{--<div class="nav-tabs-navigation">--}%
                                        %{--<div class="nav-tabs-wrapper">--}%
                                            %{--<span class="nav-tabs-title">Tasks:</span>--}%
                                            %{--<ul class="nav nav-tabs" data-tabs="tabs">--}%
                                                %{--<li class="active">--}%
                                                    %{--<a href="#profile" data-toggle="tab">--}%
                                                        %{--<i class="material-icons">bug_report</i> Bugs--}%
                                                        %{--<div class="ripple-container"></div>--}%
                                                    %{--</a>--}%
                                                %{--</li>--}%
                                                %{--<li class="">--}%
                                                    %{--<a href="#messages" data-toggle="tab">--}%
                                                        %{--<i class="material-icons">code</i> Website--}%
                                                        %{--<div class="ripple-container"></div>--}%
                                                    %{--</a>--}%
                                                %{--</li>--}%
                                                %{--<li class="">--}%
                                                    %{--<a href="#settings" data-toggle="tab">--}%
                                                        %{--<i class="material-icons">cloud</i> Server--}%
                                                        %{--<div class="ripple-container"></div>--}%
                                                    %{--</a>--}%
                                                %{--</li>--}%
                                            %{--</ul>--}%
                                        %{--</div>--}%
                                    %{--</div>--}%
                                %{--</div>--}%
                                %{--<div class="card-content">--}%
                                    %{--<div class="tab-content">--}%
                                        %{--<div class="tab-pane active" id="profile">--}%
                                            %{--<table class="table">--}%
                                                %{--<tbody>--}%
                                                %{--<tr>--}%
                                                    %{--<td>--}%
                                                        %{--<div class="checkbox">--}%
                                                            %{--<label>--}%
                                                                %{--<input type="checkbox" name="optionsCheckboxes" checked>--}%
                                                            %{--</label>--}%
                                                        %{--</div>--}%
                                                    %{--</td>--}%
                                                    %{--<td>Sign contract for "What are conference organizers afraid of?"</td>--}%
                                                    %{--<td class="td-actions text-right">--}%
                                                        %{--<button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-simple btn-xs">--}%
                                                            %{--<i class="material-icons">edit</i>--}%
                                                        %{--</button>--}%
                                                        %{--<button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-simple btn-xs">--}%
                                                            %{--<i class="material-icons">close</i>--}%
                                                        %{--</button>--}%
                                                    %{--</td>--}%
                                                %{--</tr>--}%
                                                %{--<tr>--}%
                                                    %{--<td>--}%
                                                        %{--<div class="checkbox">--}%
                                                            %{--<label>--}%
                                                                %{--<input type="checkbox" name="optionsCheckboxes">--}%
                                                            %{--</label>--}%
                                                        %{--</div>--}%
                                                    %{--</td>--}%
                                                    %{--<td>Lines From Great Russian Literature? Or E-mails From My Boss?</td>--}%
                                                    %{--<td class="td-actions text-right">--}%
                                                        %{--<button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-simple btn-xs">--}%
                                                            %{--<i class="material-icons">edit</i>--}%
                                                        %{--</button>--}%
                                                        %{--<button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-simple btn-xs">--}%
                                                            %{--<i class="material-icons">close</i>--}%
                                                        %{--</button>--}%
                                                    %{--</td>--}%
                                                %{--</tr>--}%
                                                %{--<tr>--}%
                                                    %{--<td>--}%
                                                        %{--<div class="checkbox">--}%
                                                            %{--<label>--}%
                                                                %{--<input type="checkbox" name="optionsCheckboxes">--}%
                                                            %{--</label>--}%
                                                        %{--</div>--}%
                                                    %{--</td>--}%
                                                    %{--<td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit--}%
                                                    %{--</td>--}%
                                                    %{--<td class="td-actions text-right">--}%
                                                        %{--<button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-simple btn-xs">--}%
                                                            %{--<i class="material-icons">edit</i>--}%
                                                        %{--</button>--}%
                                                        %{--<button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-simple btn-xs">--}%
                                                            %{--<i class="material-icons">close</i>--}%
                                                        %{--</button>--}%
                                                    %{--</td>--}%
                                                %{--</tr>--}%
                                                %{--<tr>--}%
                                                    %{--<td>--}%
                                                        %{--<div class="checkbox">--}%
                                                            %{--<label>--}%
                                                                %{--<input type="checkbox" name="optionsCheckboxes" checked>--}%
                                                            %{--</label>--}%
                                                        %{--</div>--}%
                                                    %{--</td>--}%
                                                    %{--<td>Create 4 Invisible User Experiences you Never Knew About</td>--}%
                                                    %{--<td class="td-actions text-right">--}%
                                                        %{--<button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-simple btn-xs">--}%
                                                            %{--<i class="material-icons">edit</i>--}%
                                                        %{--</button>--}%
                                                        %{--<button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-simple btn-xs">--}%
                                                            %{--<i class="material-icons">close</i>--}%
                                                        %{--</button>--}%
                                                    %{--</td>--}%
                                                %{--</tr>--}%
                                                %{--</tbody>--}%
                                            %{--</table>--}%
                                        %{--</div>--}%
                                        %{--<div class="tab-pane" id="messages">--}%
                                            %{--<table class="table">--}%
                                                %{--<tbody>--}%
                                                %{--<tr>--}%
                                                    %{--<td>--}%
                                                        %{--<div class="checkbox">--}%
                                                            %{--<label>--}%
                                                                %{--<input type="checkbox" name="optionsCheckboxes" checked>--}%
                                                            %{--</label>--}%
                                                        %{--</div>--}%
                                                    %{--</td>--}%
                                                    %{--<td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit--}%
                                                    %{--</td>--}%
                                                    %{--<td class="td-actions text-right">--}%
                                                        %{--<button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-simple btn-xs">--}%
                                                            %{--<i class="material-icons">edit</i>--}%
                                                        %{--</button>--}%
                                                        %{--<button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-simple btn-xs">--}%
                                                            %{--<i class="material-icons">close</i>--}%
                                                        %{--</button>--}%
                                                    %{--</td>--}%
                                                %{--</tr>--}%
                                                %{--<tr>--}%
                                                    %{--<td>--}%
                                                        %{--<div class="checkbox">--}%
                                                            %{--<label>--}%
                                                                %{--<input type="checkbox" name="optionsCheckboxes">--}%
                                                            %{--</label>--}%
                                                        %{--</div>--}%
                                                    %{--</td>--}%
                                                    %{--<td>Sign contract for "What are conference organizers afraid of?"</td>--}%
                                                    %{--<td class="td-actions text-right">--}%
                                                        %{--<button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-simple btn-xs">--}%
                                                            %{--<i class="material-icons">edit</i>--}%
                                                        %{--</button>--}%
                                                        %{--<button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-simple btn-xs">--}%
                                                            %{--<i class="material-icons">close</i>--}%
                                                        %{--</button>--}%
                                                    %{--</td>--}%
                                                %{--</tr>--}%
                                                %{--</tbody>--}%
                                            %{--</table>--}%
                                        %{--</div>--}%
                                        %{--<div class="tab-pane" id="settings">--}%
                                            %{--<table class="table">--}%
                                                %{--<tbody>--}%
                                                %{--<tr>--}%
                                                    %{--<td>--}%
                                                        %{--<div class="checkbox">--}%
                                                            %{--<label>--}%
                                                                %{--<input type="checkbox" name="optionsCheckboxes">--}%
                                                            %{--</label>--}%
                                                        %{--</div>--}%
                                                    %{--</td>--}%
                                                    %{--<td>Lines From Great Russian Literature? Or E-mails From My Boss?</td>--}%
                                                    %{--<td class="td-actions text-right">--}%
                                                        %{--<button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-simple btn-xs">--}%
                                                            %{--<i class="material-icons">edit</i>--}%
                                                        %{--</button>--}%
                                                        %{--<button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-simple btn-xs">--}%
                                                            %{--<i class="material-icons">close</i>--}%
                                                        %{--</button>--}%
                                                    %{--</td>--}%
                                                %{--</tr>--}%
                                                %{--<tr>--}%
                                                    %{--<td>--}%
                                                        %{--<div class="checkbox">--}%
                                                            %{--<label>--}%
                                                                %{--<input type="checkbox" name="optionsCheckboxes" checked>--}%
                                                            %{--</label>--}%
                                                        %{--</div>--}%
                                                    %{--</td>--}%
                                                    %{--<td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit--}%
                                                    %{--</td>--}%
                                                    %{--<td class="td-actions text-right">--}%
                                                        %{--<button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-simple btn-xs">--}%
                                                            %{--<i class="material-icons">edit</i>--}%
                                                        %{--</button>--}%
                                                        %{--<button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-simple btn-xs">--}%
                                                            %{--<i class="material-icons">close</i>--}%
                                                        %{--</button>--}%
                                                    %{--</td>--}%
                                                %{--</tr>--}%
                                                %{--<tr>--}%
                                                    %{--<td>--}%
                                                        %{--<div class="checkbox">--}%
                                                            %{--<label>--}%
                                                                %{--<input type="checkbox" name="optionsCheckboxes">--}%
                                                            %{--</label>--}%
                                                        %{--</div>--}%
                                                    %{--</td>--}%
                                                    %{--<td>Sign contract for "What are conference organizers afraid of?"</td>--}%
                                                    %{--<td class="td-actions text-right">--}%
                                                        %{--<button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-simple btn-xs">--}%
                                                            %{--<i class="material-icons">edit</i>--}%
                                                        %{--</button>--}%
                                                        %{--<button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-simple btn-xs">--}%
                                                            %{--<i class="material-icons">close</i>--}%
                                                        %{--</button>--}%
                                                    %{--</td>--}%
                                                %{--</tr>--}%
                                                %{--</tbody>--}%
                                            %{--</table>--}%
                                        %{--</div>--}%
                                    %{--</div>--}%
                                %{--</div>--}%
                            %{--</div>--}%
                        %{--</div>--}%

                        <div class="col-lg-6 col-md-12">
                            <div class="card">
                                <div class="card-header" style="background: #faaaa0;">
                                    <h4 class="title">Most Recent Rides</h4>
                                </div>
                                <div class="card-content table-responsive">
                                    <table class="table table-hover">
                                        <thead class="text-warning">
                                        <th></th>
                                        <th>Route</th>
                                        <th>Date</th>
                                        <th>Money Saved</th>
                                        </thead>
                                        <tbody id="route-table-body">
                                        <tr id="route-table-row">
                                            <td>1</td>
                                            <td>Home | Work</td>
                                            <td>Feb 23, 2018</td>
                                            <td>$6.90</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Work | Home</td>
                                            <td>Feb 23, 2018</td>
                                            <td>$2.15</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Work | Gym</td>
                                            <td> Feb 19,2018</td>
                                            <td>$5.40</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Home | Work</td>
                                            <td>Feb 10, 2017</td>
                                            <td>$3.12</td>
                                        </tr>

                                        <tr>
                                            <td>5</td>
                                            <td>Work | Home</td>
                                            <td>Feb 10, 2017</td>
                                            <td>$5.20</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6 col-md-12">
                            <div>
                            <div class="card">
                            <div class="card-header card-chart" data-background-color="green">
                            <div class="ct-chart" id="dailySalesChart"></div>
                            </div>
                            <div class="card-content">
                            <h4 class="title">Daily Money Saved</h4>
                            <p class="category">
                            %{--<span class="text-success"><i class="fa fa-long-arrow-up"></i> 55% </span> increase in today sales.</p>--}%
                            </div>
                            <div class="card-footer">
                            <div class="stats">
                            %{--<i class="material-icons">access_time</i> updated 4 minutes ago--}%
                            </div>
                            </div>
                            </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.7.1/js/bootstrap-datepicker.min.js"></script>
    <script>
        var getUserRoutesLink = "<%= createLink(controller: "tripProfile", action: "getUserRoutes") %>";
        var logTripToDatabaseLink = "<%= createLink(controller: "tripProfile", action: "logTripToDatabase") %>";

        DASHBOARD.init(getUserRoutesLink, logTripToDatabaseLink);

    </script>


    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDyx0uEogAaWBQzcFkUAnz0vAC0I12pZNc&libraries=places" ></script>
    <asset:javascript src="tripProfile.js"></asset:javascript>

    <script type="text/javascript">
        $(document).ready(function() {

            // Javascript method's body can be found in assets/js/demos.js
            demo.initDashboardPageCharts();

        });
    </script>
    </body>
</html>