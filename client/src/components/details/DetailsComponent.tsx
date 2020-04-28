import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, TextInput, Text, RadioButton, Snackbar} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {timeConverter, dateConverter} from '../../utils/dateTimeConverter';
import {colors, fonts} from "../../styles/common";
import {useTheme} from "@react-navigation/native";

interface Props {
  handleConfirm: (data: Date) => void,
  isLoading: boolean,
  isModalVisible: boolean,
  isSnackbarVisible: boolean,
  isSubmitting: boolean,
  onCancelClick: () => void,
  onClearIconClick: () => void,
  onDetailsChange: (text: string) => void,
  onDismissSnackbar: () => void,
  onIconClick: () => void,
  onRadioButtonClick: (value: string) => void,
  onTitleChange: (text: string) => void,
  navigation,
  saveTask: () => void,
  snackbarText: string,
  task: {
    title: string,
    details: string,
    inProgress: boolean,
    priority: string,
    deadlineDate: Date,
  },
}

const DetailsComponent = (props: Props) => {
  const {
    handleConfirm,
    isLoading,
    isModalVisible,
    isSnackbarVisible,
    isSubmitting,
    onCancelClick,
    onClearIconClick,
    onDetailsChange,
    onDismissSnackbar,
    onIconClick,
    onRadioButtonClick,
    onTitleChange,
    navigation,
    saveTask,
    snackbarText,
    task,
  } = props;

  const theme = useTheme();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          disabled={isSubmitting || isLoading}
          style={styles.saveButtonContainer}
          onPress={saveTask}
        >
          <Text style={styles.saveButton}>SAVE</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    !isLoading ? (
        <>
          <ScrollView>
            <View style={styles.container}>
              <TextInput
                theme={theme}
                onChangeText={onTitleChange}
                style={styles.textInput}
                mode='outlined'
                value={task.title}
                label='Title'
              />
              <TextInput
                theme={theme}
                onChangeText={onDetailsChange}
                style={styles.textInput}
                mode='outlined'
                value={task.details}
                label='Details'
                multiline={true}
              />
            </View>
            <TextInput
              theme={theme}
              disabled={true}
              label='Deadline date'
              mode='outlined'
              style={styles.textInput}
              value={task.deadlineDate ? `${dateConverter(task.deadlineDate)} ${timeConverter(task.deadlineDate)}` : 'Choose below'}
            />
            <View style={styles.row}>
              <TouchableOpacity onPress={onIconClick}>
                <MaterialCommunityIcons
                  size={36}
                  name={'timetable'}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={onClearIconClick}>
                <MaterialCommunityIcons
                  size={36}
                  name={'close-box-outline'}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
            </View>
            <DateTimePickerModal
              date={task.deadlineDate ? task.deadlineDate : new Date()}
              isVisible={isModalVisible}
              mode={'datetime'}
              onConfirm={(data) => handleConfirm(data)}
              onCancel={onCancelClick}
            />

            <View style={styles.radioButtonsContainer}>
              <RadioButton.Group
                onValueChange={onRadioButtonClick}
                value={task.priority}
              >
                <View style={styles.radioButtonLabel}>
                  <Text theme={theme}>Low</Text>
                  <RadioButton theme={theme} color={theme.colors.primary} value="low"/>
                </View>
                <View style={styles.radioButtonLabel}>
                  <Text theme={theme}>Normal</Text>
                  <RadioButton theme={theme} color={theme.colors.primary} value="normal"/>
                </View>
                <View style={styles.radioButtonLabel}>
                  <Text theme={theme}>High</Text>
                  <RadioButton theme={theme} color={theme.colors.primary} value="high"/>
                </View>
              </RadioButton.Group>
            </View>

          </ScrollView>
          <Snackbar
              theme={theme}
            style={styles.snackbar}
            visible={isSnackbarVisible}
            onDismiss={onDismissSnackbar}
          >
            {snackbarText}
          </Snackbar>
        </>
      ) :
      <ActivityIndicator theme={theme} size='large' style={styles.activityIndicator}/>
  )
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  radioButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  radioButtonLabel: {
    alignContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    color: colors.white,
  },
  saveButtonContainer: {
    margin: 20,
  },
  snackbar: {
    position: 'absolute',
    bottom: 0,
  },
  textInput: {
    margin: 10,
  },
});

export default DetailsComponent;

