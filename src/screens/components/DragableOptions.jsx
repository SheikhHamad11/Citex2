import {View, Text, StyleSheet, Animated, PanResponder} from 'react-native';
import React, {useEffect, useRef} from 'react';

export default function DragableOptions({
  value,
  onDrop,
  Measurments,
  position,
  pastedOptions,
}) {
  // const pan = useRef(new Animated.ValueXY()).current;
  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const viewRef = useRef();
  const DropRef = useRef(Measurments);
  const ValueRef = useRef(value);

  useEffect(() => {
    if (value) ValueRef.current = value;
  }, [value]);

  useEffect(() => {
    DropRef.current = Measurments;
    pan.setValue({x: 0, y: 0});
  }, [Measurments]);

  useEffect(() => {
    pan.setValue(position || {x: 0, y: 0});
  }, [position]);

  // useEffect(() => {
  //   if (value) ValueRef.current = value;
  //   DropRef.current = Measurments;
  //   pan.setValue({x: 0, y: 0});
  //   pan.setValue(position);
  // }, [value, Measurments, position]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      // onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
      //   useNativeDriver: false,
      // }),
      onPanResponderMove: (e, gestureState) => {
        if (gestureState) {
          pan.setValue({x: gestureState.dx, y: gestureState.dy});
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        const Drop = DropRef.current.filter(
          item =>
            gestureState.moveX > item.startX &&
            gestureState.moveX < item.endX &&
            gestureState.moveY > item.startY &&
            gestureState.moveY < item.endY,
        );

        if (Drop.length) {
          // onDrop(gestureState.moveX, gestureState.moveY, value);
          const ind = DropRef.current.indexOf(Drop[0]);

          onDrop(
            gestureState?.moveX || 0,
            gestureState?.moveY,
            ValueRef?.current,
            ind,
          );
          // setIsDropped(true);
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;
  const index = pastedOptions.indexOf(value);
  if (index == -1)
    return (
      <Animated.View
        ref={viewRef}
        {...panResponder.panHandlers}
        style={[
          pan.getLayout(),
          styles.box,
          {
            zIndex: 1,
            marginHorizontal: 3,
          },
        ]}>
        <View style={styles.triangle}></View>
        <Text
          style={{
            color: 'white',
            fontSize: 14,
          }}>
          {value}
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
    borderRadius: 2,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#088DAA',
    backgroundColor: 'transparent',
    transform: [{rotate: '180deg'}],
    position: 'absolute',
    top: 30,
    // left: 25,
    // justifyContent:'center',
    alignSelf: 'center',
  },
});
