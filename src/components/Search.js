import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {getAllMovies} from '../api/AllMovies';
import {clapperboard, loupe} from '../assets';

export default function Search({route, navigation}) {
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState(true);
  const [filterItem, setFilterItem] = useState(data);
  const [searchkey, setSearchKey] = useState('');

  useEffect(() => {
    const fetchMovieData = async () => {
      const response = await getAllMovies();
      console.log('Total Movies Items : ', response.data.length);
      setData(response.data);
      setFilterItem(response.data);
    };
    fetchMovieData();
  }, []);

  const filterMovie = e => {
    // console.log(e);
    setSearchKey(e);
    const filteredData = data.filter(search => {
      if (e === '') return search;
      return search.title.toLowerCase().includes(e.toLowerCase());
    });

    setFilterItem(filteredData);
    if (filteredData.length > 0) setDisplay(true);
    else setDisplay(false);
  };

  return (
    <View>
      <View style={styles.searchBar}>
        <View style={styles.searchBox}>
          <Image source={loupe} style={styles.loupe} />
          <TextInput
            style={styles.searchText}
            placeholder="Search for movies..."
            onChangeText={e => filterMovie(e)}
            //   onFocus={e => showAll(e)}
          />
        </View>
      </View>

      <ScrollView>
        {filterItem.map(item => {
          return (
            <TouchableOpacity
              key={item.movieId}
              onPress={() =>
                navigation.navigate('MovieDetails', {movieItem: item})
              }>
              <View style={styles.list}>
                <Text style={styles.titles}>{item.title}</Text>
                <Image style={styles.icon} source={clapperboard} />
              </View>
            </TouchableOpacity>
          );
        })}
        {!display && (
          <Text> Your search {searchkey} didn't match to any movies</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#333545',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  searchBox: {
    // borderWidth: 1,
    // padding: 10,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
  },

  loupe: {
    marginLeft: 5,
    marginTop: 15,
    height: 20,
    width: 20,
  },
  searchText: {
    // marginTop: 15,
    marginLeft: 5,
    flex: 3,
    // borderWidth: 1,
    fontSize: 20,
  },

  list: {
    height: 60,
    marginVertical: 1,
    marginLeft: 15,
    borderColor: '#B0B1B1',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  icon: {
    marginRight: 10,
    marginTop: 15,
    width: 30,
    height: 30,
    color: '#FFFFFF',
    // marginLeft:40,
  },

  titles: {
    // marginLeft:10,
    color: 'black',
    marginTop: 25,
    fontSize: 18,
  },
});
