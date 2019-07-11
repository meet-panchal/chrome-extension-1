var url = window.location.search;
url = url.replace("?", '');
$('#product_table').DataTable();
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
console.log(useful_data)
for (let element of useful_data) {
    for (key in element) {
        if ((element[key]) == url) {
            $("#customer_name").text(element.customer_name)
            $("#customer_id").text(element.customer_id)
        }
    }
}