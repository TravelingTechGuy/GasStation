import AsyncStorage from '@react-native-community/async-storage';
import {defaultSettings} from '../config/constants';

export const loadSettings = async () => {
  let settings = defaultSettings;
  try {
    let jsonValue = await AsyncStorage.getItem('@storage_Key');
    if(jsonValue != null) {
      settings = JSON.parse(jsonValue);
    }
  }
  catch(e) {
    console.error(e);
  }
  finally {
    return settings;
  }
};

export const saveSettings = async (data: object) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('@storage_Key', jsonValue);
  } 
  catch (e) {
    console.error(e);
  }
};
