package via

import grails.plugin.springsecurity.annotation.Secured
import via.ServiceResponse

//@Secured(['ROLE_ADMIN', 'ROLE_USER', 'IS_AUTHENTICATED_FULLY'])
@Secured(['permitAll'])

class TripProfileController {
    def tripsService

    def index() { }

    def saveTripInformation(){
        ServiceResponse serviceResponse = tripsService.saveTripInformation(params)
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

    def getUserRoutes(){
        ServiceResponse serviceResponse = tripsService.getUserRoutes()
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

    def logTripToDatabase(){
        println(params)
        ServiceResponse serviceResponse = tripsService.logTripToDatabase(params)
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
