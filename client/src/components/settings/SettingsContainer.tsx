import React from 'react';
import SettingsComponent from './SettingsComponent';
import { SortingContext, ThemeContext } from '../../../App';

interface Props {
}

const SettingsContainer = (_: Props) => (
  <SortingContext.Consumer>
    {sorting => (
      <ThemeContext.Consumer>
        {theme => (
          <SettingsComponent
            currentSorting={sorting.currentSorting}
            currentTheme={theme.currentTheme}
            changeSorting={sorting.changeSorting}
            changeTheme={theme.changeTheme}
          />
        )}
      </ThemeContext.Consumer>
    )}
  </SortingContext.Consumer>
);

export default SettingsContainer;
