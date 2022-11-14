import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import Home from "./screens/Home"
import MovieDetails from './screens/MovieDetails';
import Search from './screens/Search';

const stack = createNativeStackNavigator();

export default function App() {
  return (
    // <Home/>
    // <Search/>
    // <MovieDetails/>
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name='Home' component={Home}/>
        <stack.Screen name='Search' component={Search}/>
        <stack.Screen name='MovieDetails' component={MovieDetails}/>
      </stack.Navigator>
    </NavigationContainer>
  )
}