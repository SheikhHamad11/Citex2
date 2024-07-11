import React, {useEffect, useRef} from 'react';
import {View, Animated, PanResponder, StyleSheet, Text} from 'react-native';

const DragableItem = ({value, onDrop, Measurments, reset, position}) => {
  const pan = useRef(new Animated.ValueXY(position)).current;
  const viewRef = useRef();
  const DropRef = useRef(Measurments);
  useEffect(() => {
    DropRef.current = Measurments;
    pan?.current?.setValue({x: 0, y: 0});
  }, [Measurments, pan.current]);

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
        {value}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FE5200',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});

export default DragableItem;
