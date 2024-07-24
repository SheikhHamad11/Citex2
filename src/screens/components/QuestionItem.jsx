import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DragableItem from './DragableItem';
import useMeasure from '../../components/useMeasurment';
import DragableOptions from './DragableOptions';
import {quizes} from '../../components/Quiz';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {OptionsList} from './OptionsList';
import Loading from '../../components/Loading';
const {width} = Dimensions.get('window');
const symbols = ['<', '>', ',', '(', ')', '.', '{', '}', ':', ';', '!'];

export default function QuestionItem({
  data,
  index,
  setCurrentIndex,
  totalQuestions,
  questionsData,
}) {
  const [droppedSymbols, setDroppedSymbols] = useState([]);
  const [count, setCount] = useState(data?.blank?.length);

  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState({}); // new state to store correct answers
  const navigation = useNavigation();
  const [viewRefs, Measurments] = useMeasure(count, index, droppedSymbols);
  const [dragPositions, setDragPositions] = useState(
    symbols.map(() => ({x: 0, y: 0})),
  );
  const chunkSize = 6;

  useEffect(() => {
    setCount(data?.blank?.length);
  }, [data]);

  useEffect(() => {
    setCorrectAnswers(prevCorrectAnswers => ({
      ...prevCorrectAnswers,
      [index]: false,
    }));
  }, [index]);

  const filteredDroppedSymbols = droppedSymbols.filter(symbol => symbol !== '');

  const resetSymbols = () => {
    setDragPositions(symbols.map(() => ({x: 0, y: 0})));
    setDroppedSymbols(new Array(count).fill(''));
    setIsCorrect(null); // Reset dropped symbols to empty strings
    setCorrectAnswers({});
  };

  useEffect(() => {
    setDragPositions(symbols.map(() => ({x: 0, y: 0})));
    setDroppedSymbols(new Array(count).fill(''));
    setIsCorrect(null);
  }, [index]);

  const handleDrop = (x, y, value, index, dragindex) => {
    // alert(value);
    setDroppedSymbols(prevDroppedSymbols => {
      const newDroppedSymbols = [...prevDroppedSymbols];
      newDroppedSymbols[index] = value;
      return newDroppedSymbols;
    });

    // Reset symbol position to original position
    setDragPositions(positions => {
      const newPositions = [...positions];
      newPositions[dragindex] = {x: 0, y: 0}; // Reset symbol position
      return newPositions;
    });
  };

  const handleCheck = () => {
    // console.log('droppedSymbols', filteredDroppedSymbols);
    if (
      questionsData?.questions[index]?.answer.every(
        (symbol, index) => symbol === filteredDroppedSymbols[index],
      )
    ) {
      setIsCorrect(true);
      setCorrectAnswers(prevCorrectAnswers => ({
        ...prevCorrectAnswers,
        [index]: true,
      }));
    } else {
      setIsCorrect(false);
    }
  };

  const symbolsArray = new Array(2).fill(0);
  // console.log(questionsData?.questions[index]);

  let que = questionsData?.questions[index]?.question_text?.replace(
    /<|\/?p>/g,
    '',
  );

  return (
    <View style={{width: width}}>
      {/* <Text style={styles.quiz}>{data?.question}</Text> */}
      <Text style={styles.quiz}>{que}</Text>
      {symbolsArray.map((item, idx) => {
        return (
          <View key={idx} style={styles.symbols}>
            {symbols.map((item, index) => {
              if (index < (idx + 1) * chunkSize && index >= idx * chunkSize) {
                return (
                  <DragableItem
                    key={index}
                    value={item}
                    Measurments={Measurments}
                    onDrop={(x, y, value, ind) =>
                      handleDrop(x, y, value, ind, index)
                    }
                    position={dragPositions[index]}
                    reset={resetSymbols}
                  />
                );
              }
            })}
          </View>
        );
      })}

      <View style={styles.options}>
        {questionsData?.questions[index]?.confusing.map((item, optionIndex) => (
          <DragableOptions
            key={optionIndex}
            value={item}
            pastedOptions={filteredDroppedSymbols}
            // value="Drag Me one more time!"
            Measurments={Measurments}
            onDrop={(x, y, value, ind) => handleDrop(x, y, value, ind, index)}
            position={dragPositions[index]}
            reset={resetSymbols}
          />
        ))}
      </View>
      <View className="flex-row justify-center text-center mt-10 mx-5">
        <Text className="text-center">
          {questionsData?.questions[index]?.fixed.map((item, index) => (
            <OptionsList
              key={index}
              data={item}
              viewRefs={viewRefs}
              index={index}
              droppedSymbols={droppedSymbols} // Add this prop
            />
          ))}
        </Text>
      </View>
      <View className="flex justify-center flex-row mt-10 px-3">
        {index > 0 && (
          <TouchableOpacity
            onPress={() => {
              setCurrentIndex(index - 1);
            }}
            className="mx-2">
            <Text className="text-white text-center text-3xl ">{'<'}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          className="rounded-md  mx-2 p-2 bg-[#FD5500]"
          onPress={resetSymbols}>
          <Text className="mr-2 text-white rounded-sm text-base  font-bold text-center">
            Reset
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCheck}
          className="bg-teal-600 rounded-md items-center mx-2 p-2">
          <Text className="mr-2  text-white text-base  font-bold">Check</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-green-600 rounded-md  mx-2 p-2 items-center"
          onPress={() => {
            if (
              questionsData?.questions[index]?.answer.every(
                (symbol, index) => symbol === filteredDroppedSymbols[index],
              )
            ) {
              setIsCorrect(true);
              setCorrectAnswers(prevCorrectAnswers => ({
                ...prevCorrectAnswers,
                [index]: true,
              }));
              navigation.navigate('Result', {
                correctAnswers: {...correctAnswers, [index]: true},
                totalQuestions,
              });
            } else {
              setIsCorrect(false);
              navigation.navigate('Result', {correctAnswers, totalQuestions});
            }
          }}>
          <Text className="mr-2  text-white text-base font-bold rounded-sm">
            Finish
          </Text>
        </TouchableOpacity>

        {index < quizes.length - 1 && (
          <TouchableOpacity
            onPress={() => {
              setCurrentIndex(index + 1);
              if (isCorrect === null) {
                handleCheck();
              }
            }}
            className="  text-white justify-center rounded-lg mr-3  mx-2">
            <Text className="text-white text-center text-3xl ">{'>'}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="mt-5 items-center">
        {isCorrect === null ? (
          <Text className="text-2xl"></Text>
        ) : isCorrect ? (
          <Icon name="check" color="green" size={25} />
        ) : (
          <Icon name="times" color="red" size={25} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  quiz: {
    marginHorizontal: 10,
    textAlign: 'center',
    color: 'white',
    lineHeight: 25,
    fontSize: 16,
    marginTop: 10,
  },
  symbols: {
    flexDirection: 'row',
    gap: 0,
    justifyContent: 'center',
    marginVertical: 10,
    zIndex: 100,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 3,
    width: '100%',
  },

  dropZone: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginTop: 50,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  dropZoneText: {
    fontSize: 16,
    color: 'white',
  },
  droppedText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});
