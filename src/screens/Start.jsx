import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {quizes} from '../components/Quiz';
import QuestionItem from './components/QuestionItem';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BModal from '../components/BModal';

export default function Start() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState(quizes);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="flex-1 bg-[#003644] pb-10">
      <View className="mb-5">
        <View className="flex flex-row justify-center items-center mx-2 mt-5">
          <Text className="mt-2 ml-4  font-[900]  text-xl text-white ">
            Question Number {'' + (currentIndex + 1) + ' / ' + quizes?.length}
          </Text>
        </View>

        <QuestionItem
          data={quizes[currentIndex]}
          index={currentIndex}
          setCurrentIndex={setCurrentIndex}
          totalQuestions={quizes.length}
        />
      </View>
      <TouchableOpacity
        className="bg-sky-600 rounded-full p-3 w-12 absolute bottom-10 right-5 justify-center items-center"
        onPress={() => setModalVisible(true)}>
        <Icon name="lightbulb" color="yellow" size={25} />
      </TouchableOpacity>

      <BModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
}
