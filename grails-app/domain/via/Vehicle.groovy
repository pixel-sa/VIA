package via

class Vehicle {
    Integer year
    String make
    String model
    String transmission
    Double displacement
    Integer cylinders
    String fuelType
    Integer highway
    Integer city
    Integer combined

    static constraints = {
        year nullable: false
        make nullable: false
        model nullable: false
        transmission nullable: false
        displacement nullable: false
        cylinders nullable: false
        fuelType nullable: false
        highway nullable: false
        city nullable: false
        combined nullable: false
    }
}
