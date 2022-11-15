import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {searchIcon, homeLogo, order} from '../assets';
import MovieCard from './MovieCard';
import {getAllMovies} from '../api/AllMovies';
// navigation.navigate("Search")

import data from './MovieData';
import MovieDetails from './MovieDetails';

export default function Home({navigation}) {

  const [movieList, setMovieList] = useState([]);

  const screenWidth = Math.round(Dimensions.get('window').width);
  
  useEffect(() => {
        const fetchMovieData = async() =>{
          const response = await getAllMovies();
          console.log("Total Movies Items : ",response.data.length);
          setMovieList(response.data);
      }
      fetchMovieData();
  }, []);
  

  const handleSearch = () => {
    navigation.navigate('Search');
  };

  return (
    <View style={styles.homeContainer}>
      <View style={styles.navBar}>
        <View style={styles.navTop}>
          <Text style={styles.heading}>It All Starts Here</Text>
          <TouchableOpacity onPress={handleSearch}>
            <Image source={searchIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <Pressable>
          <Text style={styles.location}>Noida</Text>
        </Pressable>
      </View>

      <View style={styles.homeBody}>
        <ScrollView>
          {/* <FlatListSlider
            data={MovieDetails}
            initialScrollIndex={0}
            // timer={10000}
            imageKey={'poster'}
            local={false}
            // height={300}
            width={screenWidth}
            separator={0}
            loop={true}
            autoScroll={true}
            onPress={() => navigation.navigate('MovieDetails' ,{title:"dsad"})}
            indicator={false}
          /> */}
        </ScrollView>

        <View>
          <Text style={styles.recommended}>Recommended Movies</Text>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {movieList.map((item) => {
            console.log("movieList Item" ,item);
            return (
              <TouchableOpacity
                key={item.movieId}
                onPress={() => navigation.navigate('MovieDetails',{movieItem : item})}>
                <MovieCard
                  poster={item.poster}  
                  title={item.title}
                  format={item.format}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity>
            <Pressable style={styles.footerItem}>
              <Image source={homeLogo} style={styles.homeLogo} />
              <Text>Home</Text>
            </Pressable>
          </TouchableOpacity>
          <TouchableOpacity>
            <Pressable style={styles.footerItem}>
              <Image source={order} style={styles.homeLogo} />
              <Text>Orders</Text>
            </Pressable>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  recommended: {
    marginLeft: 10,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },

  heading: {
    marginLeft: 10,
    color: '#FFFFFF',
    fontSize: 30,
  },

  homeLogo: {
    marginLeft: 5,
    height: 25,
    width: 25,
  },

  navBar: {
    // marginLeft:10,
    flex: 0.8,
    flexDirection: 'column',
    backgroundColor: '#333545',
    // justifyContent:'space-around'
  },

  navTop: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  location: {
    marginLeft: 10,
    color: 'white',
  },

  touchIcon: {
    // backgroundColor:"#FFFFFF"
  },

  homeBody: {
    marginTop:5,
    flex: 8,
  },

  icon: {
    marginLeft: 100,
    marginTop: 5,
    width: 40,
    height: 40,
    color: '#FFFFFF',
  },

  footer: {
    // margin:10,
    padding: 5,
    backgroundColor: '#e7464e',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  footerItem: {
    marginHorizontal: 60,
  },
});
