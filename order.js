
$(document).ready(function(){

    
    const storageProducts = JSON.parse(localStorage.getItem("products"));
    
    if(storageProducts.length == 0 || localStorage.getItem("products") === null){
        console.log(storageProducts.length);
        $("#productsInCart").html("<h2>Inga produkter i varukorgen.</h2>");
    } else {
        //$("#productsInCart").html("<h2>Produkter i varukorgen: </h2>")
        populateCartTable(storageProducts);
    };

    function populateCartTable(array){
        //let cartList = $("#productsList");
        let tableStr = `<h2>Produkter i varukorgen: </h2>`;
        tableStr += `<table class = "table thead-light table-striped" width=75%> <tr>
            <th>Vara</th> <th>Pris</th> <th>Antal</th>
        </tr> `;
        let totalPrice = 0;
        
        for(i = 0; i < array.length; i++){
            tableStr += `<tr> <td>` + array[i].title + `</td> 
            <td>` + array[i].price + `</td> 
            <td> <input type="number" value=1 size="3>" </input> </td> </tr> `;
            totalPrice += (Number(array[i].price));
        };
        
       
        tableStr += `</table>`;
        //console.log(tableStr);
        tableStr += `<p class="text-end me-3"> Totalpris på ordern: ` + totalPrice + `</p>`;
        $("#productsInCart").html(tableStr);
  
    };


    $("#submit").click(function(){
        let userName = $("#namebox").val();
        let phone = $("#phonebox").val();
        let email = $("emailbox").val();
        let street = $("#streetbox").val();
        let postal = $("#postalbox").val();


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
