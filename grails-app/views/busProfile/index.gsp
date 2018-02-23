<%--
  Created by IntelliJ IDEA.
  User: viviancan
  Date: 2/22/18
  Time: 12:25 AM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Bus Profile</title></head>

<body>

    <div class="container">
        <div class="col-sm-12">
            <h1>BUS PROFILE</h1>

            <h3>Set Up Route:</h3>
            <div class="input-group" id="starting-address-div">
                <input type="text" class="form-control" placeholder="Starting Address" id="starting-address-input">
            </div>
        </div>
    </div>

        <asset:script>
            BUS.init();
        </asset:script>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDyx0uEogAaWBQzcFkUAnz0vAC0I12pZNc&libraries=places"
    async defer></script>


</body>
</html>