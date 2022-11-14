/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TheatreTimeSelection from './src/components/TheatreTimeSelection';
import Seating from './src/components/Seating';
import PaymentPage from './src/components/PaymentPage';
import Ticket from './src/components/Ticket';

const Stack = createNativeStackNavigator();

const App= () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TheatreTimeSelection"
          component={TheatreTimeSelection}
          initialParams={{movieName:'Wakanda Forever'}}
          options={{ 
            headerTitle: "No Name",
            headerStyle: {
              backgroundColor: '#333545',
            },
            headerTintColor: '#fff',
          }}
        />

        <Stack.Screen
          name = "Seating"
          component = {Seating}
          options={{ 
            headerStyle: {
              backgroundColor: '#333545',
            },
            headerTintColor: '#fff',
          }}
        /> 

         <Stack.Screen
          name = "PaymentPage"
          component = {PaymentPage}
          options={{ 
            headerStyle: {
              backgroundColor: '#333545',
            },
            headerTintColor: '#fff',
          }}
        />

        <Stack.Screen
          name = "Ticket"
          component = {Ticket}
          options={{ 
            headerStyle: {
              backgroundColor: '#333545',
            },
            headerTintColor: '#fff',
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
