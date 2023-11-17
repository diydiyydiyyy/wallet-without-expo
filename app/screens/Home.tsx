import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Home = () => {
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await AsyncStorage.getItem('data');

        if (data !== null) {
          console.log('data:', JSON.parse(data));
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
