import React, {useState, useEffect} from 'react';
 import {
   StatusBar,
   StyleSheet,
   TextInput,
   Text,
   View,
   TouchableOpacity,
   TouchableWithoutFeedback,
   Switch,
 } from 'react-native';
 
import { Keyboard } from 'react-native';
import { UserSignup } from '../api/UserSignup';

 const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

 function validateEmail(email){
    return (regEmail.test(email)?"":"Invalid Email");
 };

 function validatePassword(password){
    if(password.length == 0){
        return("Password is required");
    }        
    else if(password.length < 6){
        return("Password should be minimum 6 characters");
    }      
    else if(password.indexOf(' ') >= 0){        
      return("Password cannot contain spaces");                          
    }    
    else{
      return("");
    }        
 };

 const SignUp = ({navigation},props) => {
    
    const [email ,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [role , setRole] = useState("user");
    

    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    useEffect(() => {
      setEmailError(validateEmail(email));
    }, [email]);

    useEffect(() => {
      setPasswordError(validatePassword(password));
    }, [password]);

    const handleSignUp = async() => {
        userObj = {
            email:email,
            password:password,
            firstName:firstName,
            lastName:lastName,
            dob:dob,
            role:role,
            gender:gender,
        }

        const response = await UserSignup(userObj);
        console.log("SignUp", response);

        if(response.status==200){
            console.log("Sign Up Successfull");
            navigation.navigate("Login");
        }else{
            console.log("Error Signing you up!");
        }

    };

   return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={[styles.LoginContainer, {
      flexDirection: "column"
      }]}>

    <StatusBar style = "auto"/>
    <View style = {{ flex: 1, backgroundColor: "grey" , alignItems :'center' ,justifyContent : 'center'}} >
      <Text style = {styles.sectionTitle}>SIGN UP PAGE</Text>
      </View>

      <View style = {{ 
          flex: 8, 
          backgroundColor: "white" , 
          alignItems :'center', 
          borderTopLeftRadius : 25, 
          borderTopRightRadius : 25,
          justifyContent : 'space-evenly'
          }} >
 
           <TextInput
               style={styles.TextInput}
               placeholder="Email."
               placeholderTextColor="#003f5c"
               onChangeText={setEmail}
               keyboardType='email-address'
                />

            {emailError.length>0?<Text style = {styles.redAlert}>{emailError}</Text>:<></>}           

           <TextInput
               style={styles.TextInput}
               placeholder="Password."
               placeholderTextColor="#003f5c"
               secureTextEntry={true}
               onChangeText={setPassword} />
           
           
           {passwordError.length>0?<Text style = {styles.redAlert}>{passwordError}</Text>:<></>}

           <TextInput
                 style={styles.TextInput}
                 placeholder="First Name."
                 placeholderTextColor="#003f5c"
                 onChangeText={setFirstName} />

            <TextInput
                 style={styles.TextInput}
                 placeholder="Last Name"
                 placeholderTextColor="#003f5c"
                 onChangeText={setLastName} />

            <TextInput
                 style={styles.TextInput}
                 placeholder="Gender"
                 placeholderTextColor="#003f5c"
                 onChangeText={setGender} />

            <TextInput
                 style={styles.TextInput}
                 placeholder="DOB."
                 placeholderTextColor="#003f5c"
                 onChangeText={setDob} />

            <View style = {{flexDirection:"row",marginTop:20}}>
                <Text>Admin</Text>
                <Switch onValueChange={() => setRole((role=="admin"?"user":"admin"))} value={(role=="admin"?false:true)}/>
                <Text>User</Text>
            </View>

           <View style = {{justifyContent:'center', paddingTop:5, flexDirection:'row'}}>
              <Text>Already Registered? </Text>
              
              <TouchableOpacity onPress = {() => navigation.navigate("Login")}>
                <Text  style = {{ fontWeight:'bold', color:'purple'}}>Login</Text>
              </TouchableOpacity>
            
              
            </View>
           

           <TouchableOpacity style={styles.loginButton} onPress = {()=> handleSignUp()}>
             <Text style = {{color:'white'}}>SIGN UP</Text>
           </TouchableOpacity>

           
           </View>
      </View> 
      </TouchableWithoutFeedback>
   );
 };

const styles = StyleSheet.create({
    redAlert :{
      color: "red",
      marginBottom: 20,
    },
     LoginContainer: {
       flex: 1,
       backgroundColor: "grey",
     },
     TextInput: {
      borderBottomWidth : 1,
       minWidth : 240,
       width: "80%",
       height: 45,
       marginBottom: 20,
       alignItems: "center",
       marginTop:20,
       padding :10,
     },
     sectionTitle: {
       fontSize: 24,
       fontWeight: '600',
       justifyContent:'center',
       color:'white',
       marginBottom:50
     },
     signUpRedirect: {
       height: 30,
       marginBottom: 30,
     },
     loginButton: {
       width: "80%",
       borderRadius: 25,
       minWidth : 250,
       height: 50,
       alignItems: "center",
       justifyContent: "center",
       marginTop: 30,
       backgroundColor: "purple",
     },
   });
 
 export default SignUp;
 