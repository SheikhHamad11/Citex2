import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DragableItem from './DragableItem';
const {width} = Dimensions.get('window');
// const symbols = ["<", ">", ",", "(", ")", ".", "{", "}", ":", ";", "!"];
const symbols = ['<', '>', ','];

export default function QuestionItem({data}) {
  const [droppedValue, setDroppedValue] = useState(null);
  const [measure1, setMeasure1] = useState({});
  const [measure2, setMeasure2] = useState({});
  const [measure3, setMeasure3] = useState({});

  const viewRef = useRef();
  const viewRef2 = useRef();
  const viewRef3 = useRef();

  useEffect(() => {
    console.log(measure1);
    const measureElement = () => {
      if (viewRef.current && !Object.keys(measure1).length) {
        console.log(true);
        viewRef.current.measure((x, y, width, height, pageX, pageY) => {
          console.log(' viewRef.current.measure', {
            x,
            y,
            width,
            height,
            pageX,
            pageY,
          });
          const startX = pageX;
          const startY = pageY;
          console.log(pageY);
          const endX = pageX + width;
          const endY = pageY + height;
          console.log({startX, startY, endX, endY});
          setMeasure1({startX, startY, endX, endY});
        });
      }
      if (viewRef2.current && !Object.keys(measure2).length) {
        viewRef2.current.measure((x, y, width, height, pageX, pageY) => {
          const startX = pageX;
          const startY = pageY;
          const endX = pageX + width;
          const endY = pageY + height;
          setMeasure2({startX, startY, endX, endY});
        });
      }
      if (viewRef3.current && !Object.keys(measure3).length) {
        viewRef3.current.measure((x, y, width, height, pageX, pageY) => {
          const startX = pageX;
          const startY = pageY;
          const endX = pageX + width;
          const endY = pageY + height;
          setMeasure3({startX, startY, endX, endY});
        });
      }
    };
    const timeoutId = setTimeout(measureElement, 2000);

    return () => clearTimeout(timeoutId);
  }, [viewRef, viewRef2, viewRef3]);

  const handleDrop = (x, y, value) => {
    console.log(value, x, y);

    const {startX, startY, endX, endY} = measure1;
    const {startY: startY2, endX: endX2, endY: endY2} = measure2;
    const {
      startX: startX3,
      startY: startY3,
      endX: endX3,
      endY: endY3,
    } = measure3;

    if (
      !(x > startX && x < endX && y > startY && y < endY) ||
      !(x > startX2 && x < endX2 && y > startY2 && y < endY2) ||
      !(x > startX3 && x < endX3 && y > startY3 && y < endY3)
    ) {
      setDroppedValue(value);
    }
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
              item={item}
              value="Drag Me one more time!"
              measure1={measure1}
              measure2={measure2}
              measure3={measure3}
              onDrop={handleDrop}
            />
          </>
        ))}
        <View ref={viewRef} style={styles.dropZone}>
          <Text style={styles.dropZoneText}>{'Box 1'}</Text>
        </View>

        <View ref={viewRef2} style={styles.dropZone}>
          <Text style={styles.dropZoneText}>Box 2</Text>
        </View>

        <View ref={viewRef3} style={styles.dropZone}>
          <Text style={styles.dropZoneText}>Box 3</Text>
        </View>
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
        {data?.blank?.map((item, index) => (
          <OptionList data={item} />
        ))}
      </View>
    </View>
  );
}

export const OptionList = ({data}) => {
  return (
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
    // backgroundColor: "lightgray",
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
