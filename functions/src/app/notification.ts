import * as admin from "firebase-admin";

export async function onNotificationDevices(data: any, context: any) {
  const doc: any = data;
  const { name, fileurl, key } = doc;
  const message = {
    topic: `bakseynews`,
    data: {
      title: "bakseynews",
      body: name,
      key: key
    },
    notification: {
      title: "bakseynews",
      body: name,
      imageUrl: fileurl
    },
    apns: {
      payload: {
        aps: {
          "mutable-content": 1,
          sound: "default"
        }
      },
      fcm_options: {
        image: fileurl
      }
    },
    android: {
      notification: {
        title: "bakseynews",
        body: name,
        image: fileurl,
        sound: "default"
      }
    }
  };

  await admin
    .messaging()
    .send(message)
    .then(response => {})
    .catch(error => {});
  // await admin.messaging().sendToDevice(pushToken, payload, options)
  // return admin.messaging().sendToTopic("TDNews", payload, options).then(response => {
  // }).catch(error => {
  // });
}
