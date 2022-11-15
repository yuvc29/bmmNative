import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import Home from "./src/components/Home"
import Login from './src/components/Login'
import MovieDetails from './src/components/MovieDetails'
import Orders from './src/components/Orders'
import Profile from './src/components/Profile'
import Search from './src/components/Search'

const stack = createNativeStackNavigator();

export default function App() {
  return (
    // <Home/>
    // <Profile/>
    // <Search/>
    // <Login/>
    // <MovieDetails/>
    // <Orders/>
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name='Home' component={Home} options={{ 
            headerTitle: "BookMyMovie",
            headerShown:false,
            headerStyle: {
              backgroundColor: '#333545',
            },
            headerTintColor: '#fff',
          }}/>
          <stack.Screen name='Profile' component={Profile} options={{ 
            headerTitle: "Hi!",
            headerStyle: {
              backgroundColor: '#333545',
            },
            headerTintColor: '#fff',
          }}/>
        <stack.Screen name='Search' component={Search} options={{ 
                        headerShown:false,

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
          }}/>
          <stack.Screen name='Orders' component={Orders} options={{ 
            headerStyle: {
              backgroundColor: '#333545',
            },
            headerTintColor: '#fff',
          }}/>
      </stack.Navigator>
    </NavigationContainer>
  )
}