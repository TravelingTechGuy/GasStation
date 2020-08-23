import React, {useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { Ionicons } from '@expo/vector-icons';

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
    <View style={styles.container}>
      <TouchableOpacity style={styles.topLeftButton} onPress={saveSettingsAndGoBack}>
        <Ionicons name="md-save" size={32} color={Colors.offWhite} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Settings Screen</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    flexDirection: 'column',
    padding: 10,
    alignItems: 'center'
  },
  headerText: {
    fontSize: 27,
    textAlign: 'center',
    color: Colors.offWhite,
    position: 'absolute',
    top: 60
  },
  switch: {
    width: '90%'
  },
  text: {
    color: Colors.offWhite,
    padding: 10,
    fontSize: 20
  },
  topLeftButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    height:32,
    width:32
  }
});
