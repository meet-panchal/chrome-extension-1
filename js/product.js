var url = window.location.search;
url = url.replace("?", '');
$('#product_table').DataTable();
$(function() {
    $("#product_date").datepicker();
});
var isEmpty = 1;
var uiSettings = {
    json_data: { "customer_details": customer_details_arr },
    isEmpty: false
};
var customer_details_arr = []
var products = []

var json_data = {
    "customer_details": customer_details_arr
}
var storeIsEmpty = localStorage["isEmpty"];
if (storeIsEmpty != isEmpty) {
    localStorage["isEmpty"] = isEmpty;
    localStorage['uiSettings'] = JSON.stringify(uiSettings);
}
uiSettings = JSON.parse(localStorage["uiSettings"]);
var useful_data = uiSettings.json_data.customer_details
for (let element of useful_data) {
    for (key in element) {
        if ((element[key]) == url) {
            $("#customer_name").text(element.customer_name)
            $("#customer_id").text(element.customer_id)
        }
    }
}
$("#product_close_button").click(function() {
    $("#product_form").trigger("reset");
});
function generateTable(table, data) {
    $('#table-html').html('');
    var tableHtml = '';
    for (let i = 0; i < data.length; i++) {
        var element = data[i];
        tableHtml += `<tr>
            <td>${element.customer_name}</td>
            <td>${element.customer_date}</td>
            <td>${element.customer_city}</td>
            <td>${element.customer_type}</td>
            <td>${element.customer_id}</td>
            <td>${element.pending_amount}</td>
            <td>${element.total_amount}</td>
            <td><i class='far fa-eye' data-id ="${element.customer_id}"></i>
            <i class='fas fa-user-edit' data-id ="${element.customer_id}"></i>
            <i class='fas fa-trash' data-id ="${element.customer_id}"></i>
            </td>
            </tr>`

    }
    $('#table-html').html(tableHtml);
}
$("#product_save_button").click(function(){
    var product_name = $("#product_name").val()
    var product_price = parseInt($("#product_price").val(),10)
    var product_date = $("#product_date").val()
    var amount_paid = parseInt($("#amount_paid").val(),10)
    for (let element of useful_data) {
        for (key in element) {
            if ((element[key]) == url && product_price > amount_paid) {
                element.products.push({
                    "product_name": product_name,
                    "product_price" : product_price,
                    "product_date" : product_date,
                    "amount_paid" : amount_paid,
                    "pending_amount" : product_price-amount_paid
                })
            }else{
                alert("Paid amount can't be greater than Product Price")
            }
        }
        console.log(element.products)
    }
})