import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import Home from "./screens/Home"
import Login from './screens/Login';
import MovieDetails from './screens/MovieDetails';
import Profile from './screens/Profile';
import Search from './screens/Search';

const stack = createNativeStackNavigator();

export default function App() {
  return (
    // <Home/>
    // <Profile/>
    // <Search/>
    // <Login/>
    // <MovieDetails/>
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name='Home' component={Home} options={{ 
            headerTitle: "BookMyMovie",
            headerStyle: {
              backgroundColor: '#333545',
            },
            headerTintColor: '#fff',
          }}/>
          <stack.Screen name='Profile' component={Profile} options={{ 
            headerTitle: "",
            headerStyle: {
              backgroundColor: '#333545',
            },
            headerTintColor: '#fff',
          }}/>
        {/* <stack.Screen name='Search' component={Search} options={{ 
            // headerTitle: "",
            headerStyle: {
              backgroundColor: '#333545',
            },
            headerTintColor: '#fff',
          }}/>
        <stack.Screen name='MovieDetails' component={MovieDetails} options={{ 
            headerTitle: "No Name",
            headerStyle: {
              backgroundColor: '#333545',
            },
            headerTintColor: '#fff',
          }}/> */}
      </stack.Navigator>
    </NavigationContainer>
  )
}