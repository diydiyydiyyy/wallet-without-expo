/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {AppScreenProps} from 'app/types';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Wallet, ethers} from 'ethers';
import {FromHex} from '../utils';
import abi from './abi.json';
// const BASE_URL = `${process.env.BASE_INFURA_URL}${process.env.INFURA_KEY}`;

interface AbiInput {
  name: string;
  type: string;
}

interface AbiOutput {
  name: string;
  type: string;
}

interface AbiFunction {
  type: 'function';
  inputs?: AbiInput[];
  outputs?: AbiOutput[];
  name?: string;
  stateMutability?: StateMutabilityType;
}

type StateMutabilityType = 'pure' | 'view' | 'nonpayable' | 'payable';

const balanceOfFunctions: AbiFunction = {
  type: 'function',
  name: 'balanceOf',
  inputs: [
    {
      name: '_owner',
      type: 'address',
    },
  ],
  outputs: [
    {
      name: 'balance',
      type: 'uint256',
    },
  ],
};

const CheckOtherToken = ({route}: AppScreenProps) => {
  const param = route.params as {
    wallet: Wallet | undefined;
    mnemonic: string;
    password: string;
  };

  console.log('param', param);

  // const [isCoin, setIsCoin] = useState(true);
  const [apiResponse, setApiResponse] = useState<{result: any} | null>(null);
  const [balanceOf, setBalanceOf] = useState<AbiFunction>(balanceOfFunctions);

  const address = '0xf49aEaC0a0dA433DEf38c0922d9D08D210D2393d';
  const contract = '0x23318730bf3F2B54eACA75b81BD3648f613F0774';

  const provider = new ethers.providers.JsonRpcProvider(
    'https://rpc.testnet.fantom.network',
  );

  const parsingData = (data: any) => {
    const convert = FromHex(data.result);
    setApiResponse({result: convert?.value});
  };

  const FetchData = {
    token: async () => {
      const balanceOfFunction = abi.find(
        item => item.name === 'balanceOf' && item.type === 'function',
      );

      if (!balanceOfFunction) {
        console.error('balanceOf function not found in ABI.');
        return;
      }

      setBalanceOf(balanceOfFunction => ({
        ...balanceOfFunction,
        stateMutability: undefined,
      }));

      const functionSignature = new ethers.Contract(
        contract,
        ['function balanceOf(address) view returns (uint256)'],
        provider,
      );

      try {
        const responseData = await functionSignature.balanceOf(address);
        console.log(responseData);

        if (responseData?.result) {
          setApiResponse({result: responseData?.error});
        } else {
          parsingData({result: responseData?._hex});
          console.log('apiResponse', apiResponse);
        }
      } catch (error) {
        console.log(error);
      }
    },
  };

  console.log('balanceOf', balanceOf);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WALLET APP</Text>

      <View style={styles.textContainer}>
        <View style={styles.textContainer}>
          <Text>Address</Text>
          <Text>{address}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text>Smart Contract:</Text>
          <Text>{contract}</Text>
        </View>
        <View style={styles.textContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: '#772174',
              },
            ]}
            onPress={FetchData.token}>
            <Text style={styles.buttonText}>Check Balance</Text>
          </TouchableOpacity>
          {apiResponse?.hasOwnProperty('result') && (
            <View>
              <Text>{JSON.stringify(apiResponse?.result, null, 2)}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default CheckOtherToken;

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
