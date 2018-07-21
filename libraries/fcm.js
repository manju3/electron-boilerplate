
const { ipcRenderer } = require('electron')
const {
  START_NOTIFICATION_SERVICE,
  NOTIFICATION_SERVICE_STARTED,
  NOTIFICATION_SERVICE_ERROR,
  NOTIFICATION_RECEIVED,
  TOKEN_UPDATED,
} = require('electron-push-receiver/src/constants')


//==============================================
let showNotification = function (fcmNotification) {
  if (fcmNotification.notification.body) {
    let myNotification = new Notification(fcmNotification.notification.title, {
      body: fcmNotification.notification.body
    })

    myNotification.onclick = () => {
      console.log('Notification clicked')
    }
  } else {
    console.log('fcm notification without body', fcmNotification.data)
  }
};

//=======================================
let registerFCMListeners = function () {
  ipcRenderer.on(NOTIFICATION_SERVICE_STARTED, (_, token) => {
    console.log("FCM Service started", token);
  });

  ipcRenderer.on(NOTIFICATION_SERVICE_ERROR, (_, error) => {
    console.log('notification error', error)
  });

  ipcRenderer.on(TOKEN_UPDATED, (_, token) => {
    console.log('token updated', token);
    dispatchEvent(new Event("TOKEN_GENERATED"))
  });

  ipcRenderer.on(NOTIFICATION_RECEIVED, (_, serverNotificationPayload) => {

  });
}
//=====================================================
function registerAppListeners() {

}

//==============================================

let init = function (senderId) {
  registerAppListeners();
  registerFCMListeners();
  ipcRenderer.send(START_NOTIFICATION_SERVICE, senderId);
}

module.exports.init = init;