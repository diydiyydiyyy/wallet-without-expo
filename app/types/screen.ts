import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type AppScreenProps = NativeStackScreenProps<AppStackParamList>;

export type AppStackParamList = {
  Address: undefined;
  Home: undefined;
  Mnemonic: {mnemonic: string};
  Password: undefined;
};
