import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MovieCard from '../components/MovieCard';
import data from '../components/MovieData';

export default function MovieDetails() {
  const cast = [
    {
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Indian_actor_Amitabh_Bachchan.jpg/220px-Indian_actor_Amitabh_Bachchan.jpg',
    },
    {
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Indian_actor_Amitabh_Bachchan.jpg/220px-Indian_actor_Amitabh_Bachchan.jpg',
    },
    {
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Indian_actor_Amitabh_Bachchan.jpg/220px-Indian_actor_Amitabh_Bachchan.jpg',
    },
  ];
  // const screenWidth = Math.round(Dimensions.get('window').width);

  return (
    <View style={styles.movieDetails}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Image
          source={{
            uri: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/uunchai-et00335262-1665386678.jpg',
          }}
          style={styles.image}
        />
        <Text>length • genre • format • releaseDate</Text>
        <Text>desc</Text>
        <View style={styles.cast}>
          <Text style={styles.castText}>Cast</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {cast.map(field => {
              // console.log("*****************",field.photo);
              return (
                <View style={styles.castCard}>
                  <Image source={{uri: field.photo}} style={styles.castImage} />
                  <Text style={styles.castText}>AB</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View>
          <Text style={styles.castText}>You might also like</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {data.map((item, index) => {
              return (
                <TouchableOpacity key={index}>
                  <MovieCard
                    poster={item.poster}
                    title={item.title}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
      <View style={styles.button}>
        <Button title="Book tickets" color="#f14c63" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  movieDetails: {
    paddingHorizontal: 15,
    paddingTop: 10,
    flexDirection: 'column',
    flex: 1,
  },
  scroll: {
    flex: 1,
    flexDirection: 'column',
  },
  cast: {
    marginVertical:10,
    borderTopColor:'#C9C9C9',
    borderBottomColor:'#C9C9C9',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  castText:{
    fontSize:18,
    // fontWeight:'10',
    color:'black'
  },
  image: {
    // marginLeft:5,
    borderRadius: 10,
    height: 200,
    width: 360,
  },
  castImage: {
    height: 100,
    width: 100,
    borderRadius: 60,
  },
  castCard:{
    marginRight:20,
  },
  button: {
    flex: 0.06,
    margin: 10,
  },

});
