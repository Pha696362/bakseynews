import * as functions from "firebase-functions";
// import { onNotificationDevices } from './app/notification';
import * as admin from "firebase-admin";
import { onNotificationDevices } from "./app/notification";

admin.initializeApp(functions.config().firebase);
const fdb = admin.firestore();
fdb.settings({ timestampsInSnapshots: true });

export const notificationContent = functions.firestore
  .document("content/{id}")
  .onCreate((change, context) => {
    // ... Your code here
    return onNotificationDevices(change.data(), context)});

// export const notificationCourse = functions.firestore
//     .document('courses/{id}').onCreate((change, context) => {
//         return onNotificationDevices(change.after.data(), context)
//     });

//     export const notificationCourse = functions.firestore
//     .document('courses/{id}').onWrite((change, context) => {
//         // ... Your code here
//         return onNotificationDevices(change.after.data(), context)
//     });

// export const createUserOnCollection = functions.firestore.document('subscribers/{key}').onCreate((change, context) => {
//     functions.auth.user().onCreate()
// })

// export const createSubscribersAccount = functions.firestore
//     .document("/subscribers/{key}")
//     .onCreate((change, context) => {
//         return createSubscribersAccountFN(change, context);
//     });
