import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
// @ts-ignore
import Swipeable from 'react-native-swipeable-row';
import {colors, fonts, padding, margin, lightTheme} from "../../styles/common";
import {useTheme} from "@react-navigation/native";

interface Props {
  _id: number,
  title: string,
  inProgress: boolean,
  onEdit: (taskId: number) => {},
  onDelete: (taskId: number) => any,
  changeProgress: (taskId: number, inProgress: boolean) => any,
}

const ListElement = (props: Props) => {
  const {
    _id,
    title,
    inProgress,
    onEdit,
    onDelete,
    changeProgress,
  } = props;

  const theme = useTheme();

  const leftContent = [
    <View style={styles.leftSwipeContainer} key={_id}>
      <Text style={styles.leftSwipeItemText}>Delete</Text>
    </View>
  ];

  const listElement = (
    <View style={[styles.rowContainer, theme == lightTheme ? {backgroundColor: colors.white} : {backgroundColor: colors.blackLighter}]}>
      <IconButton
          theme={theme}
          color={theme.colors.primary}
          icon={inProgress ? "circle-outline" : "check"}
          size={30}
          onPress={() => {
            changeProgress(_id, inProgress)
          }}
      />

      <TouchableOpacity style={styles.content}
                        onPress={() => {
                          onEdit(_id)
                        }}
      >
        <Text theme={theme} style={!inProgress ? styles.crossOver : styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    inProgress ? (
      listElement
    ) : (
      <Swipeable leftContent={leftContent}
                 leftActionActivationDistance={200}
                 onLeftActionComplete={() => onDelete(_id)}
      >
        {listElement}
      </Swipeable>
    )
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    height: 50,
    marginBottom: margin.vsm,
    alignItems: 'center',
  },
  content: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  crossOver: {
    textDecorationLine: 'line-through',
    fontSize: fonts.md,
  },
  text: {
    fontSize: fonts.md,
  },
  leftSwipeContainer: {
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: colors.callCancelColor,
    borderRadius: 25,
  },
  leftSwipeItemText: {
    paddingRight: padding.md,
    fontSize: fonts.md,
    fontWeight: '900',
  },
});

export default ListElement;
