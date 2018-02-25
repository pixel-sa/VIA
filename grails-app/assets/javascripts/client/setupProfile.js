
"use strict";
$(document).ready(function () {
    "use strict";

    <!--  ********  Event Handlers **********   -->

    $("#setupUserProfileForm").submit(function(e) {
        e.preventDefault();
        var email = $(this).find("#email").val();
        var firstName = $(this).find("#firstName").val();
        var lastName = $(this).find("#lastName").val();
        var phone = $(this).find("#phone").val();

        if(email.trim() === '' || firstName.trim() === '' || lastName.trim() === ''){
            $("#setupUserError").text("You must fill out all fields");
        }else{
            saveUserProfile(email, firstName, lastName, phone)
        }

    });


    <!--  ******** END Event Handlers **********   -->

    <!--    ******* HTML Render  ********     -->




    <!--    ******* END HTML Render  ********     -->

    <!--  ********  AJAX requests **********   -->

    function saveUserProfile(email, firstName, lastName, phone) {
        $.ajax({
            url: "/dashboard/submitUserProfile?email=" + email + "&firstName=" + firstName + "&lastName=" + lastName + "&phone=" + phone,
            success: function(response) {
                if(response && response.result) {
                    $("#setupUserError").text("");
                    $("#setupUserProfileForm").hide();
                    $("#vehicleFormContainer").show();
                }else {
                    console.log(response);
                    $("#setupUserError").text("Error saving profile");
                }
            }
        })
    }




    <!--  ******** END AJAX requests **********   -->

});