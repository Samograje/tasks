import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, View} from 'react-native';
import SectionHeader from './SectionHeader';
import { RadioButton } from 'react-native-paper';
import { colors } from "../../styles/common";

interface Props {
  idDarkModeEnabled: boolean,
  enableDarkMode: () => void,
  sortBy: 'title' | 'creationDate' | 'deadlineDate' | 'category' | 'priority',
  changeSortOrder: (newValue: 'title' | 'creationDate' | 'deadlineDate' | 'category' | 'priority') => void,
}

const SettingsComponent = (props: Props) => {
  const {
    idDarkModeEnabled,
    enableDarkMode,
    sortBy,
    changeSortOrder,
  } = props;

  const themeModeSelection = (
    <View style={styles.themeModeSelection}>
      <Text style={styles.labelThemeMode}>Dark mode</Text>
      <Switch
        // TODO: ios_backgroundColor={}
        value={idDarkModeEnabled}
        onValueChange={enableDarkMode}
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
    <View style={styles.sortDirectionSelection}>
      <RadioButton.Group
        onValueChange={changeSortOrder}
        value={sortBy}
      >
        {radioOptions.map(({ label, value }, key) => (
          <View style={styles.radioButtonWithLabel} key={key}>
            <Text style={styles.radioOptionText}>{label}</Text>
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
  section: {
    marginTop: 5,
    marginBottom: 10,
  },
  themeModeSelection: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 10,
  },
  labelThemeMode: {
    flex: 1,
    fontSize: 16,
  },
  sortDirectionSelection: {
    flex: 1,
  },
  radioButtonWithLabel: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
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

