package via

class BusFare {
    String fare
    String fullPrice
    String reducedPrice

    static constraints = {
        fare nullable: false
        fullPrice nullable: false
        reducedPrice nullable: true
    }
}
