import { Dimensions } from 'react-native';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Theme } from '@react-navigation/native/src/types'

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
};

export const colors = {
  primary: '#3F51B5',
  primaryDark: '#283593',
  tertiary: '#9FA8DA',
  tintColor: '#E8EAF6',
  callCancelColor: '#F44336',
  white: '#FFFFFF',
  blackLighter: '#1E1E1E',
  blackDeep: '#000000',
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
  },
};

export const darkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    card: colors.blackLighter,
  },
};
