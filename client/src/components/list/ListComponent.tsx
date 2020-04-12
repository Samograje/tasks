import React from 'react';
import {Button, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconButton, List, FAB, ActivityIndicator} from 'react-native-paper';
import ListElement from './ListElement';

interface Props {
  onCreate: () => {},
  onEdit: (taskId: number) => {},
  onSettings: () => {},
  navigation,
  tasksToDo,
  tasksDone
  isLoading,
}

const ListComponent = (props: Props) => {
  const {
    onCreate,
    onEdit,
    onSettings,
    navigation,
    tasksToDo,
    tasksDone,
    isLoading,
  } = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
          <IconButton
              icon="settings-outline"
              size={30}
              onPress={onSettings}
              style={styles.settingsBtn}
          />
          ),
    });
  }, [navigation]);

  return (
    isLoading ? ( <ActivityIndicator size='large' style={styles.activityIndicator}/>) :
    (
      <View style={styles.rootView}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <FlatList
                data={tasksToDo}
                renderItem={({ item }) => (
                    <ListElement id={item._id}
                                 title={item.title}
                                 inProgress={true}
                                 onEdit={onEdit}
                    />
                )}
                keyExtractor={item => item._id}
            />
            {tasksDone.length > 0 &&
            (
              <List.Section>
                <List.Accordion
                    title="Done"
                >
                  <FlatList
                      data={tasksDone}
                      renderItem={({ item }) => (
                          <ListElement id={item._id}
                                       title={item.title}
                                       inProgress={true}
                                       onEdit={onEdit}
                          />
                      )}
                      keyExtractor={item => item._id}
                  />
                </List.Accordion>
              </List.Section>
            )}

          </View>
        </ScrollView>

        <View style={styles.fixedView}>
          <FAB
              style={styles.fab}
              icon="plus"
              onPress={onCreate}
          />
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  rootView:{
    flex: 1,
  },
  scrollView:{

  },
  container: {
    flex: 1,
    paddingTop: 10,
  },
  settingsBtn: {
    marginRight: 10,
  },
  fab: {
    zIndex: 200
  },
  fixedView:{
    position: 'absolute',
    right: 30,
    bottom: 35,
    flexDirection: 'row',
  },
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ListComponent;

