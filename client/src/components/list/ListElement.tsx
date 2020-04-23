import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import Swipeable from 'react-native-swipeable-row';
import {colors, fonts, padding, margin} from "../../styles/common";

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

  const leftContent = [
    <View style={styles.leftSwipeContainer} key={_id}>
      <Text style={styles.leftSwipeItemText}>Delete</Text>
    </View>
  ];

  return (
    inProgress ? (
      <View style={styles.rowContainer}>
        <IconButton
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
          <Text style={!inProgress ? styles.crossOver : styles.text}>{title}</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <Swipeable leftContent={leftContent}
                 leftActionActivationDistance={200}
                 onLeftActionComplete={() => onDelete(_id)}
      >
        <View style={styles.rowContainer}>
          <IconButton
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
            <Text style={!inProgress ? styles.crossOver : styles.text}>{title}</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: colors.white,
  },
  content: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  crossOver: {
    textDecorationLine: 'line-through',
    fontFamily: fonts.primary,
    fontSize: fonts.md,
    color: colors.blackLighter,
  },
  text: {
    fontFamily: fonts.primary,
    fontSize: fonts.md,
    color: colors.blackLighter,
  },
  leftSwipeContainer: {
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: colors.callCancelColor,
    borderRadius: 8,
  },
  leftSwipeItemText: {
    paddingRight: padding.md,
    fontSize: fonts.lg,
    fontWeight: '900',
  },
});

export default ListElement;
