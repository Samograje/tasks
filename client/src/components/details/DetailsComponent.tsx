import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface Props {

}

const DetailsComponent = (props: Props) => {
  const {

  } = props;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Task details</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DetailsComponent;

