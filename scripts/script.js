function displaySpecificShoes() {
    document.getElementById("shoeSelect").addEventListener("click", function(event){
        event.preventDefault()
    });
    var id = document.getElementById('shoeID').value
    const Url1='http://localhost:3000/shoes/'+ id;
    $.ajax({
        url: Url1, 
        method: 'GET',
        success: result => {
            console.log(result);
            document.getElementById("shoeSelect").reset();
        },
        error: error => {
            console.log(`Error ${error}`)
        }
    });
}

function displayAllshoes() {
    const Url2='http://localhost:3000/shoes/';
    $.ajax({
        url: Url2, 
        method: "GET",
        success: result => {
            $('#tbody tr').remove();
            $.each(result.shoes, (i, item) => {
                var eachrow = "<tr>"
                            + "<td>" + item.shoes._id + "</td>"
                            +"<td>" + item.shoes.name + "</td>"
                            + "<td>" + item.shoes.price + "</td>"
                            + "</tr>";
                $('#tbody').append(eachrow);
                            

            })
        },
        error: error => {
            console.log(`Error ${error}`)
        }
});

function displayCart() {
    const Url3='http://localhost:3000/cart/';
    $.ajax({
        url: Url3, 
        method: "GET",
        success: result => {
            $('#tbody tr').remove();
            $.each(result.cart, (i, item) => {
                var eachrow = "<tr>"
                            + "<td>" + item.cart._id + "</td>"
                            +"<td>" + item.cart.quantity + "</td>"
                            + "</tr>";
                $('#tbody').append(eachrow);
                            

            })
        },
        error: error => {
            console.log(`Error ${error}`)
        }
    });
}

}