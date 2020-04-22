import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListContainer from './components/list/ListContainer';
import DetailsContainer from './components/details/DetailsContainer';
import SettingsContainer from './components/settings/SettingsContainer';
import { colors, darkTheme, lightTheme } from './styles/common';

const Stack = createStackNavigator();

interface State {
  isDarkThemeEnabled: boolean,
}

class App extends React.Component<null, State> {
  constructor(props) {
    super(props);
    this.state = {
      isDarkThemeEnabled: false,
    };
  }

  changeTheme = () => {
    this.setState((prevState: State) => ({
      isDarkThemeEnabled: !prevState.isDarkThemeEnabled,
    }));
  };

  render() {
    const currentTheme = this.state.isDarkThemeEnabled ? darkTheme : lightTheme;
    const actionBarBackgroundColor = this.state.isDarkThemeEnabled ? currentTheme.colors.card : currentTheme.colors.primary;

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
                isDarkThemeEnabled={this.state.isDarkThemeEnabled}
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
