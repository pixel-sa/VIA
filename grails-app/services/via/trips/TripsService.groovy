package via.trips

import com.via.auth.User
import grails.transaction.Transactional
import via.Route
import via.ServiceResponse
import via.Statistic
import via.Trip
import via.UserProfile

import javax.xml.ws.Service

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
            log.info(userProfile)
            log.info(route)

            Date date = new Date(params.tripDate)

            Trip trip = new Trip()
            trip.dateOfTrip = date
            trip.userProfile = userProfile
            trip.route = route

            Trip persistedTrip =  trip.save(flush: true, failOnError: true)
            if(persistedTrip){

                def statistic = Statistic.findByUserProfile(userProfile)
                println(statistic)

                if(!statistic){
                    //createe one
                    Statistic newStatistic = new Statistic()
                    newStatistic.totalBusRides = 1
                    newStatistic.userProfile = userProfile

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
}
