/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {AppScreenProps} from 'app/types';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import {Wallet, ethers} from 'ethers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BigNumber} from 'ethers/utils';
import {encryptData} from '../utils';
// const BASE_URL = `${process.env.BASE_INFURA_URL}${process.env.INFURA_KEY}`;

const Address = ({route, navigation}: AppScreenProps) => {
  const param = route.params as {
    wallet: Wallet | undefined;
    mnemonic: string;
    password: string;
  };

  const [balance, setBalance] = useState<BigNumber | number | string>();
  const [isLoading, setIsLoading] = useState(false);

  const provider = new ethers.providers.JsonRpcProvider(
    'https://rpc.testnet.fantom.network',
  );

  const fetchBalance = useCallback(async () => {
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

  const saveData = async () => {
    try {
      const secretKey = param?.password;

      if (!secretKey) {
        throw new Error('Password is missing');
      }

      const address = await encryptData(param?.wallet?.address!, secretKey);
      const privateKey = await encryptData(
        param?.wallet?.privateKey!,
        secretKey,
      );
      const mnemonic = await encryptData(param?.mnemonic, secretKey);

      if (!address || !privateKey || !mnemonic) {
        throw new Error('Encryption failed');
      }

      const data = {
        address,
        privateKey,
        mnemonic,
      };

      await AsyncStorage.setItem('data', JSON.stringify(data));
      navigation.navigate('Home', {secretKey});
    } catch (error) {
      console.error('Error during saveData:', error);
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
      {isLoading ? (
        <View style={styles.textContainer}>
          <Text>Loading balance..</Text>
        </View>
      ) : (
        balance && (
          <View style={styles.textContainer}>
            <Text>Balance My Address:</Text>
            <Text>{balance?.toString()}</Text>
          </View>
        )
      )}

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: '#772174',
          },
        ]}
        onPress={() =>
          navigation.navigate('CheckOtherToken', {
            wallet: param?.wallet,
            mnemonic: param?.mnemonic,
            password: param?.password,
          })
        }>
        <Text style={styles.buttonText}>
          Check Other Token (Smart Contract)
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: '#772174',
          },
        ]}
        onPress={() =>
          navigation.navigate('SendTransaction', {
            wallet: param?.wallet,
            mnemonic: param?.mnemonic,
            password: param?.password,
          })
        }>
        <Text style={styles.buttonText}>Send Transaction</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor:
              isLoading || balance === undefined ? '#77217466' : '#772174',
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
