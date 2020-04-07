import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
    modalMode,
    isModalVisible,
    onIconClick,
    onCancelClick,
    handleConfirm,
    date,
    time,
}

const DetailsComponent = (props: Props) => {
  const {
      modalMode,
      isModalVisible,
      onIconClick,
      onCancelClick,
      handleConfirm,
      date,
      time,
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
      <TextInput disabled={true} label='End date' mode='outlined' style={styles.textInput} value={`${date} ${time}`}/>
      <View style={styles.row}>
          <TouchableOpacity onPress={()=>onIconClick('date')}>
              <MaterialCommunityIcons
                  size={36}
                  name={'calendar'}
                  color={'#000000'}
              />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>onIconClick('time')}>
              <MaterialCommunityIcons
                  size={36}
                  name={'timer'}
                  color={'#000000'}
              />
          </TouchableOpacity>
      </View>
      <DateTimePickerModal
          isVisible={isModalVisible}
          mode={modalMode}
          onConfirm={(data) => handleConfirm(data, modalMode)}
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

