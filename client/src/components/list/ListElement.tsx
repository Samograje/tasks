import React from 'react';
import {Button, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { RadioButton } from 'react-native-paper';

interface Props {
  id,
  title,
  inProgress,
    onEdit,
}

const ListElement = (props: Props) => {
  const {
    id,
    title,
    inProgress,
    onEdit,
  } = props;

  return(
      <View style={styles.rowContainer}>
        <RadioButton
            value="first"
            onPress={() => { console.log("Dodaje zadanie do zakończonych")}}
        />
        <TouchableOpacity style={styles.content}
                          onPress={() => {onEdit(id)}}>
            <Text style={{width: '100%'}}>{title}</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
    rowContainer:{
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        height: 50,
        marginBottom: 5,
        alignItems: 'center',
    },
    content:{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        // backgroundColor: 'red',
    }
});

export default ListElement;
