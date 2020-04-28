import React, {Component} from 'react';
import ListComponent from './ListComponent';
import { urlTasks } from '../../utils/APIClient';

interface Props {
  navigation: {
    goBack: () => {},
    navigate: (screenName: string, params?: object) => {},
  },
}

interface State {
  tasks: {
    toDo: {
      _id: number,
      title: string,
      inProgress: boolean,
    }[],
    done: {
      _id: number,
      title: string,
      inProgress: boolean,
    }[]
  },
  isLoading,
  snackbar: {
    isVisible,
    message,
  },
  isRefreshing: boolean,
  isDatabaseConnection: boolean,
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
      snackbar: {
        isVisible: false,
        message: "",
      },
      isRefreshing: false,
      isDatabaseConnection: false,
    };
  }

  componentDidMount(): void {
    this.loadTasks();
  }

  onCreate = () => this.props.navigation.navigate('Details', {mode: 'create'});

  onEdit = (_id: number) => this.props.navigation.navigate('Details', {
    _id,
    mode: 'edit'
  });

  setRefreshing = () => {
    this.setState({isRefreshing: true}, () => {this.loadTasks()});
  };

  onSettings = () => this.props.navigation.navigate('Settings');

  showSnackbar = (text) => {
    this.setState({
      snackbar: {...this.state.snackbar, isVisible: true, message: text}
    });
  };

  onDismissSnackbar = () => this.setState({
    snackbar: {...this.state.snackbar, isVisible: false, message: ""}
  });



  loadTasks = () => {
    if(!this.state.isRefreshing){
      this.setState({
        isLoading: true,
      });
    }
    fetch(urlTasks)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.separateTasksAndSetState(response);
      })
      .catch((error) => {
        console.log(error);
        this.showSnackbar('Error while fetching tasks.');
        this.setState({isDatabaseConnection: false})
      })
      .finally(() => this.setState({
        isLoading: false,
      }));
  };

  separateTasksAndSetState = (response) => {
    const tasksToDo = [];
    const tasksDone = [];

    response.forEach((item) => {
      if (item.inProgress) {
        tasksToDo.push(item);
      } else {
        tasksDone.push(item);
      }
    });
    this.setState({
      tasks: {...this.state.tasks, toDo: tasksToDo, done: tasksDone},
      isRefreshing: false,
      isDatabaseConnection: true,
    });
  };

  onDelete = (_id: number) => {
    fetch(`${urlTasks}${_id}`, ({
      method: 'DELETE',
    }))
      .then((response) => {
        if (response.status === 200) {
          let tasksDone = [...this.state.tasks.done];
          let newTasksDone = tasksDone.filter((value) => {
            return value._id != _id
          });
          this.showSnackbar('Task deleted.');
          this.setState({tasks: {...this.state.tasks, done: newTasksDone}});
        } else {
          this.showSnackbar('Error while deleting task.');
        }
      })
      .catch((error) => {
        console.log(error);
        this.showSnackbar('Error while deleting task.');
      })
  };

  changeProgress = (_id: number, inProgress: boolean) => {
    fetch(`${urlTasks}${_id}/finished`, ({
      method: 'PATCH',
      body: JSON.stringify({inProgress: !inProgress}),
      headers: {
        "Content-type": "application/json"
      }
    }))
      .then((response) => {
        if (response.status === 200) {
          this.changeStatusLogic(_id, inProgress);
        } else {
          this.showSnackbar('Error while changing status.');
        }
      })
      .catch((error) => {
        console.log(error);
        this.showSnackbar('Error while changing status.');
      })
  };

  changeStatusLogic = (_id: number, inProgress) => {
    let tasksToDo = [...this.state.tasks.toDo];
    let tasksDone = [...this.state.tasks.done];
    if (inProgress) { //To_do -> Done
      let newTasksToDo = [];
      tasksToDo.forEach(function (item) {
        if (item._id != _id) {
          newTasksToDo.push(item);
        } else {
          item.inProgress = !inProgress;
          tasksDone.unshift(item);
        }
      });
      this.setState({tasks: {...this.state.tasks, toDo: newTasksToDo, done: tasksDone}});
    } else { //Done -> to_do
      let newTasksDone = [];
      tasksDone.forEach((item) => {
        if (item._id != _id) {
          newTasksDone.push(item);
        } else {
          item.inProgress = !inProgress;
          tasksToDo.push(item);
        }
      });
      this.setState({tasks: {...this.state.tasks, toDo: tasksToDo, done: newTasksDone}});
    }
  };


  render() {
    const {
      onCreate,
      onEdit,
      onSettings,
      onDelete,
      onDismissSnackbar,
      changeProgress,
      setRefreshing,
      loadTasks,
    } = this;

    const {
      tasks,
      isLoading,
      snackbar,
      isRefreshing,
      isDatabaseConnection,
    } = this.state;

    const {
      navigation
    } = this.props;

    return (
      <ListComponent
        onCreate={onCreate}
        onEdit={onEdit}
        onSettings={onSettings}
        onDelete={onDelete}
        changeProgress={changeProgress}
        onDismissSnackbar={onDismissSnackbar}
        loadTasks={loadTasks}
        setRefreshing={setRefreshing}
        navigation={navigation}
        tasks={tasks}
        isLoading={isLoading}
        snackbar={snackbar}
        isRefreshing={isRefreshing}
        isDatabaseConnection={isDatabaseConnection}
        isToDoEmpty={tasks.toDo.length <= 0}
        isDoneEmpty={tasks.done.length <= 0}
      />
    );
  }
}

export default ListContainer;
