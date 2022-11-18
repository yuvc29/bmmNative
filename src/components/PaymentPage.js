import React, {useEffect, useState} from 'react';
import {
  CreditCardInput,
  LiteCreditCardInput,
} from 'react-native-credit-card-input-plus';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {PostCreditCard} from '../api/PostCreditCard';
import {PostTransaction} from '../api/Transaction';
import {PostBookedSeats} from '../api/Seating';
import {GetCardByUserId} from '../api/GetCardDetails';

export default function PaymentPage({route, navigation}) {
  const [focused, setFocused] = useState('name');
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');
  const [index, setIndex] = useState(0);
  const [type, setType] = useState('visa');

  const onChange = form => {
    // console.log(form);
  };

  useEffect(() => {
    const fetchCard = async () => {
      const response = await GetCardByUserId(route.params.userDetails.userId);
      // console.log("carD Details", response.data);
      if (response.data.length == 0) return;
      const card = response.data[0];
      setNumber(card.cardNo);
      setName(card.name);
      setCvv(card.cvv);
      setExpiry(card.expDate);
    };
    fetchCard();
  }, []);

  handlePayment = async () => {
    cardObj = {
      cardNo: number,
      name: name,
      cvv: cvv,
      expDate: expiry,
      userId: route.params.userDetails.userId, // user-Id hard coded
    };
    const crrResponse = await PostCreditCard(cardObj);
    // console.log("Credit Card Post Status", crrResponse.status);

    transactionObj = {
      orderId: route.params.orderObj.orderId,
      status: 'true',
    };
    const tranResponse = await PostTransaction(transactionObj);
    console.log(' Transaction Post Status', tranResponse.status);

    route.params.seatList.map(async seatNo => {
      seatObj = {
        showId: route.params.showItem.showId,
        seatNo: seatNo,
        price: 100,
        orderId: route.params.orderObj.orderId,
      };
      const seatBookingResponse = await PostBookedSeats(seatObj);
      console.log(
        ' Seat Post Status for',
        seatNo,
        ':',
        seatBookingResponse.status,
      );
    });

    navigation.navigate('Ticket', {
      movieItem: route.params.movieItem,
      seatList: route.params.seatList,
      theaterItem: route.params.theaterItem,
      date: route.params.date,
      userDetails: route.params.userDetails,
    });
  };

  return (
    <View
      style={{padding: 10, display: 'flex', flexDirection: 'column', flex: 1}}>
      <View style={styles.mainContainer}>
        <ScrollView>
          {/* <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}> */}
          <View style={styles.movieDescription}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              {route.params.movieItem.title}
            </Text>
            <Text style={{fontSize: 12, fontWeight: 'light'}}>
              {route.params.movieItem.language}
            </Text>
            <Text style={{fontSize: 12, fontWeight: 'bold'}}>
              {route.params.theaterItem.theatreName} |{' '}
              {route.params.theaterItem.address}{' '}
            </Text>
            <Text style={{fontSize: 12, fontWeight: 'light'}}>
              {route.params.date} | {route.params.showItem.timing}
            </Text>
          </View>

          <View style={styles.paymentDesc}>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                justifyContent: 'space-between',
              }}>
              <Text style={{alignSelf: 'flex-start'}}> Ticket Price </Text>
              <Text> {route.params.orderObj.amount} </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                justifyContent: 'space-between',
              }}>
              <Text style={{alignSelf: 'flex-start'}}> Discount </Text>
              <Text> {0} </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                alignContent: 'space-between',
                justifyContent: 'space-between',
              }}>
              <Text style={{alignSelf: 'flex-start'}}> Seats</Text>
              <Text style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
                {' '}
                {route.params.seatList.toString()}
              </Text>
            </View>
          </View>

          <View style={styles.contactDetails}>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Text style={{alignSelf: 'flex-start'}}> Seats Count </Text>
              <Text style={{marginLeft: 200}}>
                {' '}
                {route.params.ticket.seatCount}{' '}
              </Text>
            </View>
          </View>
          <View style={styles.cardDetails}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'black',
                alignSelf: 'center',
              }}>
              Enter Card Details
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>Card Holder Name</Text>
              <TextInput
                placeholder="Name"
                returnKeyType={'next'}
                onChangeText={setName}>
                {name}
              </TextInput>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>Card Number</Text>
              <TextInput placeholder="Card Number" onChangeText={setNumber}>
                {number}
              </TextInput>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>CVV</Text>
              <TextInput placeholder="CVV" maxLength={3} onChangeText={setCvv}>
                {cvv}
              </TextInput>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>Expiry date</Text>
              <TextInput
                placeholder="Expiry-Date"
                maxLength={7}
                onChangeText={setExpiry}>
                {expiry}
              </TextInput>
            </View>
          </View>
          {/* </KeyboardAvoidingView> */}
        </ScrollView>
      </View>

      <TouchableOpacity
        style={styles.handlePayment}
        onPress={() => handlePayment()}>
        <Text style={{alignSelf: 'center', fontSize: 20, fontWeight: 'bold'}}>
          {' '}
          Pay
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    elevation: 5,
    shadowColor: 'black',
  },
  movieDescription: {
    borderTopWidth: 1,
    flex: 1,
    padding: 10,
  },
  paymentDesc: {
    padding: 10,
    borderTopWidth: 1,
    flex: 2,
  },
  contactDetails: {
    borderTopWidth: 1,
    flex: 1,
    padding: 10,
  },
  cardDetails: {
    borderTopWidth: 1,
    flex: 4,
    padding: 10,
  },
  handlePayment: {
    width: '100%',
    height: 50,
    alignSelf: 'flex-end',
    backgroundColor: '#f84464',
    justifyContent: 'center',
  },
});
