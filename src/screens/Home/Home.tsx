import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import notifee, { EventType } from '@notifee/react-native';
import { styles } from './styles';
import { Button } from '../../components/Button';
import { displayNotification } from '../../notifications/displayNotification';
import { updateNotification } from '../../notifications/updateNotification';
import { scheduleNotification } from '../../notifications/scheduleNotification';
import { cancelNotification } from '../../notifications/cancelNotification';

export function Home() {

  async function sendNotification() {
    await displayNotification
      (
        7,
        'Ola <strong> Marcooo! </strong>  👩🏽‍🚀 ',
        'Essa é a primeira <span style="color: red">notificação.</span>',
      );
  }

  async function existingUpdateNotification() {
    await updateNotification
      (
        7,
        'Ola <strong> Marco! </strong>  👩🏽‍🚀 ',
        'Essa <span style="color: red">notificação.</span> foi atualiza!',
      )
  }

  async function cancelOneNotification() {
    await cancelNotification(7);
  }

  async function toScheduleNotification() {
    await scheduleNotification
      (
        'Notificação Agendada!',
        'Essa notificação foi agendada para 1 minuto!',
        1
      )
  }

  function listScheduleNotification() {
    notifee.getTriggerNotificationIds()
      .then(ids =>
        Alert.alert(ids.length ? 'Notificações agendadas : ' + ids.length : 'Nenhuma notificação agendada')
      )
  }

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log("Usuário descartou a notificação!");
          break;
        case EventType.PRESS:
          console.log("Usuário tocou na notificação!", detail.notification?.id);
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

      <Button title='Enviar Notificação' onPress={sendNotification} />

      <Button title='Atualizar Notificação' onPress={existingUpdateNotification} />

      <Button title='Cancelar Notificação' onPress={cancelOneNotification} />

      <Button title='Notificação em 1 min' onPress={toScheduleNotification} />

      <Button title='Listar Notificações Agendadas' onPress={listScheduleNotification} />
    </View>
  );
}