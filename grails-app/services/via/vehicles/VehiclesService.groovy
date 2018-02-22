package via.vehicles

import grails.transaction.Transactional
import via.ServiceResponse


@Transactional
class VehiclesService {

    def vehicleQueryService

    def getMakes(params) {
        ServiceResponse serviceResponse = new ServiceResponse()
        def year = params.year as Integer
        try{
            def results = vehicleQueryService.findAllMakesByYear(year)
            if(results.size() > 0) {
                serviceResponse.success(results)
            }else {
                serviceResponse.fail("No makes found for " + year)
            }
        }catch (Exception e){
            log.error("Error retrieving makes: " + e)
            serviceResponse.fail("Error retrieving makes for " + year)
        }
        return serviceResponse
    }

    def getModels(params){
        ServiceResponse serviceResponse = new ServiceResponse()
        def make = params.make
        def year = params.year as Integer
        try{
            def results = vehicleQueryService.findAllModelsByMake(make, year)
            if(results.size() > 0) {
                serviceResponse.success(results)
            }else {
                serviceResponse.fail("No models found for " + year + " " + make)
            }
        }catch(Exception e) {
            log.error("Error retrieving models: " + e)
            serviceResponse.fail("Error retrieving models for " + make)
        }
        return serviceResponse
    }

    def getEngines(params){
        ServiceResponse serviceResponse = new ServiceResponse()
        def model = params.model
        def make = params.make
        def year = params.year as Integer
        try{
            def results = vehicleQueryService.findAllEnginesByModel(model, make, year)
            if(results.size() > 0) {
                serviceResponse.success(results)
            }else {
                serviceResponse.fail("No models found for " + year + " " + make)
            }
        }catch(Exception e) {
            log.error("Error retrieving models: " + e)
            serviceResponse.fail("Error retrieving models for " + make)
        }
        return serviceResponse
    }
}
