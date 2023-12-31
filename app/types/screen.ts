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
  Home: {secretKey: string};
  Mnemonic: {mnemonic: string; password: string};
  Password: undefined;
  CheckOtherToken: {
    wallet?: Wallet | null;
    mnemonic?: string;
    password?: string;
    balance?: BigNumber;
  };
  SendTransaction: {
    wallet?: Wallet | null;
    mnemonic?: string;
    password?: string;
    balance?: BigNumber;
  };
};
