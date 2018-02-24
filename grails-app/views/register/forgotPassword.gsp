<html>
	<head>
		<meta name="layout" content="main"/>
		<s2ui:title messageCode='spring.security.ui.forgotPassword.title'/>
	</head>
	<body>
		<s2ui:formContainer type='forgotPassword' focus='username' width='50%'>
			<s2ui:form beanName='forgotPasswordCommand'>
				<g:if test='${emailSent}'>
				<br/>
				<g:message code='spring.security.ui.forgotPassword.sent'/>
				</g:if>
				<g:else>
				<br/>
				<h3><g:message code='spring.security.ui.forgotPassword.description'/></h3>
				<table>
					<s2ui:textFieldRow name='username' size='25' labelCodeDefault='Username'/>
				</table>
				<s2ui:submitButton elementId='submit' messageCode='spring.security.ui.forgotPassword.submit'/>
				</g:else>
			</s2ui:form>
		</s2ui:formContainer>
	<asset:javascript src='spring-security-ui-register.js'/>
	<s2ui:showFlash/>
	<s2ui:deferredScripts/>
	</body>
</html>
