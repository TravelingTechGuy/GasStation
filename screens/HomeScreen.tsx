import React from 'react';
import { StyleSheet, Text} from 'react-native';

import Screen from '../components/Screen';
import GasPrice from '../components/GasPrice';

export default ({navigation, route}) => {
  return (
    <Screen
      headerText={<>⛽ Gas Prices (in <Text style={styles.italic}>gwei</Text>):</>}
      buttonIconName="md-settings"
      buttonAction={() => navigation.navigate('Settings')}
    >
      <GasPrice />
    </Screen>
  )
}

const styles = StyleSheet.create({
  italic: {
    fontStyle: 'italic'
  }
});
