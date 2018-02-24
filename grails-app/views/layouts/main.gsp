<!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"><!--<![endif]-->
	<head>

		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title><g:layoutTitle default="Grails"/></title>

		<link rel="shortcut icon" href="${assetPath(src: 'favicon.ico')}" type="image/x-icon">
		<link rel="apple-touch-icon" href="${assetPath(src: 'apple-touch-icon.png')}">
		<link rel="apple-touch-icon" sizes="114x114" href="${assetPath(src: 'apple-touch-icon-retina.png')}">

		<!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

		<!-- Optional theme -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/simplex/bootstrap.min.css">
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet">


		<asset:stylesheet src="application.css"/>
		<asset:javascript src="application.js"/>

		<g:layoutHead/>
	</head>
	<body>

	%{--<div id="grailsLogo" role="banner"><a href="http://grails.org"><asset:image src="grails_logo.png" alt="Grails"/></a></div>--}%
		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" id="logo" href="/">
						<asset:image alt="via-logo" src="SVG-busvi-logo.svg"/>
					</a>

					<h1 class="brand brand-name navbar-left">Busvi</h1>

				<sec:ifLoggedIn>
							Welcome, <sec:username />
					</sec:ifLoggedIn>
				</div>

				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

					<ul class="nav navbar-nav navbar-right">
						<sec:ifLoggedIn>
							<li><a href="${createLink(controller: "dashboard", action: "index")}">Dashboard</a></li>

							<li><a href="${createLink(controller: "tripProfile", action: "index")}">Bus Profile</a></li>
							<li><a href="${createLink(controller: "vehicleProfile", action: "index")}">Vehicle Profile</a></li>
							<li><a href="${createLink(controller: "logout")}">Logout</a></li>
						</sec:ifLoggedIn>

						<sec:ifNotLoggedIn>
							<li><a href="${createLink(controller: "login")}">Login</a></li>
						</sec:ifNotLoggedIn>

						<sec:ifSwitched>
							<a href='${request.contextPath}/j_spring_security_exit_user'>
								Resume as <sec:switchedUserOriginalUsername />
							</a>
						</sec:ifSwitched>

						%{--<li class="dropdown">--}%
							%{--<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>--}%
							%{--<ul class="dropdown-menu">--}%
								%{--<li><a href="#">Action</a></li>--}%
								%{--<li><a href="#">Another action</a></li>--}%
								%{--<li><a href="#">Something else here</a></li>--}%
								%{--<li role="separator" class="divider"></li>--}%
								%{--<li><a href="#">Separated link</a></li>--}%
							%{--</ul>--}%
						%{--</li>--}%
					</ul>
				</div><!-- /.navbar-collapse -->
			</div><!-- /.container-fluid -->
		</nav>






		<g:layoutBody/>
		%{--<div class="footer" role="contentinfo"></div>--}%
		%{--<div id="spinner" class="spinner" style="display:none;"><g:message code="spinner.alt" default="Loading&hellip;"/></div>--}%
		%{--<g:layoutFooter/>--}%

		%{--<span>--}%
			%{--<div id='loginLinkContainer'>--}%
				%{--<sec:ifLoggedIn>--}%
					%{--Logged in as <sec:username /> (<g:link controller='logout'>Logout</g:link>)--}%
				%{--</sec:ifLoggedIn>--}%
				%{--<sec:ifNotLoggedIn>--}%
					%{--<g:link controller='login'>Login</g:link>--}%
				%{--</sec:ifNotLoggedIn>--}%

				%{--<sec:ifSwitched>--}%
					%{--<a href='${request.contextPath}/j_spring_security_exit_user'>--}%
						%{--Resume as <sec:switchedUserOriginalUsername />--}%
					%{--</a>--}%
				%{--</sec:ifSwitched>--}%
			%{--</div>--}%
		%{--</span>--}%

	%{--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>--}%

	</body>
</html>
