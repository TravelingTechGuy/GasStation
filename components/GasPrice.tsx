import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../config/colors';

interface Prices {
  low: number,
  medium: number,
  high: number
};

export default () => {
  const [prices, setPrices] = useState<Prices | null>(null);
  const [delta, setDelta] = useState<Prices | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshInterval, setRefreshInterval] = useState<number>(0);
  
  const getCurrentGasPrices = async () => {
    setLoading(true);
    try {
      let start: number = Date.now();
      let response = await fetch('https://ethgasstation.info/json/ethgasAPI.json');
      console.log(Date.now() - start + ' ms');
      let gas = await response.json();
      let newPrices: Prices = {
        low: gas.safeLow / 10,
        medium: gas.average / 10,
        high: gas.fast / 10
      };
      if(prices) {
        let newDelta: Prices = {
          low: newPrices.low - prices.low,
          medium: newPrices.medium - prices.medium,
          high: newPrices.high - prices.high
        };
        setDelta(newDelta);
      }
      setPrices(newPrices);
    }
    catch(err) {
      console.error(err);
    }
    finally {
      setLoading(false);
    }
  };
  
  // const startAutoRefresh = () => setRefreshInterval(setInterval(getCurrentGasPrices, 60 * 1000));
  // const stopAutoRefresh = () => clearInterval(refreshInterval);

  useEffect(() => {
    getCurrentGasPrices();
    //startAutoRefresh();
  }, []);

  const getPrice = (key: keyof Prices) => 
    <Text style={styles.text}>
      {prices && prices[key]}
      {
        delta && delta[key]
        ?
        <Text style={{color: delta[key] > 0 ? Colors.green : Colors.red}}> ({(delta[key] > 0 ? '+' : '') + delta[key]})</Text>
        :
        null
      }
    </Text>;

  return (
    <View style={styles.container}>
      <View>
        {
          prices
          ?
          <View>
            <Table borderStyle={{borderWidth: 2, borderColor: Colors.offWhite}}>
              <Row 
                data={['Speed', 'Transaction completes in', 'Price']}
                style={styles.head}
                textStyle={styles.text}
              />
              <Rows data={[
                  ['Fast',  '< 2 minutes', getPrice('high')],
                  ['Standard', '< 5 minutes', getPrice('medium')],
                  ['Low', '< 30 minutes', getPrice('low')]
                ]} 
                textStyle={styles.text}
              />
            </Table>
            <Text style={styles.time}>{`Last updated: ${(new Date).toLocaleTimeString()}`}</Text>
          </View>
          :
          <Text style={styles.noResults}>No results yet... 😶</Text>
        }
        {
          loading
          ?
          <Text style={styles.loading}>Refreshing...</Text>
          :
          <TouchableOpacity style={styles.appButtonContainer} onPress={getCurrentGasPrices}>
            <Text style={styles.appButtonText}>
              <Ionicons name="md-refresh" size={18} />  Refresh
            </Text>
          </TouchableOpacity>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appButtonContainer: {
    alignSelf: 'center',
    elevation: 8,
    backgroundColor: Colors.blue,
    borderColor: Colors.light,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '70%',
    marginTop: 20
  },
  appButtonText: {
    fontSize: 18,
    color: Colors.light,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase'
  },
  container: {
    width: '100%',
    padding: 20,
    justifyContent: 'center'
  },
  head: { 
    height: 40,
    backgroundColor: Colors.blue
  },
  loading: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.darkGreen,
    marginTop: 20
  },
  noResults: {
    color: Colors.light,
    fontSize: 20,
    alignSelf: 'center'
  },
  text: {
    margin: 6,
    color: Colors.light
  },
  time: {
    paddingTop: 10,
    textAlign: 'center',
    color: Colors.offWhite,
  }
});
