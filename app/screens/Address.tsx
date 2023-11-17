/* eslint-disable react-native/no-inline-styles */
import {AppScreenProps} from 'app/types';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import {Wallet, ethers} from 'ethers';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {BigNumber} from 'ethers/utils';
// import jwt from 'jsonwebtoken';
// import CryptoJS from 'crypto-js';
// import crypto from 'react-native-crypto';

// const BASE_URL = `${process.env.BASE_INFURA_URL}${process.env.INFURA_KEY}`;
// import Web3 from 'web3';

const Address = ({route, navigation}: AppScreenProps) => {
  const param = route.params as {
    wallet: Wallet | undefined;
    mnemonic: string;
    password: string;
  };

  const [balance, setBalance] = useState<BigNumber | number | string>();
  const [isLoading, setIsLoading] = useState(false);

  // console.log('BASE_URL', BASE_URL);

  // const generateSecureRandomText = async (length: number) => {
  //   try {
  //     const randomBytes = crypto.randomBytes(length);
  //     return randomBytes;
  //   } catch (error) {
  //     console.error('Error generating secure random text:', error);
  //     throw error; // Melemparkan kembali error agar bisa ditangkap di tempat pemanggilan
  //   }
  // };

  const fetchBalance = useCallback(async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://mainnet.infura.io/v3/2d730408bd194dbcaf2084b4d0006eb2',
    );

    try {
      if (param?.wallet?.address) {
        const newBalance = await provider.getBalance(param.wallet.address);
        const hexValue = ethers.utils.hexlify(
          ethers.utils.parseUnits(newBalance.toString(), 'ether'),
        );
        const exact = ethers.utils.formatUnits(hexValue, 'ether');

        setBalance(exact);
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

  console.log('balance', balance);

  const saveData = async () => {
    try {
      // const password = CryptoJS.AES.encrypt(
      //   param?.password,
      //   await generateSecureRandomText(16),
      // ).toString();

      // const address = CryptoJS.AES.encrypt(
      //   param?.wallet?.address!,
      //   await generateSecureRandomText(16),
      // ).toString();

      // const privateKey = CryptoJS.AES.encrypt(
      //   param?.wallet?.privateKey!,
      //   await generateSecureRandomText(16),
      // ).toString();

      // const mnemonic = CryptoJS.AES.encrypt(
      //   param?.mnemonic,
      //   await generateSecureRandomText(16),
      // ).toString();

      // const data = {
      //   address,
      //   balance,
      //   mnemonic,
      //   privateKey,
      //   password,
      // };

      // await AsyncStorage.setItem('data', JSON.stringify(data));
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
        style={[
          styles.button,
          {
            backgroundColor:
              isLoading || balance === undefined ? '#772174BF' : '#772174',
          },
        ]}
        onPress={() => saveData()}
        disabled={isLoading || balance === undefined}>
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
