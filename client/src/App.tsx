import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ListContainer from './components/list/ListContainer';
import DetailsContainer from './components/details/DetailsContainer';
import SettingsContainer from './components/settings/SettingsContainer';
import {colors} from "./styles/common";

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.tintColor,
      }}
    >
      <Stack.Screen
        name="List"
        component={ListContainer}
        options={{title: 'Tasks list'}}
      />
      <Stack.Screen
        name="Details"
        component={DetailsContainer}
        options={{title: 'Task details'}}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsContainer}
        options={{title: 'Settings'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

// TODO: additional config for iOS:
//  https://reactnavigation.org/docs/getting-started

export default App;
