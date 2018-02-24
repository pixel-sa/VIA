package via

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_ADMIN', 'ROLE_USER', 'IS_AUTHENTICATED_FULLY'])
class DashboardController {
    def userService
    def userVehicleService

    def index() { }

    def setupProfile() {}

    def submitUserProfile() {
        ServiceResponse serviceResponse = userService.saveUserProfile(params)
        if(serviceResponse.isSuccessful()) {
            render(contentType: "application/json") {
                [result: true, data: serviceResponse.result]
            }
        }else {
            render(contentType: "application/json") {
                [result: false, errors: serviceResponse.errors]
            }
        }
    }

    def saveUserVehicle(){
        ServiceResponse serviceResponse = userVehicleService.saveUserVehicle(params)
        if(serviceResponse.isSuccessful()) {
            render(contentType: "application/json") {
                [result: true, data: serviceResponse.result]
            }
        }else {
            render(contentType: "application/json") {
                [result: false, errors: serviceResponse.errors]
            }
        }
    }

}
