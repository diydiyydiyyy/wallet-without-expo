/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppScreenProps} from '../types';
import {Wallet, ethers} from 'ethers';

const SendTransaction = ({route}: AppScreenProps) => {
  const param = route.params as {
    wallet: Wallet | undefined;
    mnemonic: string;
    password: string;
  };

  const [data, setData] = useState<any | null>(null);
  const [receiver, setReceiver] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [transactionHash, setTransactionHash] = useState('');

  console.log('data', data);
  console.log('param', param);

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

  const sendTransaction = async () => {
    try {
      // Inisialisasi penyedia (provider)
      const provider = new ethers.providers.JsonRpcProvider(
        'https://mainnet.infura.io/v3/your-infura-api-key',
      );

      // Mendapatkan kunci pribadi dari dompet pengirim
      const privateKeySender = '0xYOURPRIVATEKEY';
      const walletSender = new ethers.Wallet(privateKeySender, provider);

      // Membuat transaksi
      const transaction = {
        to: receiver,
        value: ethers.utils.parseEther(amount),
      };

      // Mengirim transaksi
      const tx = await walletSender.sendTransaction(transaction);

      setTransactionHash(tx?.hash!);
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WALLET APP</Text>

      <View style={[styles.widthFull, {gap: 8}]}>
        <View style={styles.textContainer}>
          <Text style={styles.textCenter}>Address Receiver:</Text>
          <View style={styles.widthFull}>
            <TextInput
              value={receiver}
              onChangeText={(e: string) => setReceiver(e)}
              placeholder="Input Address Receiver"
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textCenter}>Amount:</Text>
          <View style={styles.widthFull}>
            <TextInput
              value={amount}
              onChangeText={(e: string) => setAmount(e)}
              placeholder="Input Amount"
              style={styles.input}
            />
          </View>
        </View>
      </View>

      {transactionHash && (
        <View style={styles.textContainer}>
          <Text style={styles.textCenter}>
            Transaction Hash: {transactionHash}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: !amount || !receiver ? '#77217466' : '#772174'},
        ]}
        disabled={!amount || !receiver}
        onPress={sendTransaction}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SendTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    gap: 16,
    width: '100%',
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
    width: '100%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'none',
  },
  widthFull: {
    width: '100%',
  },
});
