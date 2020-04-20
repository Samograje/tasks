import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface SectionHeaderProps {
  text: string,
}

const SectionHeader = (props: SectionHeaderProps) => {
  return (
    <Text style={styles.selectionHeader}>{props.text}</Text>
  );
};

const styles = StyleSheet.create({
  selectionHeader: {
    margin: 5,
    marginLeft: 15,
  },
});

export default SectionHeader;
