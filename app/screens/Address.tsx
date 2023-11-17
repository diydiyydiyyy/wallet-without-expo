import {AppScreenProps} from 'app/types';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import {Wallet, ethers} from 'ethers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BigNumber} from 'ethers/utils';
// const BASE_URL = `${process.env.BASE_INFURA_URL}${process.env.INFURA_KEY}`;

const Address = ({route, navigation}: AppScreenProps) => {
  const param = route.params as {
    wallet: Wallet | null;
    mnemonic: string;
    password: string;
  };

  const [balance, setBalance] = useState<BigNumber>();
  const [isLoading, setIsLoading] = useState(false);

  // console.log('BASE_URL', BASE_URL);

  const fetchBalance = useCallback(async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://mainnet.infura.io/v3/2d730408bd194dbcaf2084b4d0006eb2',
    );

    try {
      if (param?.wallet?.address) {
        const newBalance = await provider.getBalance(param.wallet.address);
        setBalance(newBalance);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setIsLoading(false);
    }
  }, [param?.wallet?.address]);

  useEffect(() => {
    setIsLoading(true);
    fetchBalance();
  }, [fetchBalance]);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('wallet', JSON.stringify(param));
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert(
        'Error',
        'Terjadi kesalahan dalam aplikasi.',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WALLET APP</Text>

      <View style={styles.textContainer}>
        <Text>Address:</Text>
        <Text>{param?.wallet?.address}</Text>
      </View>
      {balance && (
        <View style={styles.textContainer}>
          <Text>Balance:</Text>
          <Text>{balance?.toString()}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => saveData()}
        disabled={isLoading}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },

  title: {
    fontSize: 32,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#772174',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 24,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'none',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
