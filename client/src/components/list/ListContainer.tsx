import React, { Component } from 'react';
import ListComponent from './ListComponent';

interface Props {
  navigation: {
    goBack: () => {},
    navigate: (screenName: string, params?: object) => {},
  },
}

interface State {
  tasksToDo: {
      id: number,
      title: string,
      inProgress: boolean,
    }[],
  tasksDone: {
    id: number,
    title: string,
    inProgress: boolean,
  }[],
  isLoading,
}

class ListContainer extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      tasksToDo: [],
      tasksDone: [],
      isLoading: false,
    };
  }

  //#region Navigation
  onCreate = () => this.props.navigation.navigate('Details', { mode: 'create' });

  onEdit = (id: number) => this.props.navigation.navigate('Details', {
    id,
    mode: 'edit'
  });

  onSettings = () => this.props.navigation.navigate('Settings');

  //#endregion

  //#region Fetching Data
  loadTasks = () => {
    this.setState({
      isLoading: true,
    });
    fetch(`http://192.168.1.105:5000/api/devices/ProszeMiPoRazKolejnyTegoNieUsuwac/tasks/`)
        .then((response) => response.json())
        .then((response) => {
          this.separateTasksAndSetState(response);
        })
        .catch((error) => {
          console.log(error);
          // this.showSnackbar('Error while fetching task.');
        })
        .finally(() => this.setState({
          isLoading: false,
        }));
  };
  //#endregion

  //Other
  componentDidMount(): void {
    this.loadTasks();
  }

  separateTasksAndSetState = (response) => {
    const tasksToDo = [];
    const tasksDone = [];

    response.forEach(function(item){
      if(item.inProgress){
        tasksToDo.push(item);
      } else{
        tasksDone.push(item);
      }
    });

    this.setState({
      tasksToDo: tasksToDo,
      tasksDone: tasksDone
    });
  };

  render() {
    const{
      tasksToDo,
      tasksDone,
      isLoading,
    } = this.state;

    return (
      <ListComponent
        onCreate={this.onCreate}
        onEdit={this.onEdit}
        onSettings={this.onSettings}
        navigation={this.props.navigation}
        tasksToDo={tasksToDo}
        tasksDone={tasksDone}
        isLoading={isLoading}
      />
    );
  }
}

export default ListContainer;
