/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {generateMnemonic} from '../utils';
import {AppScreenProps} from 'app/types';

const Password = ({navigation}: AppScreenProps) => {
  const [password, setPassword] = useState('');

  const generateAndSetMnemonic = async () => {
    const token = await generateMnemonic();
    navigation.navigate('Mnemonic', {mnemonic: token, password});
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
          {backgroundColor: password?.length < 8 ? '#77217466' : '#772174'},
        ]}
        disabled={password?.length < 8}
        onPress={generateAndSetMnemonic}>
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
    width: '100%',
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
