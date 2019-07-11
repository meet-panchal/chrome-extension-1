// var version = "2.0";
// var uiSettings = {
//     json_data: {},
// };

// var myApp = {
//     search_change: false,
//     onExtMessage: function(message, sender, sendResponse) {
//         myApp.message = message;
//         switch (message.command) {
//             case "saveUISettings":
//                 uiSettings = message.data;
//                 myApp.saveUISettings(message.data, sender, sendResponse);
//                 break;
//             case "getSettings":
//                 if (message.callback == "yes") {
//                     sendResponse({
//                         "uiSettings": uiSettings
//                     });
//                 } else {
//                     sendMessage(sender, {
//                         "command": "rec_getSettings",
//                         "data": {
//                             "uiSettings": uiSettings
//                         }
//                     });
//                 }
//                 break;
//         }
//     }
// }