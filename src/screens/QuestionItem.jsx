import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DragableItem from './DragableItem';
import useMeasure from '../components/useMeasurment';
const {width} = Dimensions.get('window');
const symbols = ['<', '>', ',', '(', ')', '.', '{', '}', ':', ';', '!'];

export default function QuestionItem({data}) {
  const [droppedValue, setDroppedValue] = useState(null);
  const counts = data?.blank.filter(item => item.includes('___'));
  const [viewRefs, Measurments] = useMeasure(counts.length);
  const [DragIndex, setDragIndex] = useState(0);
  // let DropBoxIndex = 0;

  const handleDrop = (x, y, value) => {
    console.log(value, x, y);

    // const {startX, startY, endX, endY} = measure1;
    // const {startY: startY2, endX: endX2, endY: endY2} = measure2;
    // const {
    //   startX: startX3,
    //   startY: startY3,
    //   endX: endX3,
    //   endY: endY3,
    // } = measure3;

    // if (
    //   !(x > startX && x < endX && y > startY && y < endY) ||
    //   !(x > startX2 && x < endX2 && y > startY2 && y < endY2) ||
    //   !(x > startX3 && x < endX3 && y > startY3 && y < endY3)
    // ) {
    //   setDroppedValue(value);
    // }
  };

  return (
    <View style={{width: width}}>
      <Text
        style={{
          marginHorizontal: 10,
          textAlign: 'justify',
          color: 'white',
          marginTop: 10,
        }}>
        {data?.question}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 15,
          marginTop: 3,
          zIndex: 100,
        }}>
        {symbols.map(item => (
          <>
            <DragableItem
              key={item}
              value={item}
              Measurments={Measurments}
              onDrop={handleDrop}
            />
          </>
        ))}
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: 3,
          width: width,
        }}>
        {data.options.map(item => (
          <TouchableOpacity
            key={item}
            style={{
              elevation: 3,
              alignSelf: 'center',
              backgroundColor: '#088DAA',
              margin: 10,
              justifyContent: 'center',
              paddingHorizontal: 15,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                marginVertical: 1,
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={[styles.textContainer]}
        className="flex-row justify-center  flex-wrap">
        <Text>
          {data?.blank?.map((item, index) => (
            <>
              {console.log(DragIndex)}
              <OptionList
                key={index}
                data={item}
                viewRefs={viewRefs}
                index={DragIndex}
                setDragIndex={setDragIndex}
              />
            </>
          ))}
        </Text>
      </View>
    </View>
  );
}

export const OptionList = ({data, viewRefs, index, setDragIndex}) => {
  useEffect(() => {
    data.includes('___') && setDragIndex(prev => prev++);
  }, [data]);
  return data.includes('___') ? (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginHorizontal: 10,

        marginTop: 10,
        height: 30,
      }}
      ref={viewRefs.current[index]}>
      <Text style={{color: 'white', textAlign: 'justify'}}>{data}</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {},
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
    color: 'green',
    textAlign: 'center',
    marginTop: 20,
  },
});
