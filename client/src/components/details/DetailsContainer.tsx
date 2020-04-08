import React, { Component } from 'react';
import DetailsComponent from './DetailsComponent';

interface Props {
    navigation
}

interface State {
    isModalVisible,
    dateTime,
}

class DetailsContainer extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      dateTime: new Date(),
    };
  }

  onIconClick = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  onCancelClick = () => {
    this.setState({isModalVisible: false});
  };

  handleConfirm = (value, mode) => {
      this.setState({isModalVisible: false});
      this.setState({dateTime: value})
  };

  render() {
    return (
      <DetailsComponent
          isModalVisible={this.state.isModalVisible}
          dateTime={this.state.dateTime}
          onIconClick={this.onIconClick}
          onCancelClick={this.onCancelClick}
          handleConfirm={this.handleConfirm}
      />
    );
  }
}

export default DetailsContainer;
