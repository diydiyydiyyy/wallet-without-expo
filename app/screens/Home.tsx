import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Home = () => {
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('wallet');
        if (value !== null) {
          console.log('Data yang ditemukan:', JSON.parse(value));
        } else {
          console.log('Data tidak ditemukan.');
        }
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      }
    };

    getData();
  });

  return (
    <View style={styles.container}>
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
  },
});
