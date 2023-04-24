import notifee from '@notifee/react-native';
import { createChannelId } from './createChannelId';

export async function updateNotification(id: number, title: string, body: string) {
  await notifee.requestPermission();

  const channelId = await createChannelId();
  await notifee.displayNotification({
    id: id.toString(),
    title: title,
    body: body,
    android: { channelId }
  });
}
