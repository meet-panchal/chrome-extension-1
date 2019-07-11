var customer_details_arr = []
let table = document.querySelector("#table-html");
var products = []

var json_data = {
    "customer_details": customer_details_arr
}
var myObj_serialized = JSON.stringify(json_data);
localStorage.setItem("json_data", myObj_serialized)
$('#mytable').DataTable();
$(function() {
    $("#customer_date").datepicker();
});

$("#close_button").click(function() {
    $("#customer_form").trigger("reset");
});

function generateTable(table, data) {
    $('#table-html').html('');
    var tableHtml = '';
    for (let i = 0; i < data.length; i++) {
        var element = data[i];
        tableHtml += "<tr>" +
            "<td>" + element.customer_name + "</td>" +
            "<td>" + element.customer_date + "</td>" +
            "<td>" + element.customer_city + "</td>" +
            "<td>" + element.customer_type + "</td>" +
            "<td>" + element.customer_id + "</td>" +
            "<td>" + element.pending_amount + "</td>" +
            "<td>" + element.total_amount + "</td>" +
            "<td><i class='far fa-eye'></i>" +
            "<i class='fas fa-user-edit'></i>" +
            "<i class='fas fa-trash'></i>" +
            "</td>" +
            "</tr>"

    }
    $('#table-html').html(tableHtml);
}

$("#save_button").click(function() {
    var customer_name = $("#customer_name").val();
    var customer_date = $("#customer_date").val();
    var customer_city = $("#customer_city").val();
    var customer_type = $("#customer_type").val();
    var pending_amount = 0
    var total_amount = 0

    var localdata = JSON.parse(localStorage.getItem("json_data"))
    var useful_data = localdata.customer_details

    function uuidv4() {
        return 'Eliteyxx4xxy'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    var uid = uuidv4()
    if (customer_name != "" && customer_date != "") {
        useful_data.push({
            "customer_name": customer_name,
            "customer_date": customer_date,
            "customer_city": customer_city,
            "customer_type": customer_type,
            "customer_id": uid,
            "pending_amount": pending_amount,
            "total_amount": total_amount,
            "products": products,
        })
    }
    $("#customer_form").trigger("reset");
    var myObj_serialized = JSON.stringify(json_data.customer_details)
    localStorage.setItem("json_data", myObj_serialized)
    var localdata = JSON.parse(localStorage.getItem("json_data"))
    var useful_data1 = localdata.customer_details
    generateTable(table, useful_data1);
})