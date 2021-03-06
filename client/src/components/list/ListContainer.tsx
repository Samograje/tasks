import React, { Component } from 'react';
import ListComponent from './ListComponent';
import { urlTasks } from '../../utils/APIClient';
import { SortingContext } from '../../utils/context';

interface Props {
  navigation: {
    goBack: () => {},
    navigate: (screenName: string, params?: object) => {},
  },
}

interface TaskListItem  {
    _id: number;
    title: string;
    inProgress: boolean;
    priority: 'low' | 'normal' | 'high';
}

interface State {
  tasks: {
    toDo: TaskListItem[];
    done: TaskListItem[];
  },
  isLoading: boolean,
  snackbar: {
    isVisible: boolean,
    message: string,
  },
  isRefreshing: boolean,
  isDatabaseConnection: boolean,
}

class ListContainer extends Component<Props, State> {
  static contextType = SortingContext;

  constructor(props: Props) {
    super(props);
    this.state = {
      tasks: {
        toDo: [],
        done: [],
      },
      isLoading: false,
      snackbar: {
        isVisible: false,
        message: '',
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

  showSnackbar = (text: string) => {
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

  separateTasksAndSetState = (response: TaskListItem[]) => {
    const tasksToDo: TaskListItem[] = [];
    const tasksDone: TaskListItem[] = [];

    response.forEach((item: TaskListItem) => {
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
        // TODO: nie trzeba tutaj sprawdzać statusu - gdyby to nie był 200, to by to poszło w blok catch
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

  changeStatusLogic = (_id: number, inProgress: boolean) => {
    let tasksToDo = [...this.state.tasks.toDo];
    let tasksDone = [...this.state.tasks.done];
    if (inProgress) { //To_do -> Done
      let newTasksToDo: TaskListItem[] = [];
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
      let newTasksDone: TaskListItem[] = [];
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

  compareFunction = (a: TaskListItem, b: TaskListItem): number => {
    const sortBy = this.context.currentSorting;
    if (sortBy === 'priority') {
      return this.compareFunctionByPriority(a, b);
    }

    // @ts-ignore
    if (a[sortBy] < b[sortBy]) {
      return -1;
    }
    // @ts-ignore
    if (a[sortBy] > b[sortBy]) {
      return 1;
    }
    return 0;
  };

  compareFunctionByPriority = (a: TaskListItem, b: TaskListItem): number => {
    const weights = {
      low: 2,
      normal: 1,
      high: 0,
    };
    if (weights[a.priority] < weights[b.priority]) {
      return -1;
    }
    if (weights[a.priority] > weights[b.priority]) {
      return 1;
    }
    return 0;
  }

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

    tasks.toDo.sort(this.compareFunction);
    tasks.done.sort(this.compareFunction);

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
