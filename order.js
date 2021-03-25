
$(document).ready(function(){

    // skapa och anropa en load-funktion direkt

    
    const storageProducts = JSON.parse(localStorage.getItem("products"));
    
    if(storageProducts.length == 0 || localStorage.getItem("products") === null){
        console.log(storageProducts.length);
        $("#productsInCart").html("<h2>Inga produkter i varukorgen.</h2>");
    } else {
        //$("#productsInCart").html("<h2>Produkter i varukorgen: </h2>")
        populateCartTable(storageProducts);
    }

    function populateCartTable(array){
        //let cartList = $("#productsList");
        let tableStr = `<h2>Produkter i varukorgen: </h2>`;
        tableStr += `<table class = "table thead-light table-striped" width=75%> <tr>
            <th>Vara</th> <th>Pris för en vara</th> <th>Totalt pris för vara</th> <th>Antal</th>
        </tr> `;
        let totalPrice = 0;
        
        for(i = 0; i < array.length; i++){
            let q = array[i].quantity;
            let price = array[i].price;
            let totalProductPrice = price;
            
            if(q > 1){
                totalProductPrice = q * price;
            } 
            // ` + Number(q) +
            tableStr += `<tr> <td>` + array[i].title + `</td> 
            <td class=".priceCell" > ${price} </td>
            <td class=".priceCell" > ${totalProductPrice} </td> 
            <td> <input type="number" value=${q}  size="3" min="1" class="productQuantity"> </input> </td> </tr> `;
            totalPrice += (Number(totalProductPrice));
        };
        
        tableStr += `</table>`;
        //console.log(tableStr);
        //tableStr += ;
        $("#productsInCart").html(tableStr);
        $("#totalPriceSpace").html(`<p class="text-end me-3"> Totalpris på ordern: ` + totalPrice + `</p>`);
        $(".productQuantity").click(changeQuantity);
  
    }


    function changeQuantity(event){
        let tableCell = event.target.parentElement;
        let rowIndex = tableCell.parentElement.rowIndex;
        let newQuantity = tableCell.children[0].value;
        let price = tableCell.previousElementSibling.previousElementSibling.innerText;
        let totalPrice = $("#totalPriceSpace").innerText;
        let oldPrice =  tableCell.previousElementSibling.value;
        let newPrice = newQuantity*price;
    
        console.log("index " + rowIndex);

        console.log("old price " + oldPrice);

        // sätt totalpris för enskild produkt och totalsumma för order
        tableCell.previousElementSibling.innerText = newPrice;

        // spara nya kvantitet i local storage
        storageProducts[rowIndex-1].quantity = newQuantity;
        console.log(typeof(storageProducts[0]));
        console.log(storageProducts);
        localStorage.setItem("products", JSON.stringify(storageProducts));


    }
     
/*
    $("#productsInCart").on("click", "input.productQuantity", function(){
        let id = $(this);
        console.log(id);
    })

    $(".productNo").change(function(){
        let quantity = $(this).parent.value;
        let price = $(this).parents("tr").find(".priceCell").text();
      
        console.log(quantity);
        console.log(price);
        console.dir($(this));
        
        let productIndex = $(this).parents("tr").find(".priceCell").text();
        console.log($(this).parents("td").siblings(".priceCell").children());
        console.log(productIndex.tagName);
        console.dir(productIndex);
    
        // inner html när man väl kommer till rätt elem (via parent, children[typ 1])
        //let price = this.
    });
   */




    $("#submit").click(function(){
        let userName = $("#namebox").val();
        let phone = $("#phonebox").val();
        let email = $("emailbox").val();
        let street = $("#streetbox").val();
        let postal = $("#postalbox").val();


        if(validateForm(userName, phone, email, street, postal)){
            saveUserInfo(userName, phone, email, street, postal);
            alert("Tack för din beställning! :)"); 
            // bör vara en confirmation page, visa kanske sammanställning av beställning och tack och postinfo
            resetForm();
            
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
    

    function saveUserInfo(userName, inPhone, inEmail, street, postal){
        // allt utom email lagras
        localStorage.setItem("name",userName);
        localStorage.setItem("phone", inPhone);
        localStorage.setItem("email", inEmail);
        localStorage.setItem("street", street);
        localStorage.setItem("postal", postal);
    }


});
