import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListComponent from './screens/ListComponent';
import DetailComponent from './screens/DetailComponent';



const Stack = createNativeStackNavigator();


export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>

          {/* Default Screen - List */}
          <Stack.Screen
            name={"list"}
            component={ListComponent}
            options={{ title: "Search Repositories"}}/>

          {/* Detail Screen */}
          <Stack.Screen 
            name={"detail"} 
            component={DetailComponent} 
            options={{ title: "Repository Details"}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }


}

