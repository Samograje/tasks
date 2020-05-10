import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Theme } from '@react-navigation/native/src/types';
import ListContainer from './src/components/list/ListContainer';
import DetailsContainer from './src/components/details/DetailsContainer';
import SettingsContainer from './src/components/settings/SettingsContainer';
import { colors, darkTheme, lightTheme } from './src/styles/common';
import { SortingContext, ThemeContext } from './src/utils/context';

const Stack = createStackNavigator();

interface State {
  currentTheme: Theme,
  currentSorting: string,
}

class App extends React.Component<null, State> {
  constructor(_: any) {
    super(_);
    this.state = {
      currentTheme: lightTheme,
      currentSorting: 'creationDate',
    };
  }

  changeTheme = (): void => {
    this.setState((prevState: State) => ({
      currentTheme: prevState.currentTheme.dark ? lightTheme : darkTheme,
    }));
  };

  changeSorting = (sorting: string): void => {
    this.setState({
      currentSorting: sorting,
    });
  };

  render() {
    const { currentTheme, currentSorting } = this.state;
    const sortingContextProviderValue = {
      currentSorting,
      changeSorting: this.changeSorting,
    };
    const themeContextProviderValue = {
      currentTheme,
      changeTheme: this.changeTheme,
    };

    const actionBarBackgroundColor = currentTheme.dark ? currentTheme.colors.card : currentTheme.colors.primary;
    const defaultScreenOptions = {
      headerStyle: {
        backgroundColor: actionBarBackgroundColor,
      },
      headerTintColor: colors.tintColor,
      headerBackTitleVisible: false,
    };

    return (
      <SortingContext.Provider value={sortingContextProviderValue}>
        <ThemeContext.Provider value={themeContextProviderValue}>
          <NavigationContainer theme={currentTheme}>
            <Stack.Navigator
              initialRouteName="List"
              screenOptions={defaultScreenOptions}
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
                component={SettingsContainer}
                options={{ title: 'Settings' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeContext.Provider>
      </SortingContext.Provider>
    );
  }
}

// TODO: additional config for iOS:
//  https://reactnavigation.org/docs/getting-started

export default App;
