import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';

export default function Result() {
  const navigation = useNavigation();
  return (
    <View className="flex-1" style={{backgroundColor: '#003644'}}>
      <View className="items-center my-8">
        <Progress.Circle
          size={250}
          thickness={15}
          color="white"
          progress={1}
          showsText={true}
        />
      </View>

      <Text className="text-center text-white text-2xl font-extrabold my-4">
        Score
      </Text>
      <View className="flex flex-row justify-between mx-10 my-4">
        <View>
          <Text className="text-yellow-400 font-extrabold  text-4xl text-center">
            12
          </Text>
          <Text className="text-xl font-extrabold text-center  text-white">
            Total
          </Text>
          <Text className=" text-white text-center">Questions</Text>
        </View>
        <View className="border border-gray-500 "></View>
        <View>
          <Text className="text-yellow-400 font-extrabold  text-4xl text-center">
            0
          </Text>
          <Text className="text-xl font-extrabold   text-white text-center">
            Correct
          </Text>
          <Text className=" text-white text-center">Questions</Text>
        </View>
        <View className="border border-gray-500 "></View>
        <View className="">
          <Text className="text-yellow-400 font-extrabold  text-4xl text-center">
            12
          </Text>
          <Text className="text-xl font-extrabold   text-white text-center">
            Wrong
          </Text>
          <Text className=" text-white text-center">Questions</Text>
        </View>
      </View>
      <View className="flex flex-row justify-center my-5">
        <TouchableOpacity
          className="bg-orange-400 w-40 p-2 h-10 rounded-md mr-4"
          onPress={() => navigation.navigate('Welcome')}>
          <Text className="text-white text-center font-bold text-base">
            Restart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-500 p-2 w-40 h-10 rounded-md"
          onPress={() => navigation.navigate('ShareResults')}>
          <Text className="text-white text-center text-base font-bold">
            Email to Tutor
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
