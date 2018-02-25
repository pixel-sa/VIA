package via

class Statistic {
    Integer totalBusRides
    String totalMoneySaved
    Integer totalCarbonReduced
    Integer totalMinutesNotDriving

    static belongsTo = [userProfile: UserProfile]

    static constraints = {

        totalBusRides nullable: false
        totalMoneySaved nullable: true
        totalCarbonReduced nullable: true
        totalMinutesNotDriving nullable:false
    }
}
