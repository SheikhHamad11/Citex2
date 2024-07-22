import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React from 'react';

export default function ShareResults() {
  return (
    <View className="flex-1" style={{backgroundColor: '#003644'}}>
      <Text className="text-center text-white text-xl font-extrabold my-4">
        Share Results with your Tutor
      </Text>

      <View>
        <Text className=" text-white text-lg font-extrabold ml-10 my-2">
          Student Name
        </Text>
        <TextInput className="border border-white mx-10 rounded-md p-3 text-white" />
      </View>

      <View>
        <Text className=" text-white text-lg font-extrabold ml-10 my-2">
          Tutor's email
        </Text>
        <TextInput className="border border-white mx-10 rounded-md p-3 text-white" />
      </View>
      <View>
        <Text className=" text-white text-lg font-extrabold ml-10 my-2">
          Comments
        </Text>
        <View className="h-40 border border-white mx-10 rounded-md">
          <TextInput className="p-3  text-white" />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => Alert.alert('Success', 'Send Successfully')}
        className="bg-orange-400 p-2 h-10 rounded-md my-6 mx-10">
        <Text className="text-white text-center font-bold text-base">Send</Text>
      </TouchableOpacity>
    </View>
  );
}
