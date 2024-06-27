import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Contact = () => {
  const openEmailLink = () => {
    Linking.openURL(`mailto:contact@www.wordbank.org.uk`);
  };
  return (
    <View className='flex-1'  style={{ backgroundColor: "#003644" }}>
      <View style={{marginTop: 30}}>
        <Text className='text-center text-white font-extrabold text-xl'>Contact Us</Text>
        <Text className='ml-3 my-2 text-white text-xl'>please email us at:</Text>
        <TouchableOpacity onPress={openEmailLink}>
          <Text className='ml-3 text-white text-xl'>info@citex.org.uk</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Contact;

