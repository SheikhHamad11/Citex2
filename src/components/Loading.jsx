import React from 'react';
import {View, Text} from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#003644',
        opacity: 0.9,
      }}>
      <View style={{marginBottom: 80}}>
        <UIActivityIndicator color="white" size={40} />
      </View>
      <View
        style={{
          position: 'absolute',
          // alignSelf: 'center',
        }}>
        <Text
          style={{
            fontSize: 18,
            color: 'white',
            textAlign: 'center',
          }}>
          Loading...
        </Text>
      </View>
    </View>
  );
};

export default Loading;
