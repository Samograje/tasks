import React from 'react';
import {FlatList, Text, ScrollView, StyleSheet, View, SafeAreaView} from 'react-native';
import {IconButton, List, FAB, ActivityIndicator, Snackbar} from 'react-native-paper';
import ListElement from './ListElement';

interface Props {
  onCreate: () => {},
  onEdit: (taskId: number) => {},
  onSettings: () => {},
  onDelete: (taskId: number) => any,
  onDismissSnackbar,
  changeProgress: (taskId: number, inProgress: boolean) => any,
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
  snackbar:{
    isViable: false,
    message: "",
  }
}


const ListComponent = (props: Props) => {
  const {
    onCreate,
    onEdit,
    onSettings,
    onDelete,
    onDismissSnackbar,
    changeProgress,
    navigation,
    tasks,
    isLoading,
    snackbar,
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
              data={tasks.toDo}
              renderItem={({ item, index}) => (
                <ListElement _id={item._id}
                             title={item.title}
                             inProgress={item.inProgress}
                             onEdit={() => onEdit(item._id)}
                             onDelete={() => onDelete(item._id)}
                             changeProgress={() => changeProgress(item._id, item.inProgress)}
                />
                )}
              keyExtractor={(item, index) => index.toString()}
            />
            {tasks.done.length > 0 &&
            (
              <List.Section>
                <List.Accordion
                    title={`Done (${tasks.done.length})`}
                >
                  <FlatList
                    data={tasks.done}
                    refreshing={true}
                    renderItem={({ item, index}) => (
                        <ListElement _id={item._id}
                                     title={item.title}
                                     inProgress={item.inProgress}
                                     onEdit={() => onEdit(item._id)}
                                     changeProgress={() => changeProgress(item._id, item.inProgress)}
                                     onDelete={() => onDelete(item._id)}
                        />
                      )}
                    keyExtractor={(item, index) => index.toString()}
                    />
                </List.Accordion>
              </List.Section>
            )}
          </View>
        </ScrollView>
        <Snackbar
            style={styles.snackbar}
            visible={snackbar.isViable}
            onDismiss={onDismissSnackbar}
        >
          {snackbar.message}
        </Snackbar>
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
  snackbar: {
    position: 'absolute',
    bottom: 0,
  },
});

export default ListComponent;

