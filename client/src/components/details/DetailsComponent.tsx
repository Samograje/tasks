import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, TextInput, Text, RadioButton} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {timeConverter, dateConverter} from '../../utils/dateTimeConverter';

interface Props {
    isModalVisible,
    onIconClick,
    onCancelClick,
    onRadioButtonClick,
    handleConfirm,
    isLoading,
    task,
    navigation,
    saveTask,
}

const DetailsComponent = (props: Props) => {
    const {
        isModalVisible,
        onIconClick,
        onCancelClick,
        onRadioButtonClick,
        handleConfirm,
        task,
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
                            value={task.title}
                            label='Title'
                        />
                        <TextInput
                            style={styles.textInput}
                            mode='outlined'
                            value={task.details}
                            label='Details'
                            multiline={true}
                        />
                    </View>
                    <TextInput
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
                                name={'calendar'}
                                color={'#000000'}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => console.warn('Clear date')}>
                            <MaterialCommunityIcons
                                size={36}
                                name={'close-outline'}
                                color={'#000000'}
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
                                <Text>Low</Text>
                                <RadioButton value="low"/>
                            </View>
                            <View style={styles.radioButtonLabel}>
                                <Text>Normal</Text>
                                <RadioButton value="normal"/>
                            </View>
                            <View style={styles.radioButtonLabel}>
                                <Text>High</Text>
                                <RadioButton value="high"/>
                            </View>
                        </RadioButton.Group>
                    </View>
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
});

export default DetailsComponent;

