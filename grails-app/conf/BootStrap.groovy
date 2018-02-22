import com.via.auth.*
import via.BusFare

class BootStrap {

    def init = { servletContext ->
        //This set of code will create admin user when the application first runs
//        def adminRole = Role.findOrSaveWhere(authority: "ROLE_ADMIN")
//
//        def user = User.findOrSaveWhere(username: "admin" , password: "password" )
//
//        if( !user.authorities.contains(adminRole)){
//            UserRole.create(user, adminRole, true)
//        }

        //This set of code will populate BusFare table with current VIA bus rates
        //http://www.viainfo.net/rates/

//        new BusFare(fare: "Regular Bus", fullPrice: "1.30", reducedPrice: "0.65").save()
//        new BusFare(fare: "Express Bus Service", fullPrice: "2.60", reducedPrice: "1.30").save()
//        new BusFare(fare: "Transfers", fullPrice: "0.15", reducedPrice: "0.07").save()
//        new BusFare(fare: "VIAtrans Service", fullPrice: "2.00").save()
//        new BusFare(fare: "VIAtrans Child", fullPrice: "0.90").save()
//        new BusFare(fare: "Park & Ride Service", fullPrice: "2.50", reducedPrice: "1.25").save()

    }
    def destroy = {
    }
}
