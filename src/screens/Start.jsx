import {View, Text, TouchableOpacity, Modal} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {quizes} from '../components/Quiz';
import QuestionItem from './components/QuestionItem';
import {useColorScheme} from 'nativewind';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

export default function Start() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [questions, setQuestions] = useState(quizes);
  const [modalVisible, setModalVisible] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const {colorScheme, toggleColorScheme} = useColorScheme();
  const navigation = useNavigation();
  const listRef = useRef();

  // const handleReset = () => {
  //   setResetTrigger(!resetTrigger); // Toggle reset trigger
  // };

  // useEffect(() => {
  //   // Reset symbols on index change
  //   setResetTrigger(!resetTrigger);
  // }, [currentIndex]);

  const handleReset = () => {
    setResetTrigger(prev => prev + 1); // Increment the counter
  };

  useEffect(() => {
    // Reset symbols on index change
    setResetTrigger(prev => prev + 1);
  }, [currentIndex]);
  return (
    <View className="flex-1 relative bg-[#003644]">
      <View>
        <View className="flex flex-row justify-center items-center mx-2 mt-5">
          <Text className="mt-2 ml-4  font-bold  text-xl text-white ">
            Question Number {'' + currentIndex + ' / ' + quizes?.length}
          </Text>
        </View>

        <View>
          <QuestionItem
            ref={listRef}
            data={quizes[currentIndex]}
            index={currentIndex}
            reset={resetTrigger}
          />
          <View className="flex justify-center flex-row mt-10">
            {currentIndex > 1 && (
              <TouchableOpacity
                onPress={() => {
                  setCurrentIndex(currentIndex - 1);
                }}
                className="mx-2">
                <Text className="text-white text-center text-3xl ">{'<'}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              className="rounded-md  mx-2 bg-[#FD5500]"
              onPress={handleReset}>
              <Text className="mr-2 text-white p-2 rounded-sm items-center justify-center text-center">
                Reset
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-green-500 rounded-md  mx-2">
              <Text className="mr-2  text-white p-2 rounded-sm">Check</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-green-500 rounded-md  mx-2"
              onPress={() => {
                navigation.navigate('Result');
              }}>
              <Text className="mr-2  text-white p-2 rounded-sm">Finish</Text>
            </TouchableOpacity>
            {currentIndex < questions.length && (
              <TouchableOpacity
                onPress={() => {
                  if (currentIndex < questions.length) {
                    setCurrentIndex(currentIndex + 1);
                  }
                }}
                className="  text-white justify-center rounded-lg mr-3  mx-2">
                <Text className="text-white text-center text-3xl ">{'>'}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <TouchableOpacity
        className="bg-sky-600 rounded-full p-3 w-12 absolute bottom-10 right-5 justify-center items-center"
        onPress={() => setModalVisible(true)}>
        <Icon name="lightbulb" color="yellow" size={25} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View style={{backgroundColor: '#fff', width: '90%', padding: 20}}>
            <Text className="text-center text-black text-xl font-extrabold  ">
              The author name end with fullstop . The place name will ends with
              a colon : The edition name will ends with fullstop 2nd ed.
            </Text>

            <TouchableOpacity
              className="bg-gray-700 my-4 p-2 w-20 rounded-sm items-center self-center"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text className="text-white ">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* <FlatList
            ref={listRef}
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            onScroll={e => {
              const x = e.nativeEvent.contentOffset.x / width;
              setCurrentIndex((x + 1).toFixed(0));
            }}
            data={questions}
            renderItem={({item, index}) => {
              return <QuestionItem data={item} index={index} />;
            }}
          /> */

// const reset = () => {
//   const tempData = questions;
//   tempData.map((item, ind) => {
//     item.marked = -1;
//   });
//   let temp = [];
//   tempData.map(item => {
//     temp.push(item);
//   });
//   setQuestions(temp);
// };

// const getTextScore = () => {
//   let marks = 0;
//   quizes.map(item => {
//     if (item.marked !== -1 && item.options[item.marked] === item.correct) {
//       marks += 5;
//     }
//   });
//   return marks;
// };
