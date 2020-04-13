import React, {Component} from 'react';
import ListComponent from './ListComponent';
import {View, Text, TouchableOpacity,} from 'react-native';
import DeviceInfo from 'react-native-device-info';

//import DeviceInfo which will help to get UniqueId

interface Props {
    navigation: {
        goBack: () => {},
        navigate: (screenName: string, params?: object) => {},
    },
}

interface State {
    tasks: {
        id: number,
        title: string,
        description: string,
    }[],
    deviceId: string,
}

class ListContainer extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            deviceId: '',
        };
    }

    onCreate = () => this.props.navigation.navigate('Details', {mode: 'create'});

    onEdit = (id: number) => this.props.navigation.navigate('Details', {
        id,
        mode: 'edit'
    });

    onSettings = () => this.props.navigation.navigate('Settings');

    getdeviceId = () => {
        //Getting the Unique Id from here
        var id = DeviceInfo.getUniqueId();
        this.setState({deviceId: id,});
    };

    render() {
        return (
            <View>
                <Text style={{textAlign: 'center', fontSize: 20, marginBottom: 10}}>
                    {this.state.deviceId}
                </Text>
                <TouchableOpacity
                    onPress={this.getdeviceId}
                    activeOpacity={0.5}
                >
                    <Text>DEVICE ID</Text>
                </TouchableOpacity>
                <ListComponent
                    onCreate={this.onCreate}
                    onEdit={this.onEdit}
                    onSettings={this.onSettings}
                />
            </View>
        );
    }
}

export default ListContainer;
