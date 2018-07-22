(function () {
    const senderId = "685021518799";
    const comServerApi = "/comserver/notification/setting/add";
    const baseURL = "https://www.klario.tech";
    const { machineId } = require("node-machine-id");
    const { init } = require("./firebase/fcm");
    const axios = require("axios");
    //=======================================

    const comServerApiCall = function (token, mid) {
        axios.post(baseURL + comServerApi, {
            "externalId": localStorage.getItem("userId"),
            "isRegistered": true,
            "notificationDeviceType": "Browser",
            "notificationDeviceId": mid,
            "projectId": "klario-35f61",
            "registrationId": token
        })
    }
    //===========================================================

    window.addEventListener("REGISTER_FOR_DESKTOP_NOTIFICATION", function (evt) {
        if(evt.baseURL)
        baseURL = evt.baseURL;
        init(senderId);
    });
    window.addEventListener("ENABLE_DESKTOP_FCM", function () {
        localStorage.setItem("DESKTOP_NOTIFICATION", "true");
    });
    window.addEventListener("DISABLE_DESKTOP_FCM", function () {
        localStorage.setItem("DESKTOP_NOTIFICATION", "false");
    });
    window.addEventListener("TOKEN_GENERATED", function (data) {
        machineId().then(function (mid) {
            console.log(data.token, "\nid:  ", mid);
            comServerApiCall(data.token, mid)
        })
    })
})(); 