package via.trips

import com.via.auth.User
import grails.transaction.Transactional
import via.ServiceResponse

@Transactional
class TripsService {
    def springSecurityService

    def saveTripInformation(params){
        println(params)
        ServiceResponse serviceResponse = new ServiceResponse()
        try{
            User user = User.get(springSecurityService.principal.id)
            println(user)
            println(user.id)


        }catch(Exception e){
            log.error("Error saving trip information: " + e)
            serviceResponse.fail("Error saving trip information.")
        }
        return serviceResponse
    }
}
