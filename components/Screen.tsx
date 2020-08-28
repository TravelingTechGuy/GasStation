import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../config/colors';

export default ({children, headerText, buttonAction, buttonIconName}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.topRightButton} onPress={buttonAction}>
        <Ionicons name={buttonIconName} size={32} color={Colors.offWhite} />
      </TouchableOpacity>
      <Text style={styles.headerText}>
        {headerText}
      </Text>
      {children}
    </View>
  )
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
    position: 'absolute',
    top: 60
  },
  topRightButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    height:32,
    width:32
  }
});
