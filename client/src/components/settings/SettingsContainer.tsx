import React from 'react';
import SettingsComponent from './SettingsComponent';

interface Props {
  isDarkThemeEnabled: boolean,
  changeTheme: () => {},
}

// TODO: component cannot keep a state due to the changeTheme() method being passed in an unconventional way in App.tsx.
//  Then, if the onChangeSortOrder would be passed by props, the SettingsContainer is useless and may be removed
const SettingsContainer = (props: Props) => {
  const onChangeSortOrder = (newValue: 'title' | 'creationDate' | 'deadlineDate' | 'category' | 'priority') => {
    // TODO: change sort order
  };

  return (
    <SettingsComponent
      isDarkThemeEnabled={props.isDarkThemeEnabled}
      sortBy="title"
      changeSortOrder={onChangeSortOrder}
      changeTheme={props.changeTheme}
    />
  );
};

export default SettingsContainer;
