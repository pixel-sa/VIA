package via

import grails.plugin.springsecurity.annotation.Secured


@Secured(['ROLE_ADMIN', 'ROLE_USER', 'IS_AUTHENTICATED_FULLY'])
class DashboardController {
    def userService
    def userVehicleService
    def tripsService

    def index() {
        UserProfile userProfile = userService.getLoggedInUserProfile()
        ServiceResponse serviceResponse = tripsService.getStatistics(userProfile)
        if (serviceResponse.isSuccessful()){
            render(view: "index", model: ['hasStats': true,'statistics': serviceResponse.result])
        }else{
            render(view: 'index', model: ['hasStats': false])
        }
    }

    def setupProfile() {}

    def leaderboard() {
        ServiceResponse serviceResponse = userService.getLeaderboard()
        if (serviceResponse.isSuccessful()){
            render(view: "leaderboard", model: ["leaderboard": serviceResponse.result])
        }

    }

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
