import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {decryptData} from '../utils';
import {AppScreenProps} from '../types';

const Home = ({route}: AppScreenProps) => {
  const param = route.params as {
    secretKey: string;
  };

  const [data, setData] = useState<any | null>(null);
  const [mnemonic, setMnemonic] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  // const [privateKey, setPrivateKey] = useState<string>('');

  useEffect(() => {
    const getData = async () => {
      try {
        const store = await AsyncStorage.getItem('data');
        if (store !== null) {
          setData(JSON.parse(store!));
        } else {
          console.log('Data tidak ditemukan.');
        }
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (param?.secretKey && data) {
      setAddress(decryptData(data?.address, param?.secretKey));
      setMnemonic(decryptData(data?.mnemonic, param?.secretKey));
      // setPrivateKey(decryptData(data?.privateKey, param?.secretKey));
    }
  }, [param?.secretKey, data]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WALLET APP</Text>

      <View style={styles.textContainer}>
        <Text style={styles.textCenter}>Address:</Text>
        <Text style={styles.textCenter}>{address}</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.textCenter}>Mnemonic:</Text>
        <Text style={styles.textCenter}>{mnemonic}</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.textCenter}>Private Key:</Text>
        <Text style={styles.textCenter}>************************</Text>
      </View>

      <Text>Data Tersimpan!</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
});
