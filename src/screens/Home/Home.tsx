import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import notifee, { AndroidImportance, EventType, TimestampTrigger, TriggerType } from '@notifee/react-native';
import { styles } from './styles';
import { Button } from '../../components/Button';

export function Home() {
  async function createChannelId() {

    const channelId = await notifee.createChannel({
      id: 'teste',
      name: 'sales',
      vibration: true,
      importance: AndroidImportance.HIGH,
    })

    return channelId;
  }


  async function displayNotification() {
    await notifee.requestPermission();

    const channelId = await createChannelId();
    await notifee.displayNotification({
      id: '7',
      title: 'Ola <strong> Marcooo! </strong>  👩🏽‍🚀 ',
      body: 'Essa é a primeira <span style="color: red">notificação.</span>',
      android: { channelId }
    });
  }

  async function updateNotification() {
    await notifee.requestPermission();
    const channelId = await createChannelId();
    await notifee.displayNotification({
      id: '7',
      title: 'Ola <strong> Marco! </strong>  👩🏽‍🚀 ',
      body: 'Essa <span style="color: red">notificação.</span> foi atualiza!',
      android: { channelId }
    })
  }

  async function cancelNotification() {
    await notifee.cancelNotification('7');
  }

  async function scheduleNotification() {
    const date = new Date(Date.now());

    date.setMinutes(date.getMinutes() + 1);

    const channelId = await createChannelId();

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime()
    }

    await notifee.createTriggerNotification({
      title: 'Notificação Agendada!',
      body: 'Essa é uma notificação agendada',
      android: {
        channelId: channelId,
        importance: AndroidImportance.HIGH
      }
    }, trigger);
  }

  function listScheduleNotification() {
    notifee.getTriggerNotificationIds().then(ids => console.log(ids))
  }

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log("Usuario descartou a notificação!");
          break;
        case EventType.PRESS:
          console.log("Usuario tocou na notificação!", detail.notification);
      }
    })
  }, []);

  useEffect(() => {
    return notifee.onBackgroundEvent(async ({ type, detail }) => {
      if (type === EventType.PRESS) {
        console.log("Usuário tocou na notificação!", detail.notification);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Local Notification</Text>
      <Button title='Enviar Notificação' onPress={displayNotification} />
      <Button title='Atualizar Notificação' onPress={updateNotification} />
      <Button title='Cancelar Notificação' onPress={cancelNotification} />
      <Button title='Notificação em 1 min' onPress={scheduleNotification} />
      <Button title='Listar Notificações Agendadas' onPress={listScheduleNotification} />
    </View>
  );
}