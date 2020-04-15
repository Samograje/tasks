import {StyleSheet, Dimensions} from 'react-native'

//TODO: import this style common.js to our components
//import {colors, fonts, padding, dimensions} from '../../styles/common.tsx'
// a potem używać np tak: padding.sm

export const dimensions = {
    fullHeight: Dimensions.get('window').height,
    fullWidth: Dimensions.get('window').width
}

export const colors = {
    primary: '#3F51B5',
    secondary: '#283593',
    tertiary: '#9FA8DA'
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
