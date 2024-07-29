import {View, Text} from 'react-native';
import React from 'react';

export const OptionsList = ({data, viewRefs, index, droppedSymbols}) => {
  const symbolValue = droppedSymbols[index];

  return data == '' ? (
    <View ref={viewRefs.current[index]}>
      <Text
        style={{
          color: 'white',
          lineHeight: 30,
          marginHorizontal: 10,
        }}>
        <View
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: 2,
            minWidth: 50,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              textAlign: 'center',
              paddingTop: 10,
            }}>
            {/* {symbolValue &&
            index === droppedSymbols.findIndex(item => item === symbolValue)
              ? symbolValue
              : ''} */}
            {droppedSymbols[index] || ''}
          </Text>
        </View>
      </Text>
    </View>
  ) : (
    <Text
      style={{
        color: 'white',
        textAlign: 'center',
        lineHeight: 20,
        fontSize: 16,
      }}>
      {data}
    </Text>
  );
};
