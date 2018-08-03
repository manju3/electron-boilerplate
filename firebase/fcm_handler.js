(function () {
    let senderId = "1042218093345";
    let projectId = "";
    let baseURL = "https://apps.klario.net";
    const comServerApi = "/comserver/notification/setting/add";
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
            "projectId": projectId,
            "registrationId": token
        });
    }
    //===========================================================

    window.addEventListener("REGISTER_FOR_DESKTOP_NOTIFICATION", function (evt) {
        if(evt.baseURL)
        baseURL = evt.baseURL;
        senderId = evt.senderId;
        projectId = evt.projectId;
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