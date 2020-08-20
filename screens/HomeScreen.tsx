import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import GasPrice from '../components/GasPrice';
import Colors from '../config/colors';

export default ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.settings} onPress={() => navigation.navigate('Settings')}>
        <Ionicons name="md-settings" size={32} color={Colors.offWhite} />
      </TouchableOpacity>
      <Text style={styles.headerText}>
        ⛽ Gas Prices (in <Text style={{fontStyle: 'italic'}}>gwei</Text>):
      </Text>
      <GasPrice />
    </View>
  );
}

const styles = StyleSheet.create({
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
    paddingBottom: 10
  },
  settings: {
    position: 'absolute',
    top: 30,
    left: 20,
    height:32,
    width:32
  }
});
