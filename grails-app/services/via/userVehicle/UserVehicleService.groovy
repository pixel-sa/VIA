package via.userVehicle

import grails.transaction.Transactional
import via.ServiceResponse
import via.UserProfile
import via.UserVehicle
import via.Vehicle

@Transactional
class UserVehicleService {
    def userService

    def saveUserVehicle(params) {
        ServiceResponse serviceResponse = new ServiceResponse()
        try{
            UserProfile userProfile = userService.getLoggedInUserProfile()

            Vehicle vehicle = Vehicle.findById(params.vehicleId as Long)
            UserVehicle userVehicle = convertVehicleToUserVehicle(vehicle)
            userVehicle.name = "Testing Purpose"
            userVehicle.userProfile = userProfile
            UserVehicle persistedUserVehicle = userVehicle.save(flush: true)
            if(persistedUserVehicle){
                serviceResponse.success(persistedUserVehicle)
            }else{
                serviceResponse.fail("Failed to save user vehicle")
            }
        }catch (Exception e){
            log.error(e)
            serviceResponse.fail("Error saving user vehicle")
        }
        return serviceResponse

    }

    def convertVehicleToUserVehicle(Vehicle vehicle){
        UserVehicle userVehicle = new UserVehicle()
        userVehicle.year = vehicle.year
        userVehicle.make = vehicle.make
        userVehicle.model = vehicle.make
        userVehicle.fuelType = vehicle.fuelType
        userVehicle.mpg = vehicle.combined

        return userVehicle

    }

}
