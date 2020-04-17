import React, {Component} from 'react';
import SettingsComponent from "./SettingsComponent";

interface Props {

}

interface State {

}

class SettingsContainer extends Component<Props, State> {
  render() {
    return (
      <SettingsComponent
        themeMode="dark"
      />
    );
  }
}

export default SettingsContainer;
