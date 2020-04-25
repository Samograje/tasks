import React from 'react';
import {FlatList, RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {ActivityIndicator, FAB, IconButton, List, Snackbar, Text} from 'react-native-paper';
import ListElement from './ListElement';
import {colors, fonts, margin, padding} from "../../styles/common";
import {useTheme} from "@react-navigation/native";

interface Props {
  onCreate: () => {},
  onEdit: (taskId: number) => {},
  onSettings: () => {},
  onDelete: (taskId: number) => any,
  onDismissSnackbar,
  loadTasks: any,
  changeProgress: (taskId: number, inProgress: boolean) => any,
  navigation,
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
  isLoading,
  snackbar: {
    isVisible: false,
    message: "",
  }
  isRefreshing: boolean,
  setRefreshing: any,
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
  } = props;

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
              <Text style={[styles.toDoText, {color: theme.colors.primary}]}>To do</Text>
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
                {tasks.done.length > 0 &&
                (
                  <List.Section>
                    <List.Accordion
                      title={`Done (${tasks.done.length})`}
                      theme={theme}
                      titleStyle={{fontSize: fonts.md}}
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
            <Snackbar theme={theme}
                      style={styles.snackbar}
                      visible={snackbar.isVisible}
                      onDismiss={onDismissSnackbar}
            >
              {snackbar.message}
            </Snackbar>
            <View style={styles.fixedView}>
              <FAB theme={theme}
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

