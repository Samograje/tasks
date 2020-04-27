import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListContainer from './src/components/list/ListContainer';
import DetailsContainer from './src/components/details/DetailsContainer';
import SettingsContainer from './src/components/settings/SettingsContainer';
import { colors, darkTheme, lightTheme } from './src/styles/common';
import { Theme } from '@react-navigation/native/src/types';

const Stack = createStackNavigator();

interface State {
  currentTheme: Theme,
}

class App extends React.Component<null, State> {
  constructor(props) {
    super(props);
    this.state = {
      currentTheme: lightTheme,
    };
  }

  changeTheme = () => {
    this.setState((prevState: State) => ({
      currentTheme: prevState.currentTheme.dark ? lightTheme : darkTheme,
    }));
  };

  render() {
    const currentTheme = this.state.currentTheme;
    const actionBarBackgroundColor = currentTheme.dark ? currentTheme.colors.card : currentTheme.colors.primary;

    return (
      <NavigationContainer theme={currentTheme}>
        <Stack.Navigator
          initialRouteName="List"
          screenOptions={{
            headerStyle: {
              backgroundColor: actionBarBackgroundColor,
            },
            headerTintColor: colors.tintColor,
          }}
        >
          <Stack.Screen
            name="List"
            component={ListContainer}
            options={{ title: 'Tasks list' }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsContainer}
            options={{ title: 'Task details' }}
          />
          <Stack.Screen
            name="Settings"
            component={(props) => (
              // TODO: find an other way to pass changeTheme() function to the screen
              <SettingsContainer
                {...props}
                changeTheme={this.changeTheme}
              />
            )}
            options={{ title: 'Settings' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

// TODO: additional config for iOS:
//  https://reactnavigation.org/docs/getting-started

export default App;
