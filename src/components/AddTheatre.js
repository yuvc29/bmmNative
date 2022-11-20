import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import {PostTheater} from '../api/admin/PostTheater';
import axios from 'axios';
// import SectionedMultiSelect from 'react-native-sectioned-multi-select';
// import { Icon } from 'react-native-vector-icons/Icon';

export default function AddTheater() {
  const [addTheater, setAddTheater] = useState(false);
  const [selectCity, setSelectCity] = useState('');

  const [city, setCity] = useState([]);

  const [theaterFields, setTheaterFields] = useState({
    name: '',
    address: '',
    cityId: 0,
  });

  const handlePressTheater = () => {
    setAddTheater(!addTheater);
    const fetchCity = async () => {
      try {
        const response = await axios.get('http://192.168.111.123:8080/city');
        // console.log("responseData for city List", response.data);
        setCity(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCity();
  };

  useEffect(() => {
    let cityId = -1;
    city.map(item => {
      if (item.name == selectCity) cityId = item.cityId;
    });
    if (cityId !== -1) setTheaterFields({...theaterFields, cityId: cityId});
  }, [selectCity]);

  const handleAddTheater = () => {
    setAddTheater(!addTheater);
    const postTheater = async () => {
      const response = await PostTheater(theaterFields);
    };
    postTheater();
  };

  return (
    <View>
      <Button title="Add Theater" onPress={handlePressTheater} />
      <Modal
        animationType="slide"
        // transparent={true}
        visible={addTheater}
        onRequestClose={!addTheater}>
        <View style={styles.form}>
          <Text>Theater Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Add theater name"
            placeholderTextColor="#AFB0B0"
            onChangeText={text =>
              setTheaterFields({...theaterFields, name: text})
            }
          />
          <Text>Address</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Add theater address"
            placeholderTextColor="#AFB0B0"
            onChangeText={text =>
              setTheaterFields({...theaterFields, address: text})
            }
          />
          <Text>Select City: {selectCity}</Text>
          <MultiSelect
            hideTags
            items={city}
            onSelectedItemsChange={item => {
              setSelectCity(item);
            }}
            uniqueKey={'name'}
            displayKey="name"
            searchInputPlaceholderText="Search cities"
          />

          {/* <SectionedMultiSelect
            items={city}
            uniqueKey="name"
            onSelectedItemsChange={item => {
              setSelectCity(item);
            }}
            IconRenderer={Icon}
          /> */}

          <Button title="Add" onPress={handleAddTheater} />
          <Button title="Cancel" onPress={() => setAddTheater(!addTheater)} />
        </View>
      </Modal>
    </View>
  );
}

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  form: {
    marginTop: screenHeight * 0.05,
    width: screenWidth * 0.9,
    alignSelf: 'center',
    elevation: 5,
  },
});
