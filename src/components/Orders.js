import React from 'react';
import {FlatList, Image, StyleSheet, View, Text} from 'react-native';
import data from './MovieData'

export default function Orders() {
const item = ({item})=>{
    return(
        <View key={item.movieId} style={styles.ticket}>
          <View style={styles.ticketHead}>
            <Image style={styles.image} source={{uri: item.poster}} />
            <View style={styles.movieInfo}>
              <Text>
                {item.format}
              </Text>
              <Text>{item.language}</Text>
              <Text style={styles.screen}>{item.title}</Text>
              <Text>time</Text>
            </View>
          </View>
          <View style={styles.ticketMid}>
            <View>
              <Text>city</Text>
              <Text style={styles.screen}>theatre</Text>
            </View>
            <View>
              <Text>Seats</Text>
              <Text style={styles.screen}>a1,a2</Text>
            </View>
          </View>
        </View>
    )
}

  return (
    <FlatList
      data={data}
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
