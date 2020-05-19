import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, TextInput, Text, RadioButton, Snackbar} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {timeConverter, dateConverter} from '../../utils/dateTimeConverter';
import {colors, fonts, margin, padding} from "../../styles/common";
import {useTheme} from "@react-navigation/native";
import SectionHeader from "../ui/SectionHeader";

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
  navigation: any,
  saveTask: () => void,
  snackbarText: string,
  task: {
    title: string,
    details: string,
    inProgress: boolean,
    priority: string,
    deadlineDate: Date | null,
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

  const radioOptions = [
    {
      label: 'Low',
      value: 'low',
    },
    {
      label: 'Normal',
      value: 'normal',
    },
    {
      label: 'High',
      value: 'high',
    },
  ];

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
  }, [navigation, isSubmitting, isLoading]);

  const prioritySelection = (
      <View style={styles.container}>
        <RadioButton.Group
            onValueChange={onRadioButtonClick}
            value={task.priority}
        >
          {radioOptions.map(({ label, value }, key) => (
              <TouchableOpacity
                onPress={() => onRadioButtonClick(value)}
                style={styles.radioButtonWithLabel}
                key={key}
              >
                <Text theme={theme} style={styles.radioOptionText}>{label}</Text>
                <RadioButton theme={theme} value={value} color={colors.primary}/>
              </TouchableOpacity>
          ))}
        </RadioButton.Group>
      </View>
  );

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
                  size={48}
                  name={'timetable'}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={onClearIconClick}>
                <MaterialCommunityIcons
                  size={48}
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

            <View style={styles.section}>
              <SectionHeader text="Choose priority"/>
              {prioritySelection}
            </View>

          </ScrollView>
          <Snackbar
            theme={theme}
            style={[styles.snackbar, {backgroundColor: theme.colors.card}]}
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
  radioButtonWithLabel: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    paddingLeft: padding.md,
    paddingRight: padding.md,
    marginBottom: 2,
  },
  radioOptionText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: fonts.md,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 10,
  },
  saveButton: {
    color: colors.white,
  },
  saveButtonContainer: {
    marginRight: margin.md,
  },
  section: {
    marginTop: margin.vsm,
    marginBottom: margin.sm,
  },
  snackbar: {
    position: 'absolute',
    bottom: 0,
  },
  textInput: {
    margin: margin.sm,
    fontSize: fonts.md,
  },
});

export default DetailsComponent;

