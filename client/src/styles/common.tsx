import { Dimensions } from 'react-native';
import { DarkTheme, DefaultTheme } from 'react-native-paper';
import { Theme } from '@react-navigation/native/src/types'

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
};

export const colors = {
  primary: '#3F51B5',
  primaryLight: '#757de8',
  primaryDark: '#283593',
  tertiary: '#9FA8DA',
  tintColor: '#E8EAF6',
  callCancelColor: '#F44336',
  white: '#FFFFFF',
  whiteSmoke: '#F0F0F0',
  blackLighter: '#1E1E1E',
  blackDeep: '#000000',
  gray: '#767577',
};

export const padding = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
};

export const margin = {
  vsm: 5,
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
};

export const fonts = {
  sm: 12,
  md: 18,
  lg: 28,
  primary: 'Roboto',
};

export const lightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    card: colors.primary,
    background: colors.whiteSmoke,
    border: '#FFF',
  },
};

//TODO: card w lightTheme do ustalenia oraz border do ustalenia

export const darkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primaryLight,
    card: colors.blackLighter,
    background: colors.blackDeep,
    border: '#FFF',
  },
};
