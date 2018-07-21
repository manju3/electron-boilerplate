(function () {
    const senderId = "434688724841";
    const comServerFullApi = "";
    const { init } = require("./libraries/fcm");
    const axios = require("axios");
    //=======================================

    const comServerApiCall = function() {
        axios.post(comServerFullApi, {
            data: "yes",
        })
    }

    window.addEventListener("TOKEN_GENERATED", function(data) {
        console.log(data);
    })
    window.addEventListener("REGISTER_FOR_DESKTOP_NOTIFICATION", function() {
        init(senderId);
    });
})();