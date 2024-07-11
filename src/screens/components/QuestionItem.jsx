import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import DragableItem from './DragableItem';
import useMeasure from '../../components/useMeasurment';
import DragableOptions from './DragableOptions';

const {width} = Dimensions.get('window');
// const symbols = ['<', '>', ',', '(', ')', '.', '{', '}', ':', ';', '!'];
const symbols = ['<', '>', ',', '.', '{', '}'];
export default function QuestionItem({data, index, reset}) {
  const [count, setCount] = useState(data?.blank?.length);
  const [viewRefs, Measurments, droppedSymbols, setDroppedSymbols] = useMeasure(
    count,
    index,
  );
  const [dragPositions, setDragPositions] = useState(
    symbols.map(() => ({x: 0, y: 0})),
  );

  useEffect(() => {
    setCount(data?.blank?.length);
  }, [data]);

  useEffect(() => {
    if (reset) {
      resetSymbols();
    }
  }, [reset]);

  const handleDrop = (x, y, value, index, dragindex) => {
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
  const resetSymbols = () => {
    setDragPositions(symbols.map(() => ({x: 0, y: 0})));
    setDroppedSymbols(new Array(count).fill('')); // Reset dropped symbols to empty strings
  };

  return (
    <View style={{width: width}}>
      <Text style={styles.quiz}>{data?.question}</Text>
      <View style={styles.symbols}>
        {symbols.map((item, index) => (
          <DragableItem
            key={item}
            value={item}
            Measurments={Measurments}
            onDrop={(x, y, value, ind) => handleDrop(x, y, value, ind, index)}
            position={dragPositions[index]}
            reset={reset}
          />
        ))}
      </View>

      <View style={styles.options}>
        {data?.options?.map((item, optionIndex) => (
          <DragableOptions
            key={optionIndex}
            item={item}
            value="Drag Me one more time!"
            Measurments={Measurments}
            onDrop={handleDrop}
            reset={reset}
          />
        ))}
      </View>
      <View
        style={styles.textContainer}
        className="flex-row justify-center  flex-wrap">
        <Text>
          {data?.blank?.map((item, index) => (
            <OptionList
              key={index}
              data={item}
              viewRefs={viewRefs}
              index={index}
              droppedSymbols={droppedSymbols} // Add this prop
            />
          ))}
        </Text>
      </View>
    </View>
  );
}

export const OptionList = ({data, viewRefs, index, droppedSymbols}) => {
  const symbolValue = droppedSymbols[index];

  return data.includes('___') ? (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginHorizontal: 10,
        marginTop: 10,
      }}
      ref={viewRefs.current[index]}>
      <Text
        style={{
          color: 'white',
          fontSize: 20,
          lineHeight: 20,
          marginRight: 10,
          textAlign: 'justify',
        }}>
        <View
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: 2,
            paddingBottom: 5,
            minWidth: 40,
            justifyContent: 'center',
            alignItems: 'center',
            // lineHeight: 30,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
            }}>
            {symbolValue &&
            index === droppedSymbols.findIndex(item => item === symbolValue)
              ? symbolValue
              : ''}
          </Text>
        </View>
      </Text>
    </View>
  ) : (
    <Text
      style={{
        color: 'white',
        marginHorizontal: 10,
        textAlign: 'justify',
        marginTop: 10,
      }}>
      {data}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  quiz: {
    marginHorizontal: 10,
    textAlign: 'justify',
    color: 'white',
    fontSize: 15,
    marginTop: 10,
  },
  symbols: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginVertical: 10,
    zIndex: 100,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 3,
    width: '100%',
  },
  textContainer: {marginTop: 30},
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
