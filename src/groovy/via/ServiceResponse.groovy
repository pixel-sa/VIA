package via

class ServiceResponse {

    def errors = []
    Boolean success
    Object result

    def isSuccessful() {
        if(success == Boolean.TRUE) {
            return true
        } else {
            return false
        }
    }

    public void fail(String message) {
        errors.add(message)
        success = Boolean.FALSE
    }

    public void success(def object) {
        result = object
        success = Boolean.TRUE
    }

}
