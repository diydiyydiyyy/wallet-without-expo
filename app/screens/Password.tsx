/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {ethers, Wallet} from 'ethers';
import CryptoJS from 'react-native-crypto-js';

import {generateMnemonic, setSecureValue} from '../utils';
import {AppScreenProps} from 'app/types';

const Password = ({navigation}: AppScreenProps) => {
  const provider = new ethers.providers.JsonRpcProvider(
    'https://mainnet.infura.io/v3/2d730408bd194dbcaf2084b4d0006eb2',
  );

  const [password, setPassword] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [wallet, setWallet] = useState<Wallet | null>(null);

  const generateAndSetMnemonic = async () => {
    const token = await generateMnemonic();
    setMnemonic(token);
  };

  const createWallet = async () => {
    await generateAndSetMnemonic();
    const newWallet = ethers.Wallet.fromMnemonic(mnemonic!);
    newWallet.connect(provider);
    setWallet(newWallet);
    await encryptAndStorePrivateKey();
    navigation.navigate('Mnemonic', {mnemonic});
  };

  const encryptAndStorePrivateKey = async () => {
    if (password && wallet) {
      const encryptedPrivateKey = CryptoJS.AES.encrypt(
        wallet.privateKey,
        password,
      ).toString();
      await setSecureValue('privateKey', encryptedPrivateKey);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WALLET APP</Text>
      <Text>Input Password :</Text>
      <TextInput
        value={password}
        onChangeText={(e: string) => setPassword(e)}
        placeholder="Input Password"
        style={styles.input}
      />
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: password?.length < 8 ? '#772174BF' : '#772174'},
        ]}
        disabled={password?.length < 8}
        onPress={() => createWallet()}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Password;

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
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'none',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
  },
});
