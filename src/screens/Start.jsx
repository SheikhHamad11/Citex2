import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import QuestionItem from './components/QuestionItem';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BModal from '../components/BModal';
import Loading from '../components/Loading';

// const symbols = ['<', '>', ',', '(', ')', '.', '{', '}', ':', ';', '!'];
const symbols = [
  ['<', '>', ',', '(', ')', '.'],
  ['{', '}', ':', ';', '!'],
];
export default function Start({route}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [questionsData, setquestionsData] = useState();
  const [loading, setloading] = useState(false);
  const {id, selectedValue} = route.params;
  useEffect(() => {
    getQuestions(setquestionsData);
  }, []);

  const getQuestions = async setData => {
    try {
      setloading(true);
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'text/plain');

      var raw = {
        question_type: 'reference',
        subcategory: id,
        question_class: selectedValue,
      };

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow',
      };

      await fetch(
        'https://citex.org.uk/citex-api.php?method=fetch_data',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          let res = JSON.parse(result);
          res?.message && alert(res?.message);
          setData(res);
          // console.log({res});
          setloading(false);
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      setloading(false);
      console.log({error});
    }
  };

  const confusingOptions = questionsData?.questions
    ? questionsData?.questions[currentIndex]?.confusing
    : [];
  const correctOptions = questionsData?.questions
    ? questionsData?.questions[currentIndex]?.answer
    : [];
  const totalOptions = mergeAndShuffle(
    confusingOptions,

    filterArray(correctOptions),
  );

  if (loading) {
    return <Loading />;
  }
  return questionsData?.questions ? (
    <View className="flex-1  bg-[#003644] ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-5">
          <View className="flex flex-row justify-center items-center mx-2 mt-5">
            <Text className="mt-2 ml-4  font-[900]  text-xl text-white ">
              Question Number
              {' ' +
                (currentIndex + 1) +
                ' / ' +
                questionsData?.questions.length}
            </Text>
          </View>

          <QuestionItem
            index={currentIndex}
            totalOptions={totalOptions}
            setCurrentIndex={setCurrentIndex}
            totalQuestions={questionsData?.questions.length}
            questionsData={questionsData}
            symbols={symbols}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="bg-sky-600 rounded-full p-3 w-12 absolute bottom-5 right-2 justify-center items-center"
        onPress={() => setModalVisible(true)}>
        <Icon name="lightbulb" color="yellow" size={25} />
      </TouchableOpacity>

      <BModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  ) : (
    <View style={{backgroundColor: '#003644', flex: 1}}>
      <Text className="text-white text-lg text-center font-bold mt-5">
        {questionsData?.error}
      </Text>
    </View>
  );
}

const filterArray = items =>
  items.filter(
    item =>
      item !== '.' &&
      (/^[A-Za-z]+$/.test(item) ||
        /^[0-9]+$/.test(item.toString()) ||
        /^[A-Za-z0-9]+$/.test(item) ||
        /^[A-Za-z0-9\s.]+$/.test(item)),
  );

function mergeAndShuffle(array1, array2) {
  // Combine the two arrays

  const mergeData = [...array1, ...array2];
  const combinedArray = [...new Set(mergeData)];
  // Shuffle the combined array
  for (let i = combinedArray?.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combinedArray[i], combinedArray[j]] = [combinedArray[j], combinedArray[i]];
  }
  return combinedArray;
}
