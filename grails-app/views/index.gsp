<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main"/>
		<title>Busvi | Welcome</title>
	</head>

	<body>
		<div class="col-xs-12" id="navbar-section">
			<div class="container">
				<div class="col-xs-12" id="intro-text">
					<h1>Step 1. Track your bus activity.</h1>
					<h1>Step 2. Save money.</h1>
					<h1>Step 3. Change the world.</h1>
				</div>

				%{--<div class="col-xs-12 col-md-3">--}%
					%{--<button id="login-btn" class="btn btn-behance btn-block">Login</button>--}%
						%{--<button id="register-btn" class="btn btn-behance  btn-block">Register</button>--}%
				%{--</div>--}%

			</div>
		</div>

		<div class="col-xs-12 " id="section1">
			<div class="container">
				<div class="col-xs-12 col-md-4">
					<asset:image src="SVG-busvi-logo.svg" class="img-responsive"
								 style="padding-top: 25px;"></asset:image>
				</div>
				<div class="col-xs-12 col-md-7 col-md-offset-1">

					<h2>Busvi - your travel companion. </h2>
					<p id="busvi-info">With Busvi, you are able to track your bus activity, save money, reduce your
					carbon
					footprint, and win prizes! All dashboard statistics are based on your vehicle details, your specific
					commute, and current gas prices. What are you waiting for? Try Busvi today!</p>

				</div>
			</div>


		</div>

		<div class="col-xs-12" id="section2">
			<div class="col-xs-6 col-xs-offset-3" id="calculator-div" style="padding-top: 50px; padding-bottom: 50px">
				<g:render template="calculator" />

				<div id="loadContainer" style="display: none;">
					<h1 class="text-center">Please Wait. <br> Calculating your saving!</h1>
					<g:render template="loader" />
				</div>
				<div id="calculatorResults"></div>

			</div>
		</div>

		<div class="col-xs-12" id="section3">

			<footer class="footer text-right">
				<div class="container">
					<p></p>
				</div>
			</footer>

		</div>




		%{--<g:render template="calculator" />--}%

		%{--<div id="loadContainer" style="display: none;">--}%
			%{--<h1 class="text-center">Please Wait. Calculating your saving!</h1>--}%
			%{--<g:render template="loader" />--}%
		%{--</div>--}%

		%{--<div id="calculatorResults"></div>--}%



		<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDyx0uEogAaWBQzcFkUAnz0vAC0I12pZNc&libraries=places" ></script>
		<asset:javascript src="calculator.js"></asset:javascript>
	</body>
</html>












