import {AppScreenProps} from 'app/types';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const Mnemonic = ({route}: AppScreenProps) => {
  const param = route.params as {mnemonic: string};
  const mnemonic = param?.mnemonic?.split(' ');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WALLET APP</Text>
      <Text>Save the following phrase to the secure location</Text>
      <View style={styles.mnemonic}>
        {mnemonic.map((item, key) => (
          <View key={key} style={styles.mnemonicItem}>
            <Text>{item}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Done</Text>
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
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'none',
  },
});
