package via

class Route {
    String origin
    String destination
    String distanceInMiles
    String routeName
    String durationInMinutes


    static belongsTo = [userProfile: UserProfile]
    static hasMany = [trips: Trip]



    static constraints = {
        origin nullable: false
        destination nullable: false
        distanceInMiles nullable: false
        routeName nullable: false
        durationInMinutes nullable: false
    }
}
