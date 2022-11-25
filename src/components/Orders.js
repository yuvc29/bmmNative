import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {FlatList, Image, StyleSheet, View, Text} from 'react-native';
import { getOrdersByUserId } from '../api/GetOrdersByUserId';
import data from './MovieData'

export default function Orders({route, navigation}) {

  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
   const fetchOrders = async() => {
    const response = await getOrdersByUserId(route.params.userDetails.userId);
    const data = response.data;
    let finalOrderList = [];
    let finalMovieList = [];

    

    data.map(async(field) => {
      const temp = field.split(',');
      const movieResponse = await axios.get(`${server_url}/movie/${temp[1]}`);
      obj = {
        showId : temp[0],
        movieId : temp[1],
        theaterName : temp[2],
        timing: temp[3],
        city : temp[4], 
        poster: movieResponse.data.poster,
        movieName: movieResponse.data.title,
        language: movieResponse.data.language,
        format : movieResponse.data.format,
      }

      
      finalOrderList.push(obj);
      setOrderList(finalOrderList);
    })
    
  }
  fetchOrders();
  }, [])
  
const item = ({item})=>{
    return(
        <View key={item.movieId} style={styles.ticket}>
          <View style={styles.ticketHead}>
            <Image style={styles.image} source={{uri: item.poster}} />
            <View style={styles.movieInfo}>
              <Text>
                {item.movieName}
              </Text>
              <Text>{item.language}</Text>
              <Text>{item.format}</Text>
              <Text>{item.title}</Text>
              <Text>{item.timing}</Text>
            </View>
          </View>
          <View style={styles.ticketMid}>
            <View>
              <Text>City</Text>
              <Text style={styles.screen}>{item.city}</Text>
            </View>
            <View>
              <Text>Theater</Text>
              <Text style={styles.screen}>{item.theaterName}</Text>
            </View>
          </View>
        </View>
    )
}

  return (
    <FlatList
      data={orderList}
      renderItem={item}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyText}>You have no bookings.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  ticket: {
    padding:10,
    marginHorizontal: 20,
    marginVertical:10,
    backgroundColor:'#D4D8E3',
    borderRadius:10,
    justifyContent:"space-between",
  },
  movieInfo:{
    marginTop:20,
    marginLeft:25,
  },
  ticketHead: {
    // marginHorizontal:10,
    flexDirection: 'row',
  },
  image: {
    height: 120,
    width: 100,
    // borderRadius: 5,
  },
  screen:{
    color:'black',
    fontWeight:'bold',
    fontSize:20,
  },
  ticketMid: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  empty: {
    margin: 120,
  },
  emptyText: {
    fontWeight: '500',
    color: 'black',
  },
});
