/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {AppScreenProps} from 'app/types';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {ethers, Wallet} from 'ethers';
import {setSecureValue, encryptData} from '../utils';

// const BASE_URL = `${process.env.BASE_INFURA_URL}${process.env.INFURA_KEY}`;

const Mnemonic = ({route, navigation}: AppScreenProps) => {
  const param = route.params as {mnemonic: string; password: string};
  const mnemonic = param?.mnemonic?.split(' ');

  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isWalletCreated, setWalletCreated] = useState(false);

  // console.log('BASE_URL', BASE_URL);

  const provider = new ethers.providers.JsonRpcProvider(
    'https://mainnet.infura.io/v3/2d730408bd194dbcaf2084b4d0006eb2',
  );

  const createWallet = useCallback(async () => {
    try {
      const newWallet = ethers.Wallet.fromMnemonic(param?.mnemonic!);
      newWallet.connect(provider);
      setWallet(newWallet);
      setWalletCreated(true);
    } catch (error) {
      console.error('Error creating wallet:', error);
    }
  }, [param?.mnemonic, provider]);

  useEffect(() => {
    if (isWalletCreated && param?.password && wallet) {
      const encryptAndStore = async () => {
        try {
          const encryptedPrivateKey = await encryptData(
            wallet?.privateKey,
            param?.password,
          );

          await setSecureValue('privateKey', encryptedPrivateKey);
          navigation.navigate('Address', {
            wallet,
            mnemonic: param?.mnemonic,
            password: param?.password,
          });
        } catch (error) {
          console.log(error);
        }
      };

      encryptAndStore();
    }
  }, [isWalletCreated, param?.password, wallet, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WALLET APP</Text>
      <Text style={{textAlign: 'center'}}>
        Before generate address, save the following phrase to the secure
        location
      </Text>
      <View style={styles.mnemonic}>
        {mnemonic.map((item, key) => (
          <View key={key} style={styles.mnemonicItem}>
            <Text>{item}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => createWallet()}
        disabled={isWalletCreated}>
        <Text style={styles.buttonText}>Generate Address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Mnemonic;

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
  mnemonic: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  mnemonicItem: {
    marginBottom: 8,
    width: 100,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 8,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
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
});
