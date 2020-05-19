import React from 'react';
import { ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { Theme } from '@react-navigation/native/src/types';
import { RadioButton, Text } from 'react-native-paper';
import SectionHeader from '../ui/SectionHeader';
import { colors } from '../../styles/common';

interface Props {
  currentSorting: string,
  currentTheme: Theme,
  changeSorting: (newValue: string) => void,
  changeTheme: () => void,
}

const SettingsComponent = (props: Props) => {
  const {
    currentSorting,
    currentTheme,
    changeSorting,
    changeTheme,
  } = props;

  const cardStyle = currentTheme.dark ? styles.cardDark : styles.cardLight;

  const themeModeSelection = (
    <View style={[styles.themeModeSelection, cardStyle]}>
      <Text theme={currentTheme} style={styles.labelThemeMode}>Dark mode</Text>
      <Switch
        trackColor={{ false: 'null', true: colors.primaryDark }}
        thumbColor={currentTheme.dark ? currentTheme.colors.primary : colors.white}
        ios_backgroundColor={currentTheme.colors.primary}
        value={currentTheme.dark}
        onValueChange={changeTheme}
      />
    </View>
  );

  const radioOptions = [
    {
      label: 'Title',
      value: 'title',
    },
    {
      label: 'Date created',
      value: 'creationDate',
    },
    {
      label: 'Deadline date',
      value: 'deadlineDate',
    },
    {
      label: 'Priority',
      value: 'priority',
    },
  ];

  const sortDirectionSelection = (
    <View style={[styles.sortDirectionSelection, cardStyle]}>
      <RadioButton.Group
        onValueChange={changeSorting}
        value={currentSorting}
      >
        {radioOptions.map(({ label, value }, key) => (
          <TouchableOpacity
            onPress={() => changeSorting(value)}
            style={styles.radioButtonWithLabel}
            key={key}
          >
            <Text theme={currentTheme} style={styles.radioOptionText}>{label}</Text>
            <RadioButton value={value} color={currentTheme.colors.primary} />
          </TouchableOpacity>
        ))}
      </RadioButton.Group>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.section}>
          <SectionHeader text="COLOR THEME" />
          {themeModeSelection}
        </View>
        <View style={styles.section}>
          <SectionHeader text="SORT TASKS BY" />
          {sortDirectionSelection}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardLight: {
    backgroundColor: colors.white,
  },
  cardDark: {
    backgroundColor: colors.blackLighter,
  },
  section: {
    marginTop: 5,
    marginBottom: 10,
  },
  themeModeSelection: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 15,
  },
  labelThemeMode: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 16,
  },
  sortDirectionSelection: {
    flex: 1,
  },
  radioButtonWithLabel: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 2,
  },
  radioOptionText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 16,
  },
});

export default SettingsComponent;

