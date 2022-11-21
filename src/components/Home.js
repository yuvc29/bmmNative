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
import {searchIcon, homeLogo, order, profile} from '../assets';
import MovieCard from './MovieCard';
import {getAllMovies} from '../api/AllMovies';
import Picker from '@ouroboros/react-native-picker';

export default function Home({route,navigation}) {

  const [movieList, setMovieList] = useState([]);

  const screenWidth = Math.round(Dimensions.get('window').width);
  
  useEffect(() => {
        const fetchMovieData = async() =>{
          const response = await getAllMovies();
          // console.log("Total Movies Items : ",response.data.length);
          setMovieList(response.data);
      }
      fetchMovieData();
      console.log("Role",route.params.userDetails.role);
  }, []);
  

  let [city, setCity] = useState('DEL');

  const handleSearch = () => {
    navigation.navigate('Search');
  };

  const ads = [
    {
      photo:
        'https://assets-in.bmscdn.com/promotions/cms/creatives/1666863783729_fweb.jpg',
    },
    {
      photo:
        'https://assets-in.bmscdn.com/promotions/cms/creatives/1668000705029_vanbed.jpg',
    },
    {
      photo:
        'https://assets-in.bmscdn.com/promotions/cms/creatives/1668084708057_comico.jpg',
    },
    {
      photo:
        'https://img.ticketnew.com/tn/offer_banner/Gandhada_gudi_2/1920_400.jpg',
    },
    {
      photo:
        'https://d18hry5vavz86j.cloudfront.net/WebpTest/ba18f92f-ea45-40b5-aa04-9708f71f245f.webp',
    },
  ];

  const Cities = [
    {value: 'DEL', text: 'Delhi-NCR'},
    {value: 'MUM', text: 'Mumbai'},
    {value: 'BGR', text: 'Bangaluru'},
    {value: 'HYD', text: 'Hyderabad'},
    {value: 'ABD', text: 'Ahmedabad'},
    {value: 'CG', text: 'Chandigarh'},
    {value: 'CHN', text: 'Chennai'},
    {value: 'KKR', text: 'Kolkata'},
  ];

  return (
    <View style={styles.homeContainer}>
      <View style={styles.navBar}>
        <View style={styles.navTop}>
          <Text style={styles.heading}>Hello {route.params.userDetails.firstName} !</Text>
          <TouchableOpacity onPress={handleSearch}>
            <Image source={searchIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <Pressable>
          <Picker
          
            onChanged={setCity}
            options={Cities}
            style={{
              marginLeft: 10,
              color: 'white',
              padding: 5,
              marginTop:-5,
            }}
            value={city}
          />
        </Pressable>
      </View>

      <ScrollView style={styles.homeBody} showsVerticalScrollIndicator={false}>
        <FlatListSlider
          data={ads}
          imageKey={'photo'}
          local={false}
          width={screenWidth}
          separator={0}
          loop={true}
          autoScroll={true}
          onPress={() => console.log('')}
          indicator={false}
          height={180}
        />

        <View>
          <Text style={styles.recommended}>Recommended Movies</Text>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {movieList.map(item => {
            return (
              <TouchableOpacity
                // key={index}
                onPress={() =>
                  navigation.navigate('MovieDetails',{movieItem : item, userDetails:route.params.userDetails})
                }>
                <MovieCard
                  poster={item.poster}
                  title={item.title}
                  format={item.format}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View>
          <Text style={styles.recommended}>You might also like</Text>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {movieList.slice().reverse().map(item => {
            return (
              <TouchableOpacity
                key={item.movieId}
                onPress={() =>
                  navigation.navigate('MovieDetails',{movieItem : item,  userDetails:route.params.userDetails})
                }>
                <MovieCard
                  poster={item.poster}
                  title={item.title}
                  format={item.format}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ScrollView>

      <View style={styles.footer}>
        {(route.params.userDetails.role=="admin")?
          <TouchableOpacity style = {styles.footerItem} onPress={() => navigation.navigate('Admin')}>
            <Image source={homeLogo} style={styles.homeLogo} />
              <Text>C-M-S</Text>
          </TouchableOpacity>:<></>}
        <TouchableOpacity  style={styles.footerItem} onPress={() => navigation.navigate('Orders', {userDetails:route.params.userDetails})}>
          {/* <Pressable style={styles.footerItem}> */}
            <Image source={order} style={styles.homeLogo} />
            <Text>Orders</Text>
          {/* </Pressable> */}
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Profile',{ userDetails:route.params.userDetails})}>
          {/* <Pressable style={styles.footerItem}> */}
            <Image source={profile} style={styles.homeLogo} />
            <Text>Profile</Text>
          {/* </Pressable> */}
        </TouchableOpacity>

          

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
    marginTop: 15,
    marginLeft: 10,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },

  heading: {
    marginTop:5,
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
    flex: 0.12,
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
    marginTop: 5,
    flex: 8,
  },

  icon: {
    marginLeft: 140,
    marginTop: 10,
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
    marginHorizontal: 40,
  },
});