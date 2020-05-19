import React, { Component } from 'react';
import DetailsComponent from './DetailsComponent';
import { urlTasks } from '../../utils/APIClient';
import { SnackbarContext } from '../../utils/context';

interface Props {
  navigation: any,
  route: any,
  showSnackbar: (message: string) => void;
}

interface State {
  isLoading: boolean,
  isModalVisible: boolean,
  isSnackbarVisible: boolean,
  isSubmitting: boolean,
  snackbarText: string,
  task: {
    title: string,
    details: string,
    inProgress: boolean,
    priority: string,
    deadlineDate: Date | null,
  },
}

class DetailsContainer extends Component<Props, State> {
  static contextType = SnackbarContext;

  constructor(props: Props) {
    super(props);
    this.state = {
      task: {
        title: '',
        details: '',
        inProgress: true,
        priority: 'low',
        deadlineDate: null,
      },
      isLoading: false,
      isModalVisible: false,
      isSnackbarVisible: false,
      isSubmitting: false,
      snackbarText: '',
    };
  }

  componentDidMount(): void {
    const {mode} = this.props.route.params;

    if (mode === 'edit') {
      this.loadTask();
    }
  }

  loadTask = () => {
    const {_id} = this.props.route.params;

    this.setState({
      isLoading: true,
    });
    fetch(`${urlTasks}${_id}`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          task: {
            title: response.title,
            details: response.details ? response.details : '',
            inProgress: response.inProgress,
            priority: response.priority,
            deadlineDate: response.deadlineDate && new Date(Date.parse(response.deadlineDate)),
          }
        });
      })
      .catch((error) => {
        this.context.showSnackbar('Error while fetching task.');
      })
      .finally(() => this.setState({
        isLoading: false,
      }));
  };

  isTaskValid = () => {
    if(!!this.state.task.title) return true;
    this.context.showSnackbar('Title cannot be empty!');
    return false;
  };

  saveTask = () => {
    if(!this.isTaskValid()) return;

    const {_id, mode} = this.props.route.params;

    let url: string = urlTasks;
    let method: string = 'POST';

    if (mode === 'edit') {
      url = `${urlTasks}${_id}`;
      method = 'PATCH';
    }

    this.setState({
      isSubmitting: true,
    });
    fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.task),
    })
      .then((response: any) => {
        if(response) {
          this.context.showSnackbar('Saved task!');
          this.props.navigation.goBack();
        } else {
          this.context.showSnackbar('Error while saving task');
          this.setState({
            isSubmitting: false,
          });
        }
      })
      .catch((error: Error) => {
        this.setState({
          isSubmitting: false,
        });
        this.context.showSnackbar('Something went wrong.');
      });
  };

  onIconClick = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  onClearIconClick = () => {
    this.setState({
      task: {...this.state.task, deadlineDate: null}
    });
  };

  onRadioButtonClick = (value: string) => {
    this.setState({
      task: {...this.state.task, priority: value}
    });
  };

  onCancelClick = () => {
    this.setState({
      isModalVisible: false
    });
  };

  handleConfirm = (value: Date) => {
    this.setState({
      isModalVisible: false,
      task: {...this.state.task, deadlineDate: value}
    });
  };

  onTitleChange = (value: string) => {
    this.setState({task: {...this.state.task, title: value}});
  };

  onDetailsChange = (value: string) => {
    this.setState({
      task: {...this.state.task, details: value}
    });
  };

  render() {
    return (
      <DetailsComponent
        handleConfirm={this.handleConfirm}
        isLoading={this.state.isLoading}
        isModalVisible={this.state.isModalVisible}
        isSubmitting={this.state.isSubmitting}
        onCancelClick={this.onCancelClick}
        onClearIconClick={this.onClearIconClick}
        onDetailsChange={this.onDetailsChange}
        onIconClick={this.onIconClick}
        onRadioButtonClick={this.onRadioButtonClick}
        onTitleChange={this.onTitleChange}
        navigation={this.props.navigation}
        saveTask={this.saveTask}
        task={this.state.task}
      />
    );
  }
}

export default DetailsContainer;
