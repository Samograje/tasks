import React from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

interface Props {
  onReject: () => {},
}

const DetailsComponent = (props: Props) => {
  const {
    onReject,
  } = props;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Task details</Text>
        <Button
          title="Reject"
          onPress={onReject}
        />
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

