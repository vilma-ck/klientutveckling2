$(document).ready(function(){

 $("#submit").click(function(){
    let userName = $("#namebox").val();
    let phone = $("#phonebox").val();
    let email = $("#emailbox").val();
    let street = $("#streetbox").val();
    let postal = $("#postalbox").val();


    console.log(email);

    if(validateForm(userName, phone, email, street, postal)){
        saveUserInfo(userName, phone, email, street, postal);
        resetForm();
        emptyCart();
        window.location.href = "confirmation.html";
        
    };                   
});


function validateForm(userName, phone, email, street, postal){
    if(userName == "" || containsNumbers(userName)){
        alert("Kontrollera namnet!")
        $("#nameboxLabel").append(`<span class="text-danger"> * </span>`);
    } else if(phone == "" || !validPhone(phone)){
        alert("Kontrollera telefonummer, det får bara innehålla siffror!")
        $("#phoneboxLabel").append(`<span class="text-danger"> * </span>`);
    } else if (email == "" || !followsMailFormat(email)){
        alert("Emejl måste vara ifyllt!")
        $("#emailboxLabel").append(`<span class="text-danger"> * </span>`);
    } else if (street == "" || !validAddress(street)){
        alert("Gata måste vara ifyllt!")
        $("#streetboxLabel").append(`<span class="text-danger"> * </span>`);
    } else if(postal == "" || !validAddress(postal)){
        alert("Postnummer och postort måste vara ifyllt!")
        $("#postalboxLabel").append(`<span class="text-danger"> * </span>`);
    } else {
        return true;
    }
}

function containsNumbers(string){
    let alphabeticals = /^[a-zA-Z^\\u0000-\\u007F]*$/;
    if(string.match(alphabeticals)){
        return false;
    } else {
        return true;
    }
}

function validPhone(string){
    let characters = /^\d/;
    if(string.match(characters)){
        return true;
    } else {
        return false;
    }
}

function followsMailFormat(string){
    let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(string.match(mailFormat)){
        return true;
    } else {
        return false; 
    }
}

function validAddress(string){
    let characters = /^[a-zA-Z0-9- X]*$/;
    if(string.match(characters)){
        return true;
    } else {
        return false;
    }
}

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
}

function emptyCart(){
    let storageProducts = JSON.parse(localStorage.getItem("products"));
    storageProducts = [];
    localStorage.setItem("products", JSON.stringify(storageProducts));
}


function saveUserInfo(userName, inPhone, inEmail, street, postal){
    localStorage.setItem("name",userName);
    localStorage.setItem("phone", inPhone);
    localStorage.setItem("email", inEmail);
    localStorage.setItem("street", street);
    localStorage.setItem("postal", postal);
}

});