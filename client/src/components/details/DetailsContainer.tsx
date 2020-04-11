import React, {Component} from 'react';
import DetailsComponent from './DetailsComponent';

interface Props {
    navigation,
    mode,
    taskId,
}

interface State {
    isLoading,
    isModalVisible,
    isSnackbarVisible,
    isSubmitting,
    snackbarText,
    task,
}

class DetailsContainer extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            task: {
                title: '',
                details: '',
                inProgress: true,
                priority: '',
                deadlineDate: '',
            },
            isLoading: false,
            isModalVisible: false,
            isSnackbarVisible: false,
            isSubmitting: false,
            snackbarText: '',
        };
    }

    componentDidMount(): void {
        // if (this.props.mode === 'edit') {
        this.loadTask();
        // }
    }

    loadTask = () => {
        this.setState({
            isLoading: true,
        });
        fetch(`http://172.31.44.202:5000/api/devices/bartek'sDeviceId/tasks/5e90c2c0dd65763ac422b6fe`)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    task: {
                        title: response.title,
                        details: response.details ? response.details : '',
                        inProgress: response.inProgress,
                        priority: response.priority,
                        deadlineDate: response.deadlineDate ? response.deadlineDate : '',
                    }
                });
            })
            .catch((error) => {
                console.log(error);
                this.showSnackbar('Error while fetching task.');
            })
            .finally(() => this.setState({
                isLoading: false,
            }));
    };

    saveTask = () => {
        const {taskId, mode} = this.props;

        let url;
        let method;
        // if (mode === 'create') {
        //     url = `http://172.31.44.202:5000/api/devices/bartek'sDeviceId/tasks`;
        //     method = 'POST';
        // }
        // if (mode === 'edit') {
        //     url = `http://172.31.44.202:5000/api//devices/bartek'sDeviceId/tasks/5e8cb38707b58336ec63f4b8`;
        //     method = 'PATCH';
        // }

        this.setState({
            isSubmitting: true,
        });
        fetch(`http://172.31.44.202:5000/api/devices/bartek'sDeviceId/tasks/5e90c2c0dd65763ac422b6fe`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.task),
        })
            .then((response) => {
                console.log(response);
                response ?
                    this.showSnackbar('Saved task!') :
                    this.showSnackbar('Error while saving task');
            })
            .catch((error) => {
                this.showSnackbar('Something went wrong.');
            }).finally(() => {
            this.setState({
                isSubmitting: false,
            });
        });
    };

    showSnackbar = (text) => {
        this.setState({
            snackbarText: text,
            isSnackbarVisible: true,
        });
    };

    onDismissSnackbar = () => {
        this.setState({
            isSnackbarVisible: false,
        });
    };

    onIconClick = () => {
        this.setState({
            isModalVisible: true,
        });
    };

    onClearIconClick = () => {
        this.setState({
            task: {...this.state.task, deadlineDate: ''}
        });
    };

    onRadioButtonClick = (value) => {
        this.setState({
            task: {...this.state.task, priority: value}
        });
    };

    onCancelClick = () => {
        this.setState({
            isModalVisible: false
        });
    };

    handleConfirm = (value) => {
        this.setState({
            isModalVisible: false,
            task: {...this.state.task, deadlineDate: value}
        });
    };

    onTitleChange = (value) => {
        this.setState({task: {...this.state.task, title: value}});
    };

    onDetailsChange = (value) => {
        this.setState({
            task: {...this.state.task, details: value}
        });
    };

    render() {
        return (
            <DetailsComponent
                isModalVisible={this.state.isModalVisible}
                task={this.state.task}
                isLoading={this.state.isLoading}
                isSubmitting={this.state.isSubmitting}
                onIconClick={this.onIconClick}
                onCancelClick={this.onCancelClick}
                onTitleChange={this.onTitleChange}
                onDetailsChange={this.onDetailsChange}
                onRadioButtonClick={this.onRadioButtonClick}
                onClearIconClick={this.onClearIconClick}
                handleConfirm={this.handleConfirm}
                navigation={this.props.navigation}
                saveTask={this.saveTask}
                onDismissSnackbar={this.onDismissSnackbar}
                isSnackbarVisible={this.state.isSnackbarVisible}
                snackbarText={this.state.snackbarText}
            />
        );
    }
}

export default DetailsContainer;
