import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Button,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import {PostMovie} from '../api/PostMovie';
import {PostShow} from '../api/PostShow';

export default function Admin() {
  const [addMovie, setAddMovie] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectAge, setSelectAge] = useState('');
  const [selectFormat, setSelectFormat] = useState('');

  const [addShow, setAddShow] = useState(false);
  const [selectMovie, setSelectMovie] = useState('');
  const [selectCity, setSelectCity] = useState('');
  const [selecttheater, setSelecttheater] = useState('');
  const [selectTiming, setSelectTiming] = useState('');

  const [movies, setMovies] = useState([]);
  const [city, setCity] = useState([]);
  const [theater, settheater] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://192.168.1.5:8080/movie');
        // console.log("responseData for movi List", response.data);
        setMovies(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();

    const fetchCity = async () => {
      try {
        const response = await axios.get('http://192.168.1.5:8080/city');
        // console.log("responseData for city List", response.data);
        setCity(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCity();
  }, [addShow]);

  const fetchtheater = async () => {
    try {
      let id;
      city.map(item => {
        if (item.name == selectCity) id = item.cityId;
      });
    //   console.log(id);
      const response = await axios.get(
        `http://192.168.1.5:8080/theater/${id}`,
      );
      console.log('responseData for theater List', response.data);
      settheater(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [fields, setFields] = useState({
    title: '',
    releaseDate: '',
    expiryDate: '',
    length: 0,
    trailer: '',
    language: '',
    ageRating: '',
    rating: 5,
    format: '',
    poster: '',
    description: '',
  });

  const [showFields, setShowFields] = useState({
    date:"",
    movieId:0,
    theaterId:0,
    timing: ""
})

  const languages = [
    {language: 'Hindi'},
    {language: 'English'},
    {language: 'Tamil'},
    {language: 'Telugu'},
    {language: 'Marathi'},
  ];
  const timings = [
    {time: '14:00 - 16:00'},
    {time: '17:00 - 19:00'},
    {time: '20:00 - 22:00'},
    {time: '11:00 - 13:00'},
  ];

  const handleAddMovie = () => {
    setAddMovie(!addMovie);
    const postMovies = async () => {
      const response = await PostMovie(fields);
    };
    postMovies();
  };

  const handleAddShow = () => {
    setAddShow(!addShow);
    const postShow = async () => {
      const response = await PostShow(showFields);
    };
    postShow();
  };

  let movieId;
  movies.map((item)=>{
    if(selectMovie==item.title)
    movieId=item.movieId;
  })

  let theaterId;
  theater.map((item)=>{
    if(selecttheater==item.name)
    theaterId=item.movieId;
  })

  return (
    <View style={styles.admin}>
      <Pressable onPress={() => setAddMovie(!addMovie)}>
        <Text style={styles.add}>Add Movie</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={addMovie}
        onRequestClose={!addMovie}>
        <ScrollView style={styles.form}>
          <Text>Title</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter movie title"
            placeholderTextColor="#AFB0B0"
            onChangeText={text => setFields({...fields, title: text})}
          />
          <Text>Description</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter movie description"
            placeholderTextColor="#AFB0B0"
            onChangeText={text => setFields({...fields, description: text})}
          />
          <Text>Release Date</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="phone-pad"
            placeholder="Enter release date"
            placeholderTextColor="#AFB0B0"
            onChangeText={text => setFields({...fields, releaseDate: text})}
          />
          <Text>Expiry Date</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="phone-pad"
            placeholder="Enter expiry date"
            placeholderTextColor="#AFB0B0"
            onChangeText={text => setFields({...fields, expiryDate: text})}
          />
          <Text>Length</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            placeholder="Enter movie length"
            placeholderTextColor="#AFB0B0"
            onChangeText={text => setFields({...fields, length: text})}
          />
          <Text>IMBD Rating</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            placeholder="Enter rating"
            placeholderTextColor="#AFB0B0"
            onChangeText={text => setFields({...fields, rating: text})}
          />
          <Text>Select Language: {selectedLanguage}</Text>
          <MultiSelect
            hideTags
            items={languages}
            onSelectedItemsChange={item => {
              setSelectedLanguage(item);
              setFields({...fields, language: item});
            }}
            uniqueKey={'language'}
            displayKey="language"
            searchInputPlaceholderText="Search Languages"
          />
          <Text>Age Rating: {selectAge}</Text>
          <MultiSelect
            hideTags
            items={[{age: 'U'}, {age: 'U/A'}, {age: 'G'}]}
            onSelectedItemsChange={item => {
              setSelectAge(item);
              setFields({...fields, ageRating: item});
            }}
            uniqueKey={'age'}
            displayKey="age"
          />
          <Text>Visual Format: {selectFormat}</Text>
          <MultiSelect
            hideTags
            items={[{format: '2D'}, {format: '3D'}, {format: '2D/3D'}]}
            onSelectedItemsChange={item => {
              setSelectFormat(item);
              setFields({...fields, format: item});
            }}
            uniqueKey={'format'}
            displayKey="format"
          />
          <Text>Poster</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Share poster link"
            placeholderTextColor="#AFB0B0"
            onChangeText={text => setFields({...fields, poster: text})}
          />
          <Text>Trailer Link</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Share trailer link"
            placeholderTextColor="#AFB0B0"
            onChangeText={text => setFields({...fields, trailer: text})}
          />

          <Button title="Add" onPress={handleAddMovie} />
        </ScrollView>
      </Modal>

      <Pressable onPress={()=> setAddShow(!addShow)}>
        <Text style={styles.add}>Add Show</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={addShow}
        onRequestClose={!addShow}>
        <View style={styles.form}>
          <Text>Show Date</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="phone-pad"
            placeholder="Enter show date"
            placeholderTextColor="#AFB0B0"
            onChangeText={text=> setShowFields({...showFields, date:text})}
          />
          <Text>Select Movie: {selectMovie}</Text>
          <MultiSelect
            hideTags
            items={movies}
            onSelectedItemsChange={item => {
              setSelectMovie(item);
            }}
            uniqueKey={'title'}
            displayKey="title"
            searchInputPlaceholderText="Search Movies"
          />
          <Text>Select City: {selectCity}</Text>
          <MultiSelect
            hideTags
            items={city}
            onSelectedItemsChange={item => {
              setSelectCity(item);
              fetchtheater();
            }}
            uniqueKey={'name'}
            displayKey="name"
            searchInputPlaceholderText="Search cities"
          />
          <Text>Select theater: {selecttheater}</Text>
          <MultiSelect
            hideTags
            items={theater}
            onSelectedItemsChange={item => {
              setSelecttheater(item);
            }}
            uniqueKey={'name'}
            displayKey="name"
            searchInputPlaceholderText="Search theaters"
          />
          <Text>Select Timings: {selectTiming}</Text>
          <MultiSelect
            hideTags
            items={timings}
            onSelectedItemsChange={item => {
              setSelectTiming(item);
              setShowFields({...showFields,timing:item})
            }}
            uniqueKey={'time'}
            displayKey="time"
            searchInputPlaceholderText="Select time"
          />
          <Button title="Add" onPress={handleAddShow} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  admin: {
    flex: 1,
    justifyContent: 'space-evenly',
    margin: 10,
    flexDirection: 'row',
    // alignItems: 'center',
  },
  add: {
    width: 140,
    paddingHorizontal: 10,
    fontSize: 25,
    color: 'white',
    borderRadius: 25,
    backgroundColor: '#333545',
  },

  form: {
    marginTop: 50,
  },
});
