
$(document).ready(function(){
   
    let storageProducts = JSON.parse(localStorage.getItem("products"));
    let totalPrice = 0;
    
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
            <td> <input type="number" value=${q}  size="3" min="1" class="productQuantity"> </input> </td> 
            <td> <input type="button" value="Ta bort vara" class="removeProduct"> </input> </td></tr> `;
            totalPrice += (Number(totalProductPrice));
        };
        
        tableStr += `</table>`;
        $("#productsInCart").html(tableStr);
        $("#totalPriceLabel").html(`Totalpris på ordern: `); 
        $("#totalPriceSpace").html(totalPrice);
        $(".productQuantity").click(changeQuantity);
        $(".removeProduct").click(removeProduct);
  
    }




    function changeQuantity(event){
        let tableCell = event.target.parentElement;
        let rowIndex = tableCell.parentElement.rowIndex;
        let newQuantity = tableCell.children[0].value;
        let price = tableCell.previousElementSibling.previousElementSibling.innerText;
        let oldPrice =  Number(tableCell.previousElementSibling.innerText);
        let newPrice = newQuantity*price;
        let priceChange = newPrice - oldPrice;

        totalPrice += priceChange; 
       

        console.log("priceCHange" + priceChange);
        console.log("totalPrice " + totalPrice);
        

        // sätt totalpris för enskild produkt och totalsumma för order
        tableCell.previousElementSibling.innerText = newPrice;
        $("#totalPriceSpace").html(totalPrice);

        // spara nya kvantitet i local storage
        storageProducts[rowIndex-1].quantity = newQuantity;
        
        localStorage.setItem("products", JSON.stringify(storageProducts));
        storageProducts = JSON.parse(localStorage.getItem("products"));



    }
     

    function removeProduct(event){
        let tableCell = event.target.parentElement;
        let rowIndex = event.target.parentElement.parentElement.rowIndex;
        console.log(rowIndex);
        console.log(storageProducts[rowIndex - 1]);

        // nollställ värden i ordertabell
        console.log(tableCell.previousElementSibling.children[0].value);
        tableCell.previousElementSibling.children[0].value = 0;
        tableCell.previousElementSibling.children[0].disabled = true;
        totalPrice -= tableCell.previousElementSibling.previousElementSibling.innerText;
        $("#totalPriceSpace").html(totalPrice);
        tableCell.previousElementSibling.previousElementSibling.innerText = 0;

        // ta bort vara från array
        storageProducts.splice(rowIndex-1, 1);
        console.log(storageProducts);
        localStorage.setItem("products", JSON.stringify(storageProducts));
        storageProducts = JSON.parse(localStorage.getItem("products"));

    }




   

});
