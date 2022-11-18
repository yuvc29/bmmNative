import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Button,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import {PostMovie} from '../api/admin/PostMovie';
import {PostShow} from '../api/admin/PostShow';
import AddTheatre from './AddTheatre';

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
        const response = await axios.get('http://10.0.2.2:8080/movie');
        // console.log("responseData for movi List", response.data);
        setMovies(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();

    const fetchCity = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8080/city');
        // console.log("responseData for city List", response.data);
        setCity(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCity();
  }, [addShow]);

  useEffect ( () => {
    const fetchtheater = async () => {
        try {
        let id=-1;
        city.map(item => {
            if (item.name == selectCity) id = item.cityId;
        });
        if(id==-1)return;
          console.log("City Id is :",id);
        const response = await axios.get(
            `http://10.0.2.2:8080/theater/city/${id}`,
        );
        console.log('responseData for theater List', response.data);
        settheater(response.data);
        } catch (error) {
        console.log(error);
        }
    }
    fetchtheater();
    }, [selectCity]);

    

    useEffect ( () => {
            let movieId=-1;
            movies.map(item => {
                if (item.title == selectMovie) movieId = item.movieId;
            });
            if(movieId!==-1)setShowFields({...showFields , movieId : movieId});
                
            let theaterId=-1;
            theater.map(item => {
                if (item.name == selecttheater) theaterId = item.theaterId;
            });
            if(theaterId!==-1)setShowFields({...showFields , theaterId : theaterId});
            
        }, [selectMovie, selecttheater]);


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
      <Button title='Add Movie' onPress={() => setAddMovie(!addMovie)}/>
      <Modal
        animationType="slide"
        // transparent={true}
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
                console.log("Multiselect Item:", item[0]);
              setSelectedLanguage(item[0]);
              setFields({...fields, language: item[0]});
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
              setSelectAge(item[0]);
              setFields({...fields, ageRating: item[0]});
            }}
            uniqueKey={'age'}
            displayKey="age"
          />
          <Text>Visual Format: {selectFormat}</Text>
          <MultiSelect
            hideTags
            items={[{format: '2D'}, {format: '3D'}, {format: '2D/3D'}]}
            onSelectedItemsChange={item => {
              setSelectFormat(item[0]);
              setFields({...fields, format: item[0]});
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
          <Button title="Cancel" onPress={()=>setAddMovie(!addMovie)} />
        </ScrollView>
      </Modal>

      <Button title='Add Show' onPress={()=> setAddShow(!addShow)}/>
      <Modal
        animationType="slide"
        // transparent={true}
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
              setSelectMovie(item[0]);
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
                console.log(item);
              setSelectCity(item[0]);
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
              setSelecttheater(item[0]);
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
              setSelectTiming(item[0]);
              setShowFields({...showFields,timing:item[0]})
            }}
            uniqueKey={'time'}
            displayKey="time"
            searchInputPlaceholderText="Select time"
          />
          <Button title="Add" onPress={handleAddShow} />
          <Button title="Cancel" onPress={()=>setAddShow(!addShow)} />
        </View>
      </Modal>

      <AddTheatre/>
    </View>
  );
}

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  admin: {
    // flex: 1,
    justifyContent: 'space-evenly',
    margin: 10,
    flexDirection: 'row',
    // alignItems: 'center',
  },

  form: {
    marginTop: screenHeight*0.05,
    width: screenWidth*0.9,
    alignSelf:'center',
    elevation:5,
  },
});