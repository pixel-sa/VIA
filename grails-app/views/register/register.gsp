<html>
	<head>
		<meta name="layout" content="main"/>
		<s2ui:title messageCode='spring.security.ui.register.title'/>
	</head>
	<body>

		<div class="container" style='text-align:left;'>
			<div>
				<s2ui:formContainer type='register' focus='username'>

					<s2ui:form beanName='registerCommand'>
					<g:if test='${emailSent}'>
						<br/>
						<g:message code='spring.security.ui.register.sent'/>
					</g:if>
					<g:else>

					<div class="col-md-4 col-md-offset-4">
						<h3 class="text-center">Create Your Busvi Account</h3>

						<div class="form-group">
							<label for="username">Username</label>
							<input type="text" name="username" id="username" required class="form-control input-lg" />
						</div>

						<div class="form-group">
							<label for="email">Email</label>
							<input type="text" name="email" id="email" required class="form-control input-lg" />
						</div>

						<div class="form-group">
							<label for="password">Password</label>
							<input type="password" name="password" id="password" required class="form-control input-lg" />
						</div>

						<div class="form-group">
							<label for="password2">Password Again</label>
							<input type="password" name="password2" id="password2" required class="form-control input-lg" />
						</div>


						<div class="form-group">
							<g:link controller="register" action="">
								<button type="submit" id="submit "class="btn btn-lg btn btn-block">Create
								Account</button>
							</g:link>
						</div>

					</div>
					</g:else>
				</s2ui:form>
				</s2ui:formContainer>
				<asset:javascript src='spring-security-ui-register.js'/>
				<s2ui:showFlash/>
				<s2ui:deferredScripts/>
			</div>
		</div>
	</body>
</html>
