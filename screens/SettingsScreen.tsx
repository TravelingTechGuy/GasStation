import React, {useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { Ionicons } from '@expo/vector-icons';

import Screen from '../components/Screen';
import useSettings from '../hooks/useSettings';
import Colors from '../config/colors';

export default ({navigation, route}) => {
  const {settings, saveSettings} = useSettings();
  const [interval, setInterval] = useState(settings?.interval || 0);

  const options = [
    { label: 'No', value: 0 },
    { label: '1 minute', value: 1 },
    { label: '5 minutes', value: 5 },
    { label: '10 minutes', value: 10 },
    { label: '3 minutes', value: 30 },
    { label: '1 hour', value: 60 },
  ];

  const index = options.findIndex(o => o.value === interval);

  const saveSettingsAndGoBack = () => {
    saveSettings({interval});
    navigation.goBack()
  };

  return (
    <Screen
      headerText={<><Ionicons name='md-settings' size={24} color={Colors.offWhite} />  Settings Screen</>}
      buttonIconName="md-save"
      buttonAction={saveSettingsAndGoBack}
    >
      <View style={styles.form}>
        <Text style={styles.text}>Would you like to auto refresh the prices:</Text>
        <SwitchSelector
          style={{width: '90%'}}
          options={options}
          initial={index}
          onPress={(value: number) => setInterval(value)}
          backgroundColor={Colors.blue}
          selectedColor={Colors.light}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  form: {
    flexDirection: 'column',
    padding: 10,
    alignItems: 'center'
  },
  switch: {
    width: '90%'
  },
  text: {
    color: Colors.offWhite,
    padding: 10,
    fontSize: 20
  },
});
