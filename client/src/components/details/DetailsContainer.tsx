import React, { Component } from 'react';
import DetailsComponent from './DetailsComponent';

interface Props {

}

interface State {
    modalMode,
    isModalVisible,
}

class DetailsContainer extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      modalMode: '',
      isModalVisible: false,
    };
  }

  onIconClick = (mode) => {
    this.setState({
      modalMode: mode,
      isModalVisible: true,
    });
  };

  onCancelClick = () => {
    this.setState({isModalVisible: false});
  };

  render() {
    return (
      <DetailsComponent
          modalMode={this.state.modalMode}
          isModalVisible={this.state.isModalVisible}
          onIconClick={this.onIconClick}
          onCancelClick={this.onCancelClick}
      />
    );
  }
}

export default DetailsContainer;
