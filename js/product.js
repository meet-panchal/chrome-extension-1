var url = window.location.search;
url = url.replace("?", '');
$('#product_table').DataTable();
let table = document.querySelector("#product_table_body");
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
var total_pending_amount = 0
var total_product_amount = 0

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
    $('#product_table_body').html('');
    var tableHtml = '';
    for (let i = 0; i < data.length; i++) {
        var element = data[i];
        tableHtml += `<tr>
            <td>${element.product_name}</td>
            <td>${element.product_date}</td>
            <td>${element.product_price}</td>
            <td>${element.amount_paid}</td>
            <td>${element.pending_amount}</td>
            </tr>`

    }
    $('#product_table_body').html(tableHtml);
}
$("#product_save_button").click(function() {
    var product_name = $("#product_name").val()
    var product_price = parseInt($("#product_price").val(), 10)
    var product_date = $("#product_date").val()
    var amount_paid = parseInt($("#amount_paid").val(), 10)
    if (product_name == "" || product_price == "" || product_date == "" || amount_paid == "") {
        alert("Fill all the details")
    } else {
        for (var element of useful_data) {
            for (key in element) {
                if ((element[key]) == url && product_price >= amount_paid) {
                    element.products.push({
                        "product_name": product_name,
                        "product_price": product_price,
                        "product_date": product_date,
                        "amount_paid": amount_paid,
                        "pending_amount": product_price - amount_paid
                    })
                    uiSettings.json_data.customer_details = useful_data;
                    localStorage["uiSettings"] = JSON.stringify(uiSettings);
                    var index = useful_data.indexOf(element)
                    var product_data = uiSettings.json_data.customer_details[index].products
                }
            }
        }
        generateTable(table, product_data)
        for (let price of product_data) {
            for (key in price) {
                if (key == "pending_amount") {
                    total_pending_amount += price[key]
                }
            }
        }
        for (var element of useful_data) {
            for (key in element) {
                if ((element[key]) == url) {
                    element.pending_amount = total_pending_amount
                    uiSettings.json_data.customer_details = useful_data;
                    localStorage["uiSettings"] = JSON.stringify(uiSettings);
                    var index = useful_data.indexOf(element)
                    var product_data = uiSettings.json_data.customer_details[index].products
                }
            }
        }
        for (let price of product_data) {
            for (key in price) {
                if (key == "product_price") {
                    total_product_amount += price[key]
                }
            }
        }
        for (var element of useful_data) {
            for (key in element) {
                if ((element[key]) == url) {
                    element.total_amount = total_product_amount
                    uiSettings.json_data.customer_details = useful_data;
                    localStorage["uiSettings"] = JSON.stringify(uiSettings);
                    var index = useful_data.indexOf(element)
                    var product_data = uiSettings.json_data.customer_details[index].products
                }
            }
        }
        document.location.reload(true)
    }
})

$(document).ready(function() {
    uiSettings = JSON.parse(localStorage["uiSettings"]);
    var useful_data = uiSettings.json_data.customer_details
    for (var element of useful_data) {
        for (key in element) {
            if ((element[key]) == url) {
                uiSettings.json_data.customer_details = useful_data;
                localStorage["uiSettings"] = JSON.stringify(uiSettings);
                var index = useful_data.indexOf(element)
                var product_data = uiSettings.json_data.customer_details[index].products
            }
        }
    }
    for (let price of product_data) {
        for (key in price) {
            if (key == "pending_amount") {
                total_pending_amount += price[key]
            }
        }
    }
    for (var element of useful_data) {
        for (key in element) {
            if ((element[key]) == url) {
                element.pending_amount = total_pending_amount
                uiSettings.json_data.customer_details = useful_data;
                localStorage["uiSettings"] = JSON.stringify(uiSettings);
                var index = useful_data.indexOf(element)
                var product_data = uiSettings.json_data.customer_details[index].products
            }
        }
    }
    for (let price of product_data) {
        for (key in price) {
            if (key == "product_price") {
                total_product_amount += price[key]
            }
        }
    }
    for (var element of useful_data) {
        for (key in element) {
            if ((element[key]) == url) {
                element.total_amount = total_product_amount
                uiSettings.json_data.customer_details = useful_data;
                localStorage["uiSettings"] = JSON.stringify(uiSettings);
                var index = useful_data.indexOf(element)
                var product_data = uiSettings.json_data.customer_details[index].products
            }
        }
    }
    generateTable(table, product_data)
})

// <td><i class='far fa-eye'></i>
// <i class='fas fa-user-edit'></i>
// <i class='fas fa-trash'></i>
// </td>