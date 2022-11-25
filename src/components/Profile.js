import React, {useEffect, useState} from 'react';
import Realm from 'realm';
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
import UserDetailsSchema from '../schema/UserDetailsSchema';
import { UpdateUser } from '../api/UpdateUser';

export default function Profile({route, navigation}) {
  const [firstName, setFirstName] = useState(route.params.userDetails.firstName);
  const [lastName, setLastName] = useState(route.params.userDetails.lastName);
  const [dob, setDob] = useState(route.params.userDetails.dob);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState(route.params.userDetails.email);
  const [gender, setGender] = useState(route.params.userDetails.gender);
  const [genderCheck, setGenderCheck] = useState(route.params.userDetails.gender=="female"?true:false);
  const [change, setChange] = useState(false);

  useEffect ( () => { 
      setChange(!change);
  }, [firstName,lastName, dob, email, gender]);

  // useEffect(()=>{
  //   setChange(!change);
  // },[fields])

  // const [fields, setFields] = useState({
  //   firstName: '',
  //       lastName: '',
  //       dob: '',
  //       password: '',
  //       email: '',
  //       gender: '',
  // })

  const handleSave = () => {
    const fetchData = async () => {
      const obj = {
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        email: email,
        gender: gender,
      };
      const response = await UpdateUser(route.params.userDetails.userId, obj);
      console.log("user update Status", response.status);
    };
    fetchData();
  };

  const handleSignOut = async() => {
    const realm1 = await Realm.open({
      path: "myrealm",
      schema: [UserDetailsSchema],
    });

    realm1.write(() => {
      realm1.deleteAll();
      });

    navigation.navigate("Login");
   }

  const handleSwitch = () => {
    setGenderCheck(!genderCheck);
    setGender(genderCheck ? 'female' : 'male');
  };

  // const handleChange = () => {
  //   setChange(true);
  // };

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
            onChangeText={text => {
              setMobile(text)
            }}
            >{mobile}</TextInput>
          <Text style={styles.heading}>Email Address</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="email-address"
            placeholder="eg: abc@gmail.com"
            placeholderTextColor="#AFB0B0"
            onChangeText={text => {
              setEmail(text)
            }}>{email}</TextInput>
          
        </View>
        <View style={styles.bottom}>
          <Text style={styles.heading}>Personal Details</Text>
          <View>
            <Text style={styles.fields}>First Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter first name here"
              placeholderTextColor="#AFB0B0"
              onChangeText={text => {
                setFirstName(text)
              }}
            >{firstName}</TextInput>
            <Text style={styles.fields}>Last Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter last name here"
              placeholderTextColor="#AFB0B0"
              onChangeText={text => {
                setLastName(text)
              }}
              >{lastName}</TextInput>
            <Text style={styles.fields}>Birthday</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="phone-pad"
              placeholder="DD/MM/YY"
              placeholderTextColor="#AFB0B0"
              onChangeText={text => {
                setDob(text)
              }}
              >{dob}</TextInput>
            <Text style={styles.fields}>Identity</Text>
          </View>
          <View style={styles.gender}>
            <Text>Male</Text>
            <Switch
              trackColor={{false: '#43C9FF', true: '#F243FF'}}
              thumbColor="#A2A2A2"
              onChange={handleSwitch}
              value={genderCheck}
            />
            <Text>Female</Text>
          </View>
        </View>
        <View style={styles.signout}>
          <Button onPress={handleSignOut} title="sign out" color="#f14c63" />
        </View>
      </ScrollView>
      <View>
        <Button
          title="Save Changes"
          color="#f14c63"
          disabled={change}
          onPress={() => handleSave()}
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