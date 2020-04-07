import React, { Component } from 'react';
import DetailsComponent from './DetailsComponent';
import { timeConverter, dateConverter } from '../../utils/dateTimeConverter';

interface Props {
    navigation
}

interface State {
    modalMode,
    isModalVisible,
    date,
    time,
}

class DetailsContainer extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      modalMode: '',
      isModalVisible: false,
      date: '01/01/2020',
      time: '00:00:00',
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

  handleConfirm = (value, mode) => {
      this.setState({isModalVisible: false});
      if(mode === 'date'){
          console.log("A date has been picked: ",dateConverter(value));
          this.setState({date: dateConverter(value)});
      } else if(mode === 'time'){
          console.log("A time has been picked: ",timeConverter(value));
          this.setState({time: timeConverter(value)});
      }
  };

  render() {
    return (
      <DetailsComponent
          modalMode={this.state.modalMode}
          isModalVisible={this.state.isModalVisible}
          date={this.state.date}
          time={this.state.time}
          onIconClick={this.onIconClick}
          onCancelClick={this.onCancelClick}
          handleConfirm={this.handleConfirm}
      />
    );
  }
}

export default DetailsContainer;
