import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Wallet} from 'ethers';
import {BigNumber} from 'ethers/utils';

export type AppScreenProps = NativeStackScreenProps<AppStackParamList>;

export type AppStackParamList = {
  Address: {
    wallet: Wallet | null;
    mnemonic: string;
    password: string;
    balance?: BigNumber;
  };
  Home: undefined;
  Mnemonic: {mnemonic: string; password: string};
  Password: undefined;
};
