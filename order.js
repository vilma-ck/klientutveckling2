
$(document).ready(function(){

    $("#submit").click(function(){
        let userName = $("#namebox").val();
        let phone = $("#phonebox").val();
        let email = $("emailbox").val();
        let street = $("#streetbox").val();
        let postal = $("#postalbox").val();

        // validera innan det lagras

        if(validateForm(userName, phone, email, street, postal)){
            alert("true :)");
            resetForm();
            saveUserInfo(userName, phone, email, street, postal);
        };                   

    });

    function validateForm(userName, phone, email, street, postal){
        if(userName == ""){
            alert("Namn måste vara ifyllt!")
            $("#nameboxLabel").append(`<span class="text-danger"> * </span>`);
            //return false;
        } else if(phone == ""){
            alert("Telefon måste vara ifyllt!")
            $("#phoneboxLabel").append(`<span class="text-danger"> * </span>`);
        } else if (email == ""){
            alert("Emejl måste vara ifyllt!")
            $("#emailboxLabel").append(`<span class="text-danger"> * </span>`);
        } else if (street == ""){
            alert("Gata måste vara ifyllt!")
            $("#streetboxLabel").append(`<span class="text-danger"> * </span>`);
        } else if(postal == ""){
            alert("Postnummer och postort måste vara ifyllt!")
            $("#postalboxLabel").append(`<span class="text-danger"> * </span>`);
        } else {
            return true;
        }
    };

    function resetForm(){
        $("#nameboxLabel").html("Namn");
        $("#namebox").val("");
        $("#phoneboxLabel").html("Telefon");
        $("#phonebox").val("");
        $("#emailboxLabel").html("Emejl");
        $("#emailbox").val("");
        $("#streetboxLabel").html("Gata");
        $("#streetbox").val("");
        $("#postalboxLabel").html("Postnummer och postort");
        $("#postalbox").val("");
    };
    

    function saveUserInfo(userName, inPhone, inEmail, street, postal){
        // allt utom email lagras
        localStorage.setItem("name",userName);
        localStorage.setItem("phone", inPhone);
        localStorage.setItem("email", inEmail);
        localStorage.setItem("street", street);
        localStorage.setItem("postal", postal);
    };


});
