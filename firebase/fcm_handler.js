(function () {
    const senderId = "434688724841";
    const comServerFullApi = "";

    const {machineId} = require("node-machine-id");
    const { init } = require("./libraries/fcm");
    const axios = require("axios");
    //=======================================

    const comServerApiCall = function() {
        axios.post(comServerFullApi, {
            data: "yes",
        })
    }

    window.addEventListener("TOKEN_GENERATED", function(data) {
        machineId().then(function(id) {
            console.log(data.token,"\nid\n",id);
        }) 
    })
    window.addEventListener("REGISTER_FOR_DESKTOP_NOTIFICATION", function() {
        init(senderId);
    });
})(); 