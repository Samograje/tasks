import React from 'react';
import {FlatList, Text, ScrollView, StyleSheet, TouchableHighlight, View} from 'react-native';
import {IconButton, List, FAB, ActivityIndicator} from 'react-native-paper';
import ListElement from './ListElement';
import Swipeable from 'react-native-swipeable-row';


interface Props {
  onCreate: () => {},
  onEdit: (taskId: number) => {},
  onSettings: () => {},
  onDelete: (taskId: number) => any,
  navigation,
  tasks:{
    toDo:{
      _id: number,
      title: string,
      inProgress: boolean,
    }[],
    done:{
      _id: number,
      title: string,
      inProgress: boolean,
    }[]
  },
  isLoading,
}


const ListComponent = (props: Props) => {
  const {
    onCreate,
    onEdit,
    onSettings,
    onDelete,
    navigation,
    tasks,
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

  const leftContent = [
      <View style={styles.leftSwipeContener}>
        <Text style={styles.leftSwipeItemText}>Delete</Text>
      </View>
  ];

  return (
    isLoading ? ( <ActivityIndicator size='large' style={styles.activityIndicator}/>) :
    (
      <View style={styles.rootView}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <FlatList
              data={tasks.toDo}
              renderItem={({ item }) => (
                <ListElement _id={item._id}
                             title={item.title}
                             inProgress={item.inProgress}
                             onEdit={() => onEdit(5)}
                />
                )}
            />
            {tasks.done.length > 0 &&
            (
              <List.Section>
                <List.Accordion
                    title={`Done (${tasks.done.length})`}
                >
                  <FlatList
                    data={tasks.done}
                    renderItem={({ item}) => (
                      <Swipeable leftContent={leftContent}
                                 leftActionActivationDistance={200}
                                 onLeftActionComplete={() => onDelete(item._id)}
                      >
                        <ListElement _id={item._id}
                                     title={item.title}
                                     inProgress={item.inProgress}
                                     onEdit={() => onEdit(item._id)}
                        />
                      </Swipeable>
                      )}
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
  leftSwipeContener: {
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#ff3232',
  },
  leftSwipeItemText:{
    paddingRight: 20,
  }
});

export default ListComponent;

