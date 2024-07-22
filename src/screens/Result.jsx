import {View, Text, TouchableOpacity, BackHandler} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import CustomCircularProgress from '../components/ProgressBar';
export default function Result({route}) {
  const navigation = useNavigation();
  const {correctAnswers, totalQuestions} = route.params;

  const totalScore = Object.values(correctAnswers).filter(
    answer => answer,
  ).length;
  const percentage = (totalScore / totalQuestions) * 100;
  const formattedPercentage = percentage.toFixed(1);

  useEffect(() => {
    // Disable the hardware back button
    const backAction = () => {
      return true; // This will prevent the default behavior (going back)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View className="flex-1 pb-5 bg-[#003644]">
      <View className="items-center my-8">
        <CustomCircularProgress
          size={250}
          strokeWidth={20}
          percentage={formattedPercentage}
          color="#00e0ff"
          backgroundColor="#3d5875"
        />
      </View>

      <Text className="text-center text-white text-3xl font-[900] my-4">
        Score
      </Text>
      <View className="flex flex-row justify-between mx-10 my-4">
        <Items totalQuestions={totalQuestions} text="Total" />
        <View className="border border-gray-500 "></View>
        <Items totalQuestions={totalScore} text="Correct" />
        <View className="border border-gray-500 "></View>
        <Items totalQuestions={totalQuestions - totalScore} text="Wrong" />
      </View>
      <View className="flex flex-row justify-center px-3 my-5 w-[100%]">
        <TouchableOpacity
          className="bg-orange-400  p-2 w-40  rounded-md mr-4"
          onPress={() => navigation.navigate('Welcome')}>
          <Text className="text-black text-center font-bold text-base">
            RESTART
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-500 p-2 w-40   rounded-md"
          onPress={() => navigation.navigate('ShareResults')}>
          <Text className="text-white text-center text-base font-bold">
            EMAIL TO TUTOR
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Items = ({totalQuestions, text}) => {
  return (
    <View>
      <Text className="text-yellow-400 font-[900]  text-4xl text-center tracking-widest">
        {totalQuestions}
      </Text>
      <Text className="text-xl font-[900] text-center  text-white tracking-widest">
        {text}
      </Text>
      <Text className=" text-white text-center tracking-widest">Questions</Text>
    </View>
  );
};
