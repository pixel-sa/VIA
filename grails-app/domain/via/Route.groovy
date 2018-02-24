package via

class Route {
    String origin
    String destination
    String distanceInMiles
    String routeName

    static belongsTo = [userProfile: UserProfile]
    static hasMany = [trip: Trip]



    static constraints = {
        origin nullable: false
        destination nullable: false
        distanceInMiles nullable: false
        routeName nullable: false
    }
}
