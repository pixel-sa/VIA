package via

import com.via.auth.User

class UserProfile {
    String email
    String firstName
    String lastName
    String phone

    static belongsTo = [user: User]
    static hasMany = [route: Route, trip: Trip]

    static constraints = {
        email nullable: false, unique: true
        firstName nullable: false
        lastName nullable: false
        phone nullable: true
    }
}
