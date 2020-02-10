import { action, observable } from 'mobx';
import { notificationsRef, initialMessaging } from '../services/messaging.service';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
// import { batchRef, createId, employeeRef } from "../services/data.service";

export default class MessagingStore {
	@observable notificationOpen: any = null;
	@observable notificationOpenedListener: any = null;
	@observable notificationListener: any = null;
	@observable notificationListenerDisplay: any = null;
	@observable messageListener: any = null;
	@observable fcmToken: any = null;

	@action
	async checkPermission() {
		this.fcmToken = await initialMessaging();
	}

	@action
	async setUserToken() {
		let fcmToken = await AsyncStorage.getItem('fcmToken');
		// console.log('fcmToken', fcmToken);
		if (!fcmToken) {
			fcmToken = await firebase.messaging().getToken();
			if (fcmToken) {
				await AsyncStorage.setItem('fcmToken', fcmToken);
			}
		}
	}

	@action
	async initialNotification() {
		
		// this.notificationListenerDisplay = await notificationsRef().onNotificationDisplayed((notification) => {
		// 	const { data } = notification;
		// 	console.log('data', data)
		// 	this.showNotification(data);
		// });

		this.notificationListener = await notificationsRef().onNotification((notification: any) => {
			const { data } = notification;
			this.showNotification(data);
		});

		// this.notificationOpenedListener = notificationsRef().onNotificationOpened((notificationOpen) => {
		// 	const { title, body } = notificationOpen.notification;
		// 	this.showNotification(title, body);
		// });
		// const notificationOpen = await notificationsRef().getInitialNotification();
		// if (notificationOpen) {
		// 	const { title, body } = notificationOpen.notification;
		// 	this.showNotification(title, body);
		// }

		firebase.messaging().subscribeToTopic('bakseynews');
		this.messageListener = firebase.messaging().onMessage((message) => {
			const { data } = message;
			// console.log('data', data);
			// console.log('title,body', message);
			this.showNotification(data);
		});
	}

	@action
	showNotification(data: any) {
		const { title, body } = data;
		const notification = new firebase.notifications.Notification()
			.setNotificationId('notificationId')
			.setTitle(title)
			.setBody(body)
			.setData({
				key1: title
			});
		firebase.notifications().displayNotification(notification);
	}

	@action
	stopListener() {
		if (this.notificationOpenedListener) this.notificationOpenedListener();
		if (this.notificationListener) this.notificationListener();
		if (this.notificationOpen) this.notificationOpen();
		if (this.messageListener) this.messageListener();
	}
}
