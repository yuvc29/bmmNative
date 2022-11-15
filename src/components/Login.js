import React from 'react';
import {Button, TextInput, Text, View, StyleSheet} from 'react-native';

export default function Login() {
  return (
    <View style={styles.login}>
      <View style={styles.body}>
        <Text style={styles.text}>Your Email</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="email-address"
          placeholder="eg: abc@gmail.com"
          placeholderTextColor="#AFB0B0"
        />
        <Text style={styles.text}>Phone number</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="number-pad"
          placeholder="eg:91090XXXXX"
          placeholderTextColor="#AFB0B0"
        />
      </View>
      <View style={styles.button}>
        <Button title="Update Details" color="#f14c63" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    color: 'black',
    fontSize: 13,
  },
  body: {
    flex: 9,
    margin: 15,
  },
  textInput: {
    height: 40,
    marginTop: 8,
    marginBottom: 50,
    borderWidth: 1,
    borderColor: '#ADADAD',
    borderRadius: 5,
  },
  button: {
    flex: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
