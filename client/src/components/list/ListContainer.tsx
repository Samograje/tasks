import React, { Component } from 'react';
import ListComponent from './ListComponent';

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
}

class ListContainer extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  onCreate = () => this.props.navigation.navigate('Details', { mode: 'create' });

  onEdit = (id: number) => this.props.navigation.navigate('Details', {
    id,
    mode: 'edit'
  });

  onSettings = () => this.props.navigation.navigate('Settings');

  render() {
    return (
      <ListComponent
        onCreate={this.onCreate}
        onEdit={this.onEdit}
        onSettings={this.onSettings}
      />
    );
  }
}

export default ListContainer;
