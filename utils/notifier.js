import {Permissions, Notifications} from 'expo'


function createNotification() {
    return {
        body: "Don't forget to revise today!"
    }
}

/**
 * Create a reminder exactly 24 hours in the future
 * to remind the user to do revision
 */
export default function setLocalNotification() {
    Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then((status) => {
            if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync();
                let nextReminder = new Date()
                nextReminder.setDate(nextReminder.getDate() + 1);
                Notifications.scheduleLocalNotificationAsync(
                    createNotification(),
                    {
                        time: nextReminder,
                    }
                )
            }
        })
}
