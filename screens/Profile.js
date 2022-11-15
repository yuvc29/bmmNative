import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  Button,
  Image,
} from 'react-native';
import {user} from '../assets';

export default function Profile() {
  const [gender, setGender] = useState(false);
  const [change, setChange] = useState(false);
  const handleSwitch = () => {
    setGender(!gender);
  };

  const handleChange = () => {
    setChange(true);
  };

  return (
    <View style={styles.profile}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.user}>
          <Image source={user} style={styles.icon} />
        </View>
        <View style={styles.top}>
          <Text style={styles.heading}>Mobile Number</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="number-pad"
            placeholder="91090XXXXX"
            placeholderTextColor="#AFB0B0"
            onChange={handleChange}
          />
          <Text style={styles.heading}>Email Address</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="email-address"
            placeholder="eg: abc@gmail.com"
            placeholderTextColor="#AFB0B0"
            onChange={handleChange}
          />
        </View>
        <View style={styles.bottom}>
          <Text style={styles.heading}>Personal Details</Text>
          <View>
            <Text style={styles.fields}>First Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter first name here"
              placeholderTextColor="#AFB0B0"
              onChange={handleChange}
            />
            <Text style={styles.fields}>Last Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter last name here"
              placeholderTextColor="#AFB0B0"
              onChange={handleChange}
            />
            <Text style={styles.fields}>Birthday</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="phone-pad"
              placeholder="DD/MM/YY"
              placeholderTextColor="#AFB0B0"
              onChange={handleChange}
            />
            <Text style={styles.fields}>Identity</Text>
          </View>
          <View style={styles.gender}>
            <Text>Male</Text>
            <Switch
              trackColor={{false: '#43C9FF', true: '#F243FF'}}
              thumbColor="#A2A2A2"
              onChange={handleSwitch}
              value={gender}
            />
            <Text>Female</Text>
          </View>
        </View>
        <View style={styles.signout}>
          <Button
            title="sign out"
            color="#f14c63"
            
          />
        </View>
      </ScrollView>
      <View>
        <Button
          title="Save Changes"
          color="#f14c63"
          disabled={change ? false : true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  user: {
    backgroundColor: '#333545',
  },
  icon: {
    marginLeft: 150,
    height: 80,
    width: 80,
  },

  profile: {
    flex: 1,
    flexDirection: 'column',
  },
  top: {
    // flex:2,
    margin: 10,
    marginTop: 8,
    backgroundColor: '#FFFEF9',
  },

  topheading: {fontSize: 26, fontWeight: '900', color: 'black'},
  heading: {
    fontSize: 19,
    fontWeight: '600',
    color: 'black',
  },

  gender: {
    marginTop: 10,
    flexDirection: 'row',
    // justifyContent:'space-around'
  },

  bottom: {
    // flex:3,
    margin: 10,
    marginTop: 20,
    backgroundColor: '#FFFEF9',
  },

  fields: {
    marginTop: 10,
    color: 'black',
  },

  signout: {
    margin: 10,
    marginVertical: 30,
  },
  textInput: {
    height: 40,
    marginTop: 8,
    marginBottom: 35,
    borderWidth: 1,
    borderColor: '#ADADAD',
    borderRadius: 5,
  },
});
