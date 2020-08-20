import React, {useState} from 'react';
import { Button, View, StyleSheet, Text, Switch, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../config/colors';

export default ({navigation, route}) => {
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const [interval, setInterval] = useState<number>(10);
  
  const saveSettings = () => {
    navigation.goBack()
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.topLeftButton} onPress={saveSettings}>
        <Ionicons name="md-save" size={32} color={Colors.offWhite} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Settings Screen</Text>
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.text}>Would you like to auto refresh the prices:</Text>
        <Switch
          trackColor={{ true: Colors.green, false: Colors.red }}
          thumbColor={autoRefresh ? Colors.green : Colors.red}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setAutoRefresh(!autoRefresh)}
          value={autoRefresh}
          style={styles.switch}
        />
      </View>
      {
        autoRefresh
        ?
        <>
          <Text style={styles.text}>Interval in minutes:</Text>
          <TextInput 
            style={styles.textInput}
            onChangeText={text => setInterval(parseInt(text, 10) || 0)}
            value={interval.toString() || '0'}
            editable={autoRefresh}
          />
        </>
        :
        null
      }
    </View>
  );
};

const styles =StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 27,
    textAlign: 'center',
    color: Colors.offWhite,
    position: 'absolute',
    top: 50
  },
  switch: {
    backgroundColor: Colors.light
  },
  text: {
    color: Colors.light,
  },
  textInput: {
    height: 20,
    borderStyle: 'solid',
    borderColor: Colors.light,
    borderWidth: 1,
    color: Colors.light
  },
  topLeftButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    height:32,
    width:32
  }
});
