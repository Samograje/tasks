import React, {Component} from 'react';
import DetailsComponent from './DetailsComponent';

interface Props {
    navigation
}

interface State {
    isModalVisible,
    deadlineDate,
    mode,
    isLoading,
    title,
    description,
    error,
}

class DetailsContainer extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            mode: 'create',
            isModalVisible: false,
            deadlineDate: new Date(),
            title: '',
            description: '',
            error: false,
        };
    }

    componentDidMount(): void {
        if (this.state.mode === 'edit') {
            this.loadTask();
        }
    }

    loadTask = () => {
        this.setState({
            isLoading: true,
        });
        fetch(`/api/devices/kamil'sDeviceId/tasks/1`)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    title: response.title,
                    description: response.details,
                    deadlineDate: response.deadlineDate,
                    isLoading: false,
                });
            })
            .catch(() => {
                this.setState({
                    isLoading: false,
                    error: true,
                });
            });
    };

    onIconClick = () => {
        this.setState({
            isModalVisible: true,
        });
    };

    onCancelClick = () => {
        this.setState({isModalVisible: false});
    };

    handleConfirm = (value) => {
        this.setState({isModalVisible: false, deadlineDate: value});
    };

    render() {
        return (
            <DetailsComponent
                isModalVisible={this.state.isModalVisible}
                dateTime={this.state.deadlineDate}
                isLoading={this.state.isLoading}
                title={this.state.title}
                description={this.state.description}
                onIconClick={this.onIconClick}
                onCancelClick={this.onCancelClick}
                handleConfirm={this.handleConfirm}
            />
        );
    }
}

export default DetailsContainer;
