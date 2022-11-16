import React, { useState } from 'react'
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input-plus";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { PostCreditCard } from '../api/PostCreditCard';
import { PostTransaction } from '../api/Transaction';
import { PostBookedSeats } from '../api/Seating'

export default function PaymentPage({route,navigation}) {
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

    handlePayment = async() => {
        cardObj = {
            cardNo: number,
            name : name,
            cvv:cvv,
            expDate : expiry,
            userId : route.params.userDetails.userId,                    // user-Id hard coded
        }
        const crrResponse = await PostCreditCard(cardObj);
        console.log("Credit Card Post Status", crrResponse.status);

        transactionObj = {
            orderId:route.params.orderObj.orderId,
            status:"true",
        }
        const tranResponse = await PostTransaction(transactionObj);
        console.log(" Transaction Post Status", tranResponse.status);

        route.params.seatList.map(async(seatNo) => {
            seatObj = {
                showId : route.params.showItem.showId,
                seatNo : seatNo,
                price:100,
                orderId :route.params.orderObj.orderId,
            }
            const seatBookingResponse = await PostBookedSeats(seatObj);
            console.log(" Seat Post Status for",seatNo,":", seatBookingResponse.status)
        })

        navigation.navigate("Ticket", {movieItem : route.params.movieItem , seatList: route.params.seatList, theaterItem:route.params.theaterItem, date : route.params.date,
            userDetails:route.params.userDetails} 
        );
    }

  return (
   <View style= {{padding:10, display:"flex", flexDirection:"column", flex:1}}>
    <View style = {styles.mainContainer}>
        
         <ScrollView>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style = {styles.movieDescription}>
                <Text style = {{fontSize: 16,fontWeight: "bold"}}>{route.params.movieItem.title}</Text>
                <Text style ={{fontSize:12 , fontWeight:"light"}}>{route.params.movieItem.language}</Text>
                <Text style = {{fontSize:12,fontWeight: "bold"}}>{route.params.theaterItem.theatreName} | {route.params.theaterItem.address} </Text>
                <Text style ={{fontSize:12 , fontWeight:"light"}}>{route.params.date} | {route.params.showItem.timing}</Text>
            </View>
            
            <View style = {styles.paymentDesc}>
                   <View style ={{flexDirection:"row" , marginBottom:10}}> 
                        <Text style = {{alignSelf:'flex-start'}}> Ticket Price </Text>
                        <Text style = {{marginLeft:200}}> {route.params.orderObj.amount} </Text> 
                    </View>
                    <View style ={{flexDirection:"row" , marginBottom:10}}> 
                        <Text style = {{alignSelf:'flex-start'}}> Discount  </Text>
                        <Text style = {{marginLeft:200}}> {0} </Text> 
                    </View>
                    <View style ={{flexDirection:"row" , marginBottom:10}}> 
                        <Text style = {{alignSelf:'flex-start'}}> Seats</Text>
                        <Text style = {{marginLeft:200}}> {route.params.ticket.seats[0][0] + route.params.ticket.seats[0][1]}</Text> 
                    </View>
                    
            </View>

            <View style = {styles.contactDetails}>
                    <View style ={{flexDirection:"row" , marginBottom:10}}> 
                        <Text style = {{alignSelf:'flex-start'}}> Ticket Count </Text>
                        <Text style = {{marginLeft:200}}> {route.params.ticket.seatCount} </Text> 
                    </View>
            </View>
            <View style = {styles.cardDetails}>
                <Text style = {{ fontSize: 16,fontWeight: "bold", color:"black", alignSelf:"center"}}>Enter Card Details</Text>
                <TextInput placeholder="Name" returnKeyType = {"next"} onChangeText={setName}></TextInput>
                <TextInput placeholder='Card Number'  onChangeText={setNumber}></TextInput>
                <TextInput placeholder="CVV" maxLength = {3}  onChangeText={setCvv}></TextInput>
                <TextInput placeholder="Expiry-Date" maxLength = {7}  onChangeText={setExpiry}></TextInput>
            </View>
            </KeyboardAvoidingView>
            </ScrollView>
        
    </View>

        <TouchableOpacity style = {styles.handlePayment} onPress= {() => handlePayment()}>
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
        shadowColor:"black",
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
