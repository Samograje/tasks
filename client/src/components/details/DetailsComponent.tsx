import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, TextInput, Text} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {timeConverter, dateConverter} from '../../utils/dateTimeConverter';

interface Props {
    isModalVisible,
    onIconClick,
    onCancelClick,
    handleConfirm,
    dateTime,
    isLoading,
    title,
    description,
    navigation,
    saveTask,
}

const DetailsComponent = (props: Props) => {
    const {
        isModalVisible,
        onIconClick,
        onCancelClick,
        handleConfirm,
        dateTime,
        title,
        description,
        isLoading,
        navigation,
        saveTask,
    } = props;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={styles.saveButtonContainer}
                    onPress={saveTask}
                >
                    <Text>SAVE</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        !isLoading ? (
                <ScrollView>
                    <View style={styles.container}>
                        <TextInput
                            style={styles.textInput}
                            mode='outlined'
                            value={title}
                            label='Title'
                        />
                        <TextInput
                            style={styles.textInput}
                            mode='outlined'
                            value={description}
                            label='Description'
                            multiline={true}
                        />
                    </View>
                    <TextInput
                        disabled={true}
                        label='End date'
                        mode='outlined'
                        style={styles.textInput}
                        value={dateTime ? `${dateConverter(dateTime)} ${timeConverter(dateTime)}` : 'Choose a date'}
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
                        date={dateTime ? dateTime : new Date()}
                        isVisible={isModalVisible}
                        mode={'datetime'}
                        onConfirm={(data) => handleConfirm(data)}
                        onCancel={onCancelClick}
                    />
                </ScrollView>
            ) :
            <ActivityIndicator size='large' style={styles.activityIndicator}/>
    )
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
    activityIndicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonContainer: {
      margin: 20,
    },
});

export default DetailsComponent;

