var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BPIBnvlNx7qUP9FpX6avjrBOXLx6o-XqjjZnli6E8_1751IwgNMNKCvPCWk6RdEl5rvQktU1pe34fQ7GejeYE80",
    "privateKey": "T4dC43uQyfTIo349NH-8S5FwwbofTV8rlFbr4mNP77M"
};


webPush.setVapidDetails(
    'mailto:ini@email.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dAu-FTu4K3w:APA91bGx4E6ZDoDzkkoWiMnedmjk4p8VClqqNX9bMjz084GiNECTBEFobz0RZz-H5YPMWdpPVnAQ0aUAU2FS61qN25mnxf-cWI_r9zeL8e-aw8NyqwBdcsK7pPjeDlE4hIzte4PwEla6",
    "keys": {
        "p256dh": "BKM06oYmU8C4JSluxFi/fVkpell4iKnkMHW0dsKyU+LKryw3dCqZNAwtvYgjVndUJS59CEkHE3EIiEKFNkw6dtI=",

    }
};
var payload = 'ini adalah contoh push menggunakan FCM.';

var options = {
    gcmAPIKey: '526801071293',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
