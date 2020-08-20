import React, {useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Colors from '../config/colors';

export default ({navigation, route}) => 
  <View style={styles.container}>
    <Text style={styles.text}>Settings Screen</Text>
  </View>;

const styles =StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.light,
  }
});
