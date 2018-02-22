package via

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_ADMIN', 'ROLE_USER', 'IS_AUTHENTICATED_FULLY'])
class DashboardController {

    def index() { }
}
