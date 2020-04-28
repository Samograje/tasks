import React from 'react';
import { ScrollView, StyleSheet, Switch, View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import SectionHeader from '../_components/SectionHeader';
import { colors, fonts } from '../../styles/common';

interface Props {
  changeTheme: () => void,
  sortBy: 'title' | 'creationDate' | 'deadlineDate' | 'category' | 'priority',
  changeSortOrder: (newValue: 'title' | 'creationDate' | 'deadlineDate' | 'category' | 'priority') => void,
}

const SettingsComponent = (props: Props) => {
  const {
    changeTheme,
    sortBy,
    changeSortOrder,
  } = props;

  const currentTheme = useTheme();
  const cardStyle = currentTheme.dark ? styles.cardDark : styles.cardLight;

  const themeModeSelection = (
    <View style={[styles.themeModeSelection, cardStyle]}>
      <Text theme={currentTheme} style={styles.labelThemeMode}>Dark mode</Text>
      <Switch
        // TODO: ios_backgroundColor={}

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
        onValueChange={changeSortOrder}
        value={sortBy}
      >
        {radioOptions.map(({ label, value }, key) => (
          <View style={styles.radioButtonWithLabel} key={key}>
            <Text theme={currentTheme} style={styles.radioOptionText}>{label}</Text>
            <RadioButton value={value} color={colors.primary}/>
          </View>
        ))}
      </RadioButton.Group>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.section}>
          <SectionHeader text="COLOR THEME"/>
          {themeModeSelection}
        </View>
        <View style={styles.section}>
          <SectionHeader text="SORT TASKS BY"/>
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
    fontFamily: fonts.primary,
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
    fontFamily: fonts.primary,
  },
});

export default SettingsComponent;

