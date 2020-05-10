import React from 'react';
import SettingsComponent from './SettingsComponent';
import { SortingContext, SortingContextInterface, ThemeContext, ThemeContextInterface } from '../../utils/context';

const SettingsContainer = (_: any) => (
  <SortingContext.Consumer>
    {(sorting: SortingContextInterface) => (
      <ThemeContext.Consumer>
        {(theme: ThemeContextInterface) => (
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
