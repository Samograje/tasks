import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Theme } from '@react-navigation/native/src/types';
import ListContainer from './src/components/list/ListContainer';
import DetailsContainer from './src/components/details/DetailsContainer';
import SettingsContainer from './src/components/settings/SettingsContainer';
import StyledSnackbar from './src/components/ui/StyledSnackbar';
import { colors, darkTheme, lightTheme } from './src/styles/common';
import { SnackbarContext, SortingContext, ThemeContext } from './src/utils/context';

const Stack = createStackNavigator();

interface State {
  currentTheme: Theme,
  currentSorting: string,
  snackbarMessage: string | null,
}

class App extends React.Component<null, State> {
  constructor(_: any) {
    super(_);
    this.state = {
      currentTheme: lightTheme,
      currentSorting: 'creationDate',
      snackbarMessage: null,
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

  showSnackbar = (message: string): void => {
    this.setState({
      snackbarMessage: message,
    });
  };

  hideSnackbar = (): void => {
    this.setState({
      snackbarMessage: null,
    });
  };

  render() {
    // TODO: show warnings again
    console.disableYellowBox = true;
    // @ts-ignore
    console.reportErrorsAsExceptions = false;

    const { currentTheme, currentSorting, snackbarMessage } = this.state;
    const sortingContextProviderValue = {
      currentSorting,
      changeSorting: this.changeSorting,
    };
    const themeContextProviderValue = {
      currentTheme,
      changeTheme: this.changeTheme,
    };
    const snackbarContextProviderValue = {
      isSnackbarVisible: !!snackbarMessage,
      showSnackbar: this.showSnackbar,
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
          <SnackbarContext.Provider value={snackbarContextProviderValue}>
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

            <StyledSnackbar
              theme={this.state.currentTheme}
              snackbarMessage={this.state.snackbarMessage}
              onDismissSnackbar={this.hideSnackbar}
            />
          </SnackbarContext.Provider>
        </ThemeContext.Provider>
      </SortingContext.Provider>
    );
  }
}

// TODO: additional config for iOS:
//  https://reactnavigation.org/docs/getting-started

export default App;
