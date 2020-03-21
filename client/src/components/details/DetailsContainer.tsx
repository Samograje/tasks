import React, { Component } from 'react';
import DetailsComponent from './DetailsComponent';

interface Props {

}

interface State {

}

class DetailsContainer extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <DetailsComponent />
    );
  }
}

export default DetailsContainer;
