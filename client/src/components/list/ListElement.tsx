import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconButton} from 'react-native-paper';

interface Props {
  _id,
  title,
  inProgress,
    onEdit,
    changeProgress,
}

const ListElement = (props: Props) => {
  const {
    _id,
    title,
    inProgress,
    onEdit,
    changeProgress,
  } = props;

  return(
      <View style={styles.rowContainer}>
        <IconButton
            icon={inProgress ? "circle-outline" : "check"}
            size={30}
            onPress={() => {changeProgress(_id, inProgress)}}
        />

        <TouchableOpacity style={styles.content}
                          onPress={() => {onEdit(_id)}}
        >
            <Text style={[!inProgress ? styles.crossOver : styles.text]}>{title}</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
    rowContainer:{
        flexDirection: 'row',
        height: 50,
        marginBottom: 5,
        alignItems: 'center',
    },
    content:{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
    },
    crossOver:{
        textDecorationLine: 'line-through',
    },
    text:{

    }
});

export default ListElement;
