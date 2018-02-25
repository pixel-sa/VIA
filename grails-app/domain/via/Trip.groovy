package via

class Trip {
    Date dateOfTrip
    String drivingCost
    String carbonEmitted

    static belongsTo = [route: Route, userProfile: UserProfile]

    static constraints = {
        dateOfTrip nullable: false
        drivingCost nullable: true
        carbonEmitted nullable: true
    }
}
