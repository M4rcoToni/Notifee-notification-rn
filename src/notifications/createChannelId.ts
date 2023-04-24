import notifee, { AndroidImportance } from '@notifee/react-native';
export async function createChannelId() {

  const channelId = await notifee.createChannel({
    id: 'teste',
    name: 'sales',
    vibration: true,
    importance: AndroidImportance.HIGH,
  })

  return channelId;
}