import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#003644',
      }}>
      <ActivityIndicator size="large" color="white" />
      <Text
        style={{
          fontSize: 18,
          marginTop: 10,
          color: 'white',
          textAlign: 'center',
        }}>
        Loading...
      </Text>
    </View>
  );
};

export default Loading;
