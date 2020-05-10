import React from 'react';
import { Theme } from '@react-navigation/native/src/types';
import { lightTheme } from '../styles/common';

interface ThemeContextInterface {
  currentTheme: Theme;
  changeTheme: () => void;
}

interface SortingContextInterface {
  currentSorting: string;
  changeSorting: (newSorting: string) => void;
}

const ThemeContext: React.Context<ThemeContextInterface> = React.createContext({
  currentTheme: lightTheme,
  changeTheme: () => {
  },
});

const SortingContext: React.Context<SortingContextInterface> = React.createContext({
  currentSorting: 'creationDate',
  changeSorting: (_: string) => {
  },
});

export {
  ThemeContextInterface,
  SortingContextInterface,
  ThemeContext,
  SortingContext,
};
