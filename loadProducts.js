$(document).ready(function(){

    load();

    function load(){
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://webacademy.se/fakestore/");
        xhr.send();
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status == 200){
                render(JSON.parse(xhr.responseText));
            }
        };
    }

    function render(json){
        console.log(json.length);
        console.log(json[0].title);

        let output = `<div class ="products">  <div class="row">`;
         
        for(i = 0; i < json.length; i++){
            output += `<div class="product col-md-3"> 
                <img class="product-image rounded" src=" ` + json[i].image + `" alt="">
                <span class="product-name"> ` + json[i].title + `</span> 
                <span class="product-descr"> `+ json[i].description + `</span>
                <span class="product-price"> Pris: ` + json[i].price + `$ </span>
                <span class="product-category">` + json[i].category + `</span>
                <input class="add-to-cart" type="button" value="Lägg till i varukorg">  
            </div>`;
        };      
        
        $("#output").html(output);
        
        $(".add-to-cart").click(addToCart());
    };
    
});
