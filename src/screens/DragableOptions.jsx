import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  PanResponder,
} from 'react-native';
import React, {useEffect, useRef} from 'react';

export default function DragableOptions({
  value,
  onDrop,
  measure1,
  measure2,
  measure3,
  item,
}) {
  const pan = useRef(new Animated.ValueXY()).current;
  const viewRef = useRef();
  const measureRef1 = useRef();
  const measureRef2 = useRef();
  const measureRef3 = useRef();
  useEffect(() => {
    measureRef1.current = measure1;
    // console.log({ measure });
  }, [measure1]);

  useEffect(() => {
    measureRef2.current = measure2;
  }, [measure2]);

  useEffect(() => {
    measureRef3.current = measure3;
  }, [measure3]);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gestureState) => {
        // console.log("Release:", gestureState.moveX, gestureState.moveY);
        // console.log("Measurement:", measure);

        const {startX, startY, endX, endY} = measureRef1.current;
        const {
          startX: startX2,
          startY: startY2,
          endX: endX2,
          endY: endY2,
        } = measureRef2.current;
        const {
          startX: startX3,
          startY: startY3,
          endX: endX3,
          endY: endY3,
        } = measureRef3.current;
        console.log({startX2, endX2, startY2, endY2});
        console.log(gestureState.moveX, gestureState.moveY);
        if (
          (measureRef3.current &&
            gestureState.moveX > startX3 &&
            gestureState.moveX < endX3 &&
            gestureState.moveY > startY3 &&
            gestureState.moveY < endY3) ||
          (measureRef2.current &&
            gestureState.moveX > startX2 &&
            gestureState.moveX < endX2 &&
            gestureState.moveY > startY2 &&
            gestureState.moveY < endY2) ||
          (measureRef1.current &&
            gestureState.moveX > startX &&
            gestureState.moveX < endX &&
            gestureState.moveY > startY &&
            gestureState.moveY < endY)
        ) {
          onDrop(gestureState.moveX, gestureState.moveY, value, item);
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;
  return (
    <Animated.View
      ref={viewRef}
      {...panResponder.panHandlers}
      style={[pan.getLayout(), styles.box]}>
      <Text style={{color: 'white', fontSize: 18, marginHorizontal: 5}}>
        {item}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  box: {
    elevation: 3,
    alignSelf: 'center',
    backgroundColor: '#088DAA',
    margin: 10,
    justifyContent: 'center',
    padding: 6,
  },
});
