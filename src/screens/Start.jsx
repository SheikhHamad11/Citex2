import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {quizes} from '../components/Quiz';
import QuestionItem from './components/QuestionItem';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BModal from '../components/BModal';
import Loading from '../components/Loading';

export default function Start({route}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState(quizes);
  const [modalVisible, setModalVisible] = useState(false);
  const [questionsData, setquestionsData] = useState();
  const [loading, setloading] = useState(false);
  const {id} = route.params;
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
        question_class: 'harvard',
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
          console.log({res});
          setloading(false);
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      setloading(false);
      console.log({error});
    }
  };

  if (loading) {
    return <Loading />;
  }
  return questionsData?.questions ? (
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
          questionsData={questionsData}
        />
      </View>
      <TouchableOpacity
        className="bg-sky-600 rounded-full p-3 w-12 absolute bottom-10 right-5 justify-center items-center"
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
