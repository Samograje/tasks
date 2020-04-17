import {Dimensions} from 'react-native'

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}

export const colors = {
  primary: '#3F51B5',
  secondary: '#283593',
  tertiary: '#9FA8DA',
  tintColor: '#E8EAF6',
  callCancelColor: '#F44336',
}

export const padding = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40
}

export const fonts = {
  sm: 12,
  md: 18,
  lg: 28,
  primary: 'Roboto'
}
