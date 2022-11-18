import React, { useEffect, useId, useState } from 'react';
import {Button, TextInput, Text, View, StyleSheet} from 'react-native';
import UserDetailsSchema from '../schema/UserDetailsSchema';
import Realm from 'realm';
import {useIsFocused} from '@react-navigation/native';

import { getUserDetailsByEmail, postUserLogin } from '../api/Login';

export default function Login({navigation}) {
  
  const [email ,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  // maintining session if user details already in database;
  useEffect(() => {
      const renderUser = async() => {

      const realm = await Realm.open({
        path: "myrealm",
        schema: [UserDetailsSchema],
      });

      userList = realm.objects("userDetailsNew");
      
      console.log("found userList :" , userList);
        if(userList.length > 0){
          checkAuthorizedUserAndNavigate(userList[0].email, userList[0].password, false);
        }else{
          console.log("New User");
        }
      }
        
      renderUser();
      
    }, [useIsFocused()]);

  const storeUserDetails = async() => {
      const realm = await Realm.open({
        path: "myrealm",
        schema: [UserDetailsSchema],
      });

      const incrementID =()=> {
        userList = realm.objects("userDetailsNew");
        if(userList.length>0)
          return (userList.max("_id") ) + 1;
        else
          return 1;
      }

      obj = {
        _id:incrementID(),
        email : email,
        password : password,
      }

      realm.write(() => {
        let userDetails = realm.create("userDetailsNew", obj);
        console.log(`created user: ${userDetails}`);
        });

        
    };
    

  const checkAuthorizedUserAndNavigate = async(email, password, isNewUser) => {
    console.log("checking if authorized user");
    const userData = {
      username:email,
      password:password,
    };

    let response = await postUserLogin(userData);

    console.log("*************************",response);

    if(response.status == 200){
      console.log("Logged In");
      if(isNewUser)storeUserDetails();
      const response = await getUserDetailsByEmail(email);
      // console.log("User Details after Login: ", response.data);
      navigation.navigate("Home", {userDetails: response.data});
    }else{
      console.log("Invalid Credentials");
      setLoginMessage("Invalid Credentials");
    }
  };

  return (
    <View style={styles.login}>
      <View style={styles.body}>
        <Text style={styles.text}>Your Email</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="email-address"
          placeholder="eg: abc@gmail.com"
          placeholderTextColor="#AFB0B0"
          onChangeText={setEmail}
        />
        {/* <Text style={styles.text}>Phone number</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="number-pad"
          placeholder="eg:91090XXXXX"
          placeholderTextColor="#AFB0B0"
        /> */}
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="visible-password"
          placeholderTextColor="#AFB0B0"
          placeholder="password"
          onChangeText={setPassword}
        />
      </View>
      {loginMessage.length>0?<Text style = {styles.redAlert}>{loginMessage}</Text>:<></>}
      <View style={styles.button}>
        <Button title="Login" color="#f14c63" onPress = {() => checkAuthorizedUserAndNavigate(email, password, true)}/>
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
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  redAlert :{
    color: "red",
    marginBottom: 20,
    alignSelf:'center',
  },
});
