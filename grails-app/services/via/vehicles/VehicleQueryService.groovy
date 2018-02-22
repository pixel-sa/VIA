package via.vehicles

import grails.transaction.Transactional
import via.Vehicle

@Transactional
class VehicleQueryService {


    def findAllMakesByYear(year) {
        try{
            def criteria = Vehicle.createCriteria()
            def results = criteria.list {
                projections {
                    groupProperty("make")
                }
                eq("year", year)
                order("make", "asc")
            }
            return results == null ? [] : results
        }catch (Exception e){
            log.error(e)
            return []
        }

    }

    def findAllModelsByMake(make, year) {
        try{
            def criteria = Vehicle.createCriteria()
            def results = criteria.list {
                projections {
                    groupProperty("model")
                }
                eq("make", make)
                eq("year", year)
                order("model", "asc")
            }
            return results == null ? [] : results
        }catch (Exception e){
            log.error(e)
            return []
        }
    }

    def findAllEnginesByModel(model, make, year) {
        try{
            def criteria = Vehicle.createCriteria()
            def results = criteria.list {
                eq("model", model)
                eq("make", make)
                eq("year", year)
                order("displacement", "asc")
            }
            return results == null ? [] : results
        }catch (Exception e){
            log.error(e)
            return []
        }
    }
}
