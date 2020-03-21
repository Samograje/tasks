import React from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

interface Props {
  onCreate: () => {},
  onEdit: (taskId: number) => {},
  onSettings: () => {},
}

const ListComponent = (props: Props) => {
  const {
    onCreate,
    onEdit,
    onSettings,
  } = props;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Tasks list</Text>
        <Button
          title="Create task"
          onPress={onCreate}
        />
        <Button
          title="Edit task with id = 5"
          onPress={() => onEdit(5)}
        />
        <Button
          title="Go to settings"
          onPress={onSettings}
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

export default ListComponent;

