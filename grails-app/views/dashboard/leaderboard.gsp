
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Dashboard</title>

</head>
<body id="dashboard">
        <div id="modal-div"></div>
        <div class="content">
            <div class="container-fluid">

            <div class="col-xs-12 col-md-offset-2 col-md-8">
                <h1 style="line-height: .9em";>Leaderboard<br /><small>Greenest Users</small></h1>

                <table class="table table-bordered table-striped table-responsive">
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Total $ Saved</th>
                        <th>Total CO2 Saved</th>
                        <th>Time not Driving</th>
                    </tr>
                    </thead>
                    <tbody>
                    <g:each in="${leaderboard}" var="statistic" status="counter">
                        <tr>
                            <td>${counter + 1}</td>
                            <td>${statistic.userProfile.user.username}</td>
                            <td>${statistic.totalCarbonReduced} lbs</td>
                            <td>$${statistic.totalMoneySaved}</td>
                            <td>${statistic.totalMinutesNotDriving} mins</td>
                        </tr>
                    </g:each>
                    </tbody>
                </table>
            </div>

            </div>
        </div>
</body>
</html>