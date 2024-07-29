import React, {useEffect, useRef, useState} from 'react';
import {View, Animated, PanResponder, StyleSheet, Text} from 'react-native';

const DragableItem = ({value, onDrop, Measurments, reset, position}) => {
  const pan = useRef(new Animated.ValueXY(position)).current;
  const viewRef = useRef();
  const DropRef = useRef(Measurments);
  const [hasMeasuredInitialLayout, setHasMeasuredInitialLayout] =
    useState(false);
  const [staticViewPosition, setStaticViewPosition] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    DropRef.current = Measurments;
    pan.setValue({x: 0, y: 0});
  }, [Measurments]);

  useEffect(() => {
    pan.setValue(position || {x: 0, y: 0});
  }, [position]);

  useEffect(() => {
    if (reset) {
      Animated.spring(pan, {
        toValue: {x: 0, y: 0},
        useNativeDriver: false,
      }).start();
    }
  }, [reset]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        pan.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderRelease: (e, gestureState) => {
        // Logic for determining the drop area
        const Drop = DropRef.current.filter(
          item =>
            gestureState.moveX > item.startX &&
            gestureState.moveX < item.endX &&
            gestureState.moveY > item.startY &&
            gestureState.moveY < item.endY,
        );

        if (Drop.length) {
          const ind = DropRef.current.indexOf(Drop[0]);
          onDrop(gestureState.moveX, gestureState.moveY, value, ind);
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const handleLayout = event => {
    if (!hasMeasuredInitialLayout) {
      const {x, y} = event.nativeEvent.layout;
      setStaticViewPosition({top: y, left: x});
      setHasMeasuredInitialLayout(true);
    }
  };

  return (
    <>
      <Animated.View
        ref={viewRef}
        {...panResponder.panHandlers}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        style={[
          pan.getLayout(),
          styles.box,
          {
            zIndex: 1,
            marginHorizontal: 8,
            alignItems: 'center',
            opacity: 0.8,
          },
        ]}
        onLayout={handleLayout}>
        <View style={[styles.triangle, {opacity: 0.8}]}></View>
        <Text style={{color: 'white', fontSize: 18, marginHorizontal: 5}}>
          {value}
        </Text>
      </Animated.View>
      <View
        style={[
          styles.box,
          {
            position: 'absolute',
            top: staticViewPosition.top,
            left: staticViewPosition.left,
            zIndex: 0,
          },
        ]}>
        <View style={[styles.triangle]}></View>
        <Text style={{color: 'white', fontSize: 18, marginHorizontal: 5}}>
          {value}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    minWidth: 35,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FE5200',
    borderRadius: 3,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgb(254, 82, 0)',
    backgroundColor: 'transparent',
    transform: [{rotate: '180deg'}],
    position: 'absolute',
    top: 28,
  },
});

export default DragableItem;
