//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Login from './App/Auth/login';
import NavigationService from './App/Service/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthService from './App/Service/AuthService';
import { setuser } from './App/Redux/reducer/User';
import { useDispatch } from 'react-redux';
import PersonalInfo from './App/Auth/PersonalInfo';
import FormThree from './App/Auth/FormThree';

const Stack = createStackNavigator();

// create a component
const App = () => {

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <NavigationContainer
        ref={r => NavigationService.setTopLevelNavigator(r)}
      >
        <Stack.Navigator
          initialRouteName='login'
          screenOptions={{
            headerShown: false,
          }}
        >
              <Stack.Screen name="login" component={Login} />
              <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
              <Stack.Screen name="formThree" component={FormThree} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({

});

//make this component available to the app
export default App;
