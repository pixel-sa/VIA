package via

class Statistic {
    Integer totalBusRides
    Double totalMoneySaved
    Integer totalCarbonReduced
    Integer totalMinutesNotDriving

    static belongsTo = [userProfile: UserProfile]

    static constraints = {

        totalBusRides nullable: true
        totalMoneySaved nullable: true
        totalCarbonReduced nullable: true
        totalMinutesNotDriving nullable: true
    }
}
