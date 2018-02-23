package via

import com.via.auth.User

class UserProfile {
    String email
    String name
    String phone

    static belongsTo = [User]

    static constraints = {
        email nullable: false, unique: true
        name nullable: false
        phone nullable: true
    }
}
