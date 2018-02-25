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
        %{--<h1 class="text-left">Set Up Route</h1>--}%
        <g:render template="routeForm" />
    </div>


    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDyx0uEogAaWBQzcFkUAnz0vAC0I12pZNc&libraries=places" ></script>
    <asset:javascript src="tripProfile.js"></asset:javascript>

</body>
</html>