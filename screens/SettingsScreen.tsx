import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import SwitchSelector from 'react-native-switch-selector';
import { Ionicons } from '@expo/vector-icons';

import Screen from '../components/Screen';
import useSettings from '../hooks/useSettings';
import {APIs} from '../config/constants';
import Colors from '../config/colors';

export default ({navigation, route}) => {
  const {settings, saveSettings} = useSettings();
  const [interval, setInterval] = useState(settings?.interval || 0);
  const [api, setAPI] = useState(settings?.api || API.EthGasStation);

  const options = [
    { label: 'No', value: 0 },
    { label: '1 minute', value: 1 },
    { label: '5 minutes', value: 5 },
    { label: '15 minutes', value: 15 },
    { label: '30 minutes', value: 30 },
    { label: '1 hour', value: 60 },
  ];

  const index = options.findIndex(o => o.value === interval);

  const saveSettingsAndGoBack = () => {
    saveSettings({interval, api});
    navigation.goBack();
  };

  return (
    <Screen
      headerText={<><Ionicons name='md-settings' size={24} color={Colors.offWhite} />  Settings Screen</>}
      buttonIconName="md-save"
      buttonAction={saveSettingsAndGoBack}
    >
      <View style={styles.form}>
        <Text>Please select gas API:</Text>
        <Picker
          selectedValue={api}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            setAPI(itemValue)
          }>
          <Picker.Item value={APIs.EthGasStation} label={APIs.EthGasStation} />
          {/* <Picker.Item value={APIs.EthGasWatch} label={APIs.EthGasWatch} /> */}
          <Picker.Item value={APIs.GasNow} label={APIs.GasNow} />
        </Picker>
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
  picker: {
    backgroundColor: Colors.dark,
    color: Colors.offWhite,
    padding: 10,
    fontSize: 20,
    width: 300
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
