import React from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { Theme } from '@react-navigation/native/src/types';

const styles = StyleSheet.create({
  snackbar: {
    position: 'absolute',
    bottom: 0,
  },
});

interface Props {
  theme: Theme,
  snackbarMessage: string | null;
  onDismissSnackbar: () => void;
}

const StyledSnackbar = (props: Props) => (
  <Snackbar
    theme={props.theme}
    style={[styles.snackbar, { backgroundColor: props.theme.colors.card }]}
    duration={2000}
    visible={!!props.snackbarMessage}
    onDismiss={props.onDismissSnackbar}
  >
    {props.snackbarMessage}
  </Snackbar>
);

export default StyledSnackbar;
