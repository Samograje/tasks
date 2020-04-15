import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {padding} from "../../styles/common";

interface Props {
  themeMode: 'light' | 'dark',
}

const SettingsComponent = (props: Props) => {
  const {

  } = props;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Settings</Text>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SettingsComponent;

