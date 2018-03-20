import {Permissions, Notifications} from 'expo'
import {AsyncStorage} from 'react-native'

const NOTIFICATION_KEY = 'Udacicards:ReviseNotification';

/**
 * Simple notification object creator
 * @returns {{body: string}}
 */
function createNotification() {
    return {
        body: "👋 Don't forget to revise today!"
    }
}

/**
 * Create a reminder exactly 24 hours in the future
 * to remind the user to do revision
 */
export function setLocalNotification() {

    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
                if (data === null) {
                    Permissions.askAsync(Permissions.NOTIFICATIONS)
                        .then((status) => {
                            if (status === 'granted') {
                                Notifications.cancelAllScheduledNotificationsAsync();
                                let nextReminder = new Date();
                                nextReminder.setDate(nextReminder.getDate() + 1); // 24 hours later
                                Notifications.scheduleLocalNotificationAsync(
                                    createNotification(),
                                    {
                                        time: nextReminder,
                                    }
                                );
                                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                            }
                        })
                }
            }
        )
}

/**
 * Remove any pending notifications
 *
 * @returns {Promise<*>|Promise<T>}
 */
export function clearLocalNotifications() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}


