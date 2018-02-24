package via.User

import com.via.auth.User
import grails.transaction.Transactional
import via.ServiceResponse
import via.UserProfile

@Transactional
class UserService {
    def springSecurityService

    def saveUserProfile(params){
        ServiceResponse serviceResponse = new ServiceResponse()
        try{
            def userId = springSecurityService.principal.id
            User user = User.findById(userId as Long)

            UserProfile userProfile = new UserProfile()
            userProfile.email = params.email
            userProfile.firstName = params.firstName
            userProfile.lastName = params.lastName
            userProfile.phone = params.phone
            userProfile.user = user

            UserProfile persistedUserProfile =  userProfile.save(flush: true)
            if (persistedUserProfile){
                serviceResponse.success(persistedUserProfile)
            }else{
                serviceResponse.fail("Failed to save user profile")
            }
        }catch(Exception e) {
            log.error(e)
            serviceResponse.fail("Error saving user profile")
        }
        return serviceResponse
    }

    def getLoggedInUserProfile(){
        try{
            def userId = springSecurityService.principal.id
            User user = User.findById(userId as Long)
            UserProfile userProfile = UserProfile.findByUser(user)
            return userProfile
        }catch (Exception e){
            log.error(e)
        }
    }

}
