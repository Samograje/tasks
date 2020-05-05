import React from 'react';
import {FlatList, GestureResponderEvent, RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {ActivityIndicator, FAB, IconButton, List, Snackbar, Text} from 'react-native-paper';
import ListElement from './ListElement';
import {colors, fonts, margin, padding} from "../../styles/common";
import {useTheme} from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";

interface Props {
  onCreate: () => {},
  onEdit: (taskId: number) => {},
  onSettings: () => void,
  onDelete: (taskId: number) => void,
  onDismissSnackbar: () => void,
  loadTasks: () => void,
  changeProgress: (taskId: number, inProgress: boolean) => any,
  navigation: any,
  tasks: {
    toDo: {
      _id: number,
      title: string,
      inProgress: boolean,
    }[],
    done: {
      _id: number,
      title: string,
      inProgress: boolean,
    }[]
  },
  isLoading: boolean,
  snackbar: {
    isVisible: boolean,
    message: string,
  }
  isRefreshing: boolean,
  setRefreshing: () => void,
  isDatabaseConnection: boolean,
  isToDoEmpty: boolean,
  isDoneEmpty: boolean,
}

const ListComponent = (props: Props) => {
  const {
    onCreate,
    onEdit,
    onSettings,
    onDelete,
    onDismissSnackbar,
    loadTasks,
    changeProgress,
    navigation,
    tasks,
    isLoading,
    snackbar,
    isRefreshing,
    setRefreshing,
    isDatabaseConnection,
    isToDoEmpty,
    isDoneEmpty,
  } = props;

  let isInternetConnection = false;

  const theme = useTheme();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="settings-outline"
          size={30}
          onPress={onSettings}
          style={styles.settingsBtn}
          color={colors.tintColor}
        />
      ),
    });
  }, [navigation]);

  React.useEffect(() => {
    return navigation.addListener('focus', () => {
      loadTasks();
    });
  }, [navigation]);

  const unsubscribe = NetInfo.addEventListener(state => {
    isInternetConnection = state.isConnected;
  });
  unsubscribe();

  const externalConnections = isInternetConnection && isDatabaseConnection;
  const tasksEmpty = isToDoEmpty && isDoneEmpty;
  const headerMessage = (
      <>
        {!isInternetConnection && (<Text style={[styles.toDoText, {color: theme.colors.primary, alignSelf: 'center'}]}>Internet connection failed.</Text>)}
        {!isDatabaseConnection && <Text style={[styles.toDoText, {color: theme.colors.primary, alignSelf: 'center'}]}>Database connection failed.</Text>}
        {(tasksEmpty && externalConnections) && <Text style={[styles.toDoText, {color: theme.colors.primary, alignSelf: 'center'}]}>Your tasks list is empty!</Text>}
        {(!isToDoEmpty && externalConnections) && (<Text style={[styles.toDoText, {color: theme.colors.primary}]}>To do </Text>)}
      </>
  );

  return (
    isLoading ? (
      <ActivityIndicator theme={theme}
                         size='large'
                         style={styles.activityIndicator}
      />
                ) :
      (
        <View style={[styles.rootView, {backgroundColor: theme.colors.background}]}>
          <ScrollView style={styles.scrollView}
                      refreshControl={
                        <RefreshControl refreshing={isRefreshing}
                                        onRefresh={setRefreshing}
                        />
                      }
          >
            <View style={styles.container}>
              {headerMessage}
              {(externalConnections)&& (
                <FlatList
                  data={tasks.toDo}
                  renderItem={({item, index}) => (
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
              )}
              {(!isDoneEmpty && externalConnections) && (
                <List.Section>
                  <List.Accordion
                  title={`Done (${tasks.done.length})`}
                  theme={theme}
                  titleStyle={{fontSize: fonts.md, color: theme.colors.primary}}
                  >
                  <FlatList
                  data={tasks.done}
                  refreshing={true}
                  renderItem={({item, index}) => (
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
            <View style={styles.fixedView}>
              {(externalConnections) && (
                <FAB theme={theme}
                     style={[styles.fab, {backgroundColor: theme.colors.primary}]}
                     icon="plus"
                     onPress={onCreate}
                />
              )}
            </View>
          <Snackbar theme={theme}
                    style={styles.snackbar}
                    visible={snackbar.isVisible}
                    onDismiss={onDismissSnackbar}
          >
            {snackbar.message}
          </Snackbar>
          </View>
      )
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  scrollView: {},
  toDoText:{
    fontSize: fonts.md,
    padding: padding.sm,
  },
  container: {
    flex: 1,
    paddingTop: padding.sm,
  },
  settingsBtn: {
    marginRight: margin.sm,
  },
  fab: {
    zIndex: 200
  },
  fixedView: {
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

