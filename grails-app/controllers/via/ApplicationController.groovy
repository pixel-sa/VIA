package via

import javax.annotation.security.PermitAll

@PermitAll
class ApplicationController {

    def vehiclesService
    def gasPricesService

    def index() {}

//  -----  ajax requests  ---------

    def getMakes(){
        ServiceResponse serviceResponse = vehiclesService.getMakes(params)
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

    def getModels(){
        ServiceResponse serviceResponse = vehiclesService.getModels(params)
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

    def getEngines(){
        ServiceResponse serviceResponse = vehiclesService.getEngines(params)
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

    def getGasPrices(){
        def result = gasPricesService.getLocalGasPrice(params.zipcode)
        render(contentType: "application/json"){
            [result: true, data: result]
        }
    }

}
