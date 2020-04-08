import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { timeConverter, dateConverter } from '../../utils/dateTimeConverter';

interface Props {
    isModalVisible,
    onIconClick,
    onCancelClick,
    handleConfirm,
    dateTime,
}

const DetailsComponent = (props: Props) => {
  const {
      isModalVisible,
      onIconClick,
      onCancelClick,
      handleConfirm,
      dateTime
  } = props;

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
            style={styles.textInput}
            mode='outlined'
            label='Title'
        />
        <TextInput
            style={styles.textInput}
            mode='outlined'
            label='Description'
            multiline={true}
        />
      </View>
      <TextInput
          disabled={true}
          label='End date'
          mode='outlined'
          style={styles.textInput}
          value={`${dateConverter(dateTime)} ${timeConverter(dateTime)}`}
      />
      <View style={styles.row}>
          <TouchableOpacity onPress={onIconClick}>
              <MaterialCommunityIcons
                  size={36}
                  name={'calendar'}
                  color={'#000000'}
              />
          </TouchableOpacity>
          <TouchableOpacity onPress={onIconClick}>
              <MaterialCommunityIcons
                  size={36}
                  name={'timer'}
                  color={'#000000'}
              />
          </TouchableOpacity>
      </View>
      <DateTimePickerModal
          date={dateTime}
          isVisible={isModalVisible}
          mode={'datetime'}
          onConfirm={(data) => handleConfirm(data)}
          onCancel={onCancelClick}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    margin: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailsComponent;

