import notifee, { AndroidImportance } from '@notifee/react-native';
import { TimestampTrigger, TriggerType } from '@notifee/react-native';
import { createChannelId } from './createChannelId';

export async function scheduleNotification(title: string, body: string, min: number) {
  const date = new Date(Date.now());

  date.setMinutes(date.getMinutes() + min);

  const channelId = await createChannelId();

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime()
  }

  await notifee.createTriggerNotification({
    title: title,
    body: 'Essa é uma notificação agendada',
    android: {
      channelId: channelId,
      importance: AndroidImportance.HIGH
    }
  }, trigger);
}