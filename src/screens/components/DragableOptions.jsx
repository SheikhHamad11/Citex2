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
  Measurments,
  item,
  reset,
}) {
  const pan = useRef(new Animated.ValueXY()).current;
  const viewRef = useRef();
  const DropRef = useRef(Measurments);
  useEffect(() => {
    DropRef.current = Measurments;
  }, [Measurments]);

  useEffect(() => {
    if (reset) {
      Animated.spring(pan, {
        toValue: {x: 0, y: 0},
        useNativeDriver: false,
      }).start();
    }
  }, [reset, pan]);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gestureState) => {
        const Drop = DropRef.current.filter(
          item =>
            gestureState.moveX > item.startX &&
            gestureState.moveX < item.endX &&
            gestureState.moveY > item.startY &&
            gestureState.moveY < item.endY,
        );

        if (Drop.length) {
          onDrop(gestureState.moveX, gestureState.moveY, value);
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
