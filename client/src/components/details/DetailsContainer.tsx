import React, { Component } from 'react';
import DetailsComponent from './DetailsComponent';

interface Props {
  navigation: {
    goBack: () => {},
  },
}

interface State {

}

class DetailsContainer extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onGoBack = () => this.props.navigation.goBack();

  render() {
    return (
      <DetailsComponent
        onReject={this.onGoBack}
      />
    );
  }
}

export default DetailsContainer;
