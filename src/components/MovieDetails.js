import React, {useEffect, useState} from 'react';
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
import MovieCard from './MovieCard';
import data from './MovieData';

import {getAllMovies} from '../api/AllMovies';
import {GetCastByMovieId} from '../api/GetCastByMovieId';

export default function MovieDetails({route, navigation}) {
  const [movieCast, setMovieCast] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      const response = await getAllMovies();
      // console.log("Total Movies Items : ",response.data.length);
      setMovieList(response.data);
    };
    fetchMovieData();
    // console.log("Role",route.params.userDetails.role);
  }, []);

  useEffect(() => {
    navigation.setOptions({headerTitle: route.params.movieItem.title});
  }, []);

  useEffect(() => {
    const fetchMovieCast = async () => {
      const response = await GetCastByMovieId(route.params.movieItem.movieId);

      const temp = response.data;
      finalCast = [];
      temp.map(field => {
        firstName = '';
        lastName = '';
        poster = '';
        movieId = '';
        const temp = field.split(',');
        finalCast.push({
          movieId: temp[0],
          firstName: temp[1],
          lastName: temp[2],
          poster: temp[3],
        });
      });
      // console.log('Total Movies Cast : ', finalCast);
      setMovieCast(finalCast);
    };
    fetchMovieCast();
  }, []);


  return (
    <View style={styles.movieDetails}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Image
          source={{uri: route.params.movieItem.poster}}
          style={styles.image}
          resizeMode="contain"
        />
        <Text>
          {route.params.movieItem.length} • {route.params.movieItem.rating} •{' '}
          {route.params.movieItem.format} • {route.params.movieItem.releaseDate}
        </Text>
        <Text>{route.params.movieItem.desc}</Text>
        <View style={styles.cast}>
          <Text style={styles.castText}>Cast</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {movieCast.map(field => {
              // console.log("*****************",field.photo);
              return (
                <View key={field.castId} style={styles.castCard}>
                  <Image
                    source={{uri: field.poster}}
                    style={styles.castImage}
                  />
                  <Text >
                    {field.firstName + ' ' + field.lastName}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View>
          <Text style={styles.castText}>You might also like</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {movieList.map(item => {
              return (
                <TouchableOpacity key={item.movieId}>
                  <MovieCard
                    poster={item.poster}
                    title={item.title}
                    format={item.format}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
      <View style={styles.button}>
        <Button
          title="Book tickets"
          color="#f14c63"
          onPress={() =>
            navigation.navigate('TheatreTimeSelection', {
              movieItem: route.params.movieItem,
              userDetails: route.params.userDetails,
              cityId : route.params.cityId,
            })
          }
        />
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
    marginVertical: 10,
    borderTopColor: '#C9C9C9',
    borderBottomColor: '#C9C9C9',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  castText: {
    fontSize: 18,
    // fontWeight:'10',
    fontWeight:'400',
    color: 'black',
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
  castCard: {
    marginRight: 20,
    alignItems: 'center',
  },
  button: {
    // backgroundColor:'black',
    flex: 0.06,
    margin: 10,
  },
});
