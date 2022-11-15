import React from 'react';
import {Image, StyleSheet , Text, View} from 'react-native';

export default function MovieCard(props) {
  return (
    <View style={styles.card}>
      <Image source={{uri: props.poster}} style={styles.cardImage}/>
      <Text style={styles.cardTitle}>{props.title}</Text>
      <Text>{props.format}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardImage:{
    height:250,
    width:150,
    borderRadius:20,
  },
  cardTitle:{
    fontSize:15,
    color:'black',
    fontWeight:'500',
  },
  card:{
    width:150,
    margin:10,
  }
})
