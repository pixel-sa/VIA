package via.trips

import com.via.auth.User
import grails.transaction.Transactional
import via.Route
import via.ServiceResponse
import via.UserProfile

@Transactional
class TripsService {
    def userService

    def saveTripInformation(params){
        ServiceResponse serviceResponse = new ServiceResponse()
        try{
            UserProfile userProfile = userService.getLoggedInUserProfile()
            log.info(userProfile)
            Route route = new Route()
            route.origin = params.startingAddress
            route.destination = params.endingAddress
            route.distanceInMiles = params.distanceInMiles
            route.routeName = params.tripName
            route.userProfile = userProfile

            Route persistedRoute =  route.save(flush: true, failOnError: true)
            if(persistedRoute){
                serviceResponse.success(persistedRoute)
            }else{
                log.info(params)
                log.info(route)
                serviceResponse.fail("Failed to save route")
            }

        }catch(Exception e){
            log.error("Error saving trip information: " + e)
            serviceResponse.fail("Error saving trip information.")
        }
        return serviceResponse
    }
}
