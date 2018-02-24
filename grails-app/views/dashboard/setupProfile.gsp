<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Setup Profile</title>

</head>
<body>
    <h1 class="text-center">Welcome, lets set up your account</h1>
    
    <div id="setUpContainer" class="col-md-10 col-md-offset-1 col-xs-12">
        <form action="" id="setupUserProfileForm">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" name="email" id="email" class="form-control" />
            </div>
            <div class="form-group">
                <label for="firstName">First Name:</label>
                <input type="text" name="firstName" id="firstName" class="form-control" />
            </div>
            <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input type="text" name="lastName" id="lastName" class="form-control" />
            </div>
            <div class="form-group">
                <label for="phone">Mobile Number:</label>
                <input type="text" name="phone" id="phone" class="form-control" />
            </div>
            <div class="form-group">
                <span class="error" id="setupUserError"></span>
                <button type="submit" id="submitUserProfile" class="btn btn-default">Submit</button>
            </div>
        </form>

    </div>
    




    <g:render template="../vehicleProfile/vehicles" />


</body>
</html>
