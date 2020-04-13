import React, { Component } from 'react';
import ListComponent from './ListComponent';

interface Props {
  navigation: {
    goBack: () => {},
    navigate: (screenName: string, params?: object) => {},
  },
}

interface State {
  tasks:{
    toDo:{
      _id: number,
      title: string,
      inProgress: boolean,
    }[],
    done:{
      _id: number,
      title: string,
      inProgress: boolean,
    }[]
  },
  isLoading,
}

class ListContainer extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      tasks: {
        toDo: [],
        done: [],
      },
      isLoading: false,
    };
  }

  //#region Navigation
  onCreate = () => this.props.navigation.navigate('Details', { mode: 'create' });

  onEdit = (_id: number) => this.props.navigation.navigate('Details', {
    _id,
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

  onDelete = (_id: number) => {
    fetch(`http://192.168.1.105:5000/api/devices/ProszeMiPoRazKolejnyTegoNieUsuwac/tasks/${_id}`, ({
      method: 'DELETE',
    }))
        .then((response) => {
          if(response.status === 200){
            let allDoneTasks = [...this.state.tasks.done];
            let filteredDoneTasks = allDoneTasks.filter(function(value){return value._id != _id});
            this.setState({ tasks: { ...this.state.tasks, done: filteredDoneTasks} });
          } else {
            console.log("NIE UDAŁO SIĘ USUNĄĆ ZADADANIA");
          }
        })
        .catch((error) => {
          console.log(error);
        })
  };

  changeProgress = (_id: number, inProgress: boolean) => {
    fetch(`http://192.168.1.105:5000/api/devices/ProszeMiPoRazKolejnyTegoNieUsuwac/tasks/${_id}/finished`, ({
      method: 'PATCH',
      body: JSON.stringify({inProgress: !inProgress}),
      headers:{
        "Content-type": "application/json"
      }
    }))
        .then((response) => {
          if(response.status === 200){
            this.changeStatusStatus200Logic(_id, inProgress);
            console.log("ZAKTUALIZOWALO SIE");
          } else {
            console.log("NIE UDAŁO SIĘ ZAKTUALIZOWA STATUSU");
          }
        })
        .catch((error) => {
          console.log(error);
        })
  };
  //#endregion

  //#region Other
  componentDidMount(): void {
    this.loadTasks();
  }

  changeStatusStatus200Logic = (_id: number, inProgress) => {
    let tasksToDo = [...this.state.tasks.toDo];
    let tasksDone = [...this.state.tasks.done];
    let newTasksToDo = []; let newTasksDone = [];
    if(inProgress){ //To_do -> Done
      tasksToDo.forEach(function(item){
        if(item._id != _id){
          newTasksToDo.push(item);
        } else{
          item.inProgress = !inProgress;
          tasksDone.unshift(item);
        }
      });
      this.setState({ tasks: { ...this.state.tasks, toDo: newTasksToDo, done: tasksDone}});
    } else{ //Done -> to_do
      tasksDone.forEach(function(item){
        if(item._id != _id){
          newTasksDone.push(item);
        } else{
          item.inProgress = !inProgress;
          tasksToDo.unshift(item);
        }
      });
      this.setState({ tasks: { ...this.state.tasks, toDo: tasksToDo, done: newTasksDone}});
    }

  };

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
    this.setState({ tasks: { ...this.state.tasks, toDo: tasksToDo} });
    this.setState({ tasks: { ...this.state.tasks, done: tasksDone} });
  };

  //#endregion

  render() {
    const{
      tasks,
      isLoading,
    } = this.state;

    return (
      <ListComponent
        onCreate={this.onCreate}
        onEdit={this.onEdit}
        onSettings={this.onSettings}
        onDelete={this.onDelete}
        navigation={this.props.navigation}
        tasks={tasks}
        isLoading={isLoading}
        changeProgress={this.changeProgress}
      />
    );
  }
}

export default ListContainer;
