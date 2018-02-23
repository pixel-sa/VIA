package via

class UserVehicle {
    Integer year
    String make
    String model
    String fuelType
    Integer mpg
    String name

    static belongsTo = [userProfile: UserProfile]

    static constraints = {
        year nullable: false
        make nullable: false
        model nullable: false
        fuelType nullable: false
        mpg nullable: false
        name nullable: false
    }
}
