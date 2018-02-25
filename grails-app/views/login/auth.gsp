<g:set var='securityConfig' value='${applicationContext.springSecurityService.securityConfig}'/>
<html>
	<head>
		<meta name="layout" content="main"/>
		<s2ui:title messageCode='spring.security.ui.login.title'/>
		<asset:stylesheet src='spring-security-ui-auth.css'/>
	</head>
	<body>
		<div class="container" style='text-align:center;'>
			<div>
			<s2ui:form type='login' focus='username'>
				<div class="col-md-4 col-md-offset-4">
				<h2>Login to Busvi</h2>
					<div class="form-group">
						<label for="username">Username</label>
						<input type="text" name="${securityConfig.apf.usernameParameter}" id="username" required class="form-control input-lg" />
					</div>

					<div class="form-group">
						<label for="password">Password</label>
						<input type="text" name="${securityConfig.apf.passwordParameter}" id="password" required class="form-control input-lg" />
					</div>

					<div class="form-group">
						<g:link controller="login" action="">
							<button type="submit" id="loginButton "class="btn btn-lg btn btn-block">Sign In</button>
						</g:link>
					</div>

					<div>
						<g:link controller="register">Create account</g:link>
						 or <g:link controller='register' action='forgotPassword'>reset password</g:link>
					</div>

				</div>
			</s2ui:form>
			</div>
		</div>
	</body>
</html>
