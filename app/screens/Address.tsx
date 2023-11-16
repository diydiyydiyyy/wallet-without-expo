import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Address = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WALLET APP</Text>
      <Text>Address : {'{}'}</Text>
      <Text>Balance : {'{}'}</Text>
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
});
