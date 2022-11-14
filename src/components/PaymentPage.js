import React, { useState } from 'react'
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input-plus";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PaymentPage({navigation}) {
    const [focused, setFocused] = useState('name');
    const [number, setNumber] = useState('');
    const [name, setName]= useState('')
    const [cvv,setCvv]= useState('')
    const [expiry,setExpiry]= useState('')
    const [index,setIndex]= useState(0)
    const [type,setType] = useState('visa')

    const onChange =(form) => {
        console.log(form);
    }
  return (
   <View style= {{padding:10, display:"flex", flexDirection:"column", flex:1}}>
    <View style = {styles.mainContainer}>
        
         <ScrollView>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style = {styles.movieDescription}>
                <Text style = {{fontSize: 16,fontWeight: "bold"}}>Black Panther : Wakanda Forever</Text>
                <Text style ={{fontSize:12 , fontWeight:"light"}}>English</Text>
                <Text style = {{fontSize:12,fontWeight: "bold"}}>Black Panther : Wakanda Forever</Text>
                <Text style ={{fontSize:12 , fontWeight:"light"}}>English</Text>
            </View>
            
            <View style = {styles.paymentDesc}>
                   <View style ={{flexDirection:"row" , marginBottom:10}}> 
                        <Text style = {{alignSelf:'flex-start'}}> Ticket Count </Text>
                        <Text style = {{marginLeft:200}}> 4 </Text> 
                    </View>
                    <View style ={{flexDirection:"row" , marginBottom:10}}> 
                        <Text style = {{alignSelf:'flex-start'}}> Ticket Count </Text>
                        <Text style = {{marginLeft:200}}> 4 </Text> 
                    </View>
                    <View style ={{flexDirection:"row" , marginBottom:10}}> 
                        <Text style = {{alignSelf:'flex-start'}}> Ticket Count </Text>
                        <Text style = {{marginLeft:200}}> 4 </Text> 
                    </View>
                    <View style ={{flexDirection:"row" , marginBottom:10}}> 
                        <Text style = {{alignSelf:'flex-start'}}> Ticket Count </Text>
                        <Text style = {{marginLeft:200}}> 4 </Text> 
                    </View>
                    
            </View>

            <View style = {styles.contactDetails}>
                    <View style ={{flexDirection:"row" , marginBottom:10}}> 
                        <Text style = {{alignSelf:'flex-start'}}> Ticket Count </Text>
                        <Text style = {{marginLeft:200}}> 4 </Text> 
                    </View>
            </View>
            <View style = {styles.cardDetails}>
                <Text style = {{ fontSize: 16,fontWeight: "bold", color:"black", alignSelf:"center"}}>Enter Card Details</Text>
                <TextInput placeholder="Name" returnKeyType = {"next"} onChangeText={setName}></TextInput>
                <TextInput placeholder='Card Number'  onChangeText={setNumber}></TextInput>
                <TextInput placeholder="CVV" maxLength = {3}  onChangeText={setCvv}></TextInput>
                <TextInput placeholder="CVV" maxLength = {7}  onChangeText={setExpiry}></TextInput>
            </View>
            </KeyboardAvoidingView>
            </ScrollView>
        
    </View>

        <TouchableOpacity style = {styles.handlePayment} onPress= {() => navigation.navigate("Ticket")}>
            <Text style = {{alignSelf:"center", fontSize:20, fontWeight:"bold"}}> Pay</Text>
        </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer : {
        display:"flex",
        flex:1,
        flexDirection:"column",
        padding:20,
        elevation:5,
    },
    movieDescription:{
        borderTopWidth:1,
        flex:1,
        padding:10,
    },
    paymentDesc:{
        padding:10,
        borderTopWidth:1,
        flex:2,
    },
    contactDetails:{
        borderTopWidth:1,
        flex:1,
        padding:10,
    },
    cardDetails:{
        borderTopWidth:1,
        flex:4,
        padding:10,
    },
    handlePayment :{
        width:"100%",
        height:50,
        alignSelf:'flex-end',
        backgroundColor:"#f84464",
        justifyContent:"center",
    },

})
