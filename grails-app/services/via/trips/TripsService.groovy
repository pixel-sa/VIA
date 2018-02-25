package via.trips

import com.via.auth.User
import grails.transaction.Transactional
import via.Route
import via.ServiceResponse
import via.Statistic
import via.Trip
import via.UserProfile
import via.UserVehicle

import javax.xml.ws.Service

@Transactional
class TripsService {
    def userService
    def gasPricesService

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
            route.durationInMinutes = params.durationInMinutes
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


    def getUserRoutes(){
        ServiceResponse serviceResponse = new ServiceResponse()

        try{
            UserProfile userProfile = userService.getLoggedInUserProfile()
            log.info(userProfile)

            def routeList = Route.findAllByUserProfile(userProfile)

            if(routeList.size() > 0){
                serviceResponse.success = true
                serviceResponse.result = routeList

            } else{
                serviceResponse.success = false
                serviceResponse.fail("Failed to save route")

            }

        }catch(Exception e){
            log.error("Error retrieving user routes: " + e)
            serviceResponse.fail("Error retrieving user routes.")
        }
        return serviceResponse

    }

    def logTripToDatabase(params){
        ServiceResponse serviceResponse = new ServiceResponse()

        try{
            UserProfile userProfile = userService.getLoggedInUserProfile()
            Route route = Route.findById(params.routeId)

            Date date = new Date(params.tripDate)

            def gasPrice = gasPricesService.getLocalGasPrice(route.origin)
            gasPrice = gasPrice.substring(1) as Double
            log.info(gasPrice)
            def distance = route.distanceInMiles.split()
            distance = distance[0] as Double
            log.info(distance)

            UserVehicle userVehicle = UserVehicle.findByUserProfile(userProfile)
            def drivingCost = ((distance * 2) / userVehicle.mpg) * gasPrice
            log.info(drivingCost)

            def carbonRate
            if (userVehicle.fuelType == "Diesel") {
                carbonRate = 22.4
            }else{
                carbonRate = 19.6
            }
            def carbonEmitted = distance * 2 * carbonRate
            log.info(carbonEmitted)


            Trip trip = new Trip()
            trip.dateOfTrip = date
            trip.userProfile = userProfile
            trip.route = route
            trip.carbonEmitted = carbonEmitted.round(2)
            trip.drivingCost = drivingCost.round(2)

            Trip persistedTrip =  trip.save(flush: true, failOnError: true)
            if(persistedTrip){

                def statistic = Statistic.findByUserProfile(userProfile)
                println(statistic)

                if(!statistic){
                    //create one
                    Statistic newStatistic = new Statistic()
                    newStatistic.totalBusRides = 1
                    newStatistic.userProfile = userProfile
                    newStatistic.totalMoneySaved = drivingCost.round(2) as Double
                    newStatistic.totalCarbonReduced = carbonEmitted.round(0)
                    def timeNotDriving = route.durationInMinutes.split()
                    newStatistic.totalMinutesNotDriving = timeNotDriving[0] as Integer

                    Statistic persistedStatistic = newStatistic.save(flush: true, failOnError: true)

                    if(persistedStatistic){
                        serviceResponse.success = true
                        serviceResponse.result = [persistedTrip, persistedStatistic]

                    } else {
                        serviceResponse.success = false
                        serviceResponse.fail("Failed to add new statistic")
                    }

                } else {
                    //add to statistic
                    statistic.totalBusRides = statistic.totalBusRides + 1
                    statistic.totalMoneySaved = (statistic.totalMoneySaved + (drivingCost as Double)).round(2)
                    statistic.totalCarbonReduced = statistic.totalCarbonReduced + carbonEmitted.round(0)
                    def timeNotDriving = route.durationInMinutes.split()
                    statistic.totalMinutesNotDriving = (statistic.totalMinutesNotDriving as Integer) + (timeNotDriving[0] as Integer)
                    statistic.save(flush: true, failOnError: true)

                    serviceResponse.success = true
                    serviceResponse.result = [persistedTrip, statistic]
                }

            }else{
                log.info(params)
                log.info(trip)
                serviceResponse.success = false
                serviceResponse.fail("Failed to log trip")
            }

        }catch(Exception e){
            log.error("Error logging trip: " + e)
            serviceResponse.fail("Error logging trip.")
        }

        return serviceResponse

    }

    def getStatistics(userProfile){
        ServiceResponse serviceResponse = new ServiceResponse()
        try{
            Statistic statistic = Statistic.findByUserProfile(userProfile)
            if(statistic) {
                serviceResponse.success(statistic)
            }else{
                serviceResponse.fail("no stats")
            }
        }catch (Exception e){
            log.error(e)
            serviceResponse.fail(e)
        }
        return serviceResponse

    }
}
