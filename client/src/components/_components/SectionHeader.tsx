import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { fonts, margin } from "../../styles/common";
import { useTheme } from "@react-navigation/native";

interface SectionHeaderProps {
  text: string,
}

const SectionHeader = (props: SectionHeaderProps) => {
  const theme = useTheme();
  return (
    <Text theme={theme} style={styles.selectionHeader}>{props.text}</Text>
  );
};

const styles = StyleSheet.create({
  selectionHeader: {
    margin: margin.md,
    fontFamily: fonts.primary,
    fontSize: fonts.md,
  },
});

export default SectionHeader;
