<%--
  Created by IntelliJ IDEA.
  User: viviancan
  Date: 2/22/18
  Time: 12:25 AM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>

<html>
<head>
    %{--<g:set var="pageTitle" value="Bus Profile" scope="request"/>--}%
    <meta name="layout" content="main"/>
    <title>Bus Profile</title>


</head>

<body>

    <div class="container">
        <div class="col-sm-12">
            <h1>BUS PROFILE</h1>

            <h3>Set Up Route:</h3>
            <div class="input-group" id="starting-address-div">
                <input type="text" class="form-control" placeholder="Starting Address" id="starting-address-input">
            </div>

            <div class="input-group" id="ending-address-div">
                <input type="text" class="form-control" placeholder="Ending Address" id="ending-address-input">
            </div>
            <button id="test-btn" type="submit">click me</button>
        </div>
    </div>


    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDyx0uEogAaWBQzcFkUAnz0vAC0I12pZNc&libraries=places" ></script>
    %{--<asset:javascript src="tripProfile.js"></asset:javascript>--}%
    <asset:script>
        BUS.init();
    </asset:script>

</body>
</html>