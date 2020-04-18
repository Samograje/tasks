import React, {Component} from 'react';
import SettingsComponent from "./SettingsComponent";

interface Props {

}

class SettingsContainer extends Component<Props> {
  onChangeSortOrder(newValue: 'title' | 'creationDate' | 'deadlineDate' | 'category' | 'priority') {
    // TODO: change sort order
  }

  onEnableDarkMode() {
    // TODO: enable / diasble dark mode
  }

  render() {
    return (
      <SettingsComponent
        idDarkModeEnabled={false}
        sortBy="title"
        changeSortOrder={this.onChangeSortOrder}
        enableDarkMode={this.onEnableDarkMode}
      />
    );
  }
}

export default SettingsContainer;
