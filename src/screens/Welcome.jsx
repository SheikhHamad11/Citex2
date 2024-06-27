import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
// import {useRouter} from 'expo-router';
import {Picker} from '@react-native-picker/picker';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function Welcome() {
  // const router = useRouter();
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState('Harvard');

  return (
    <View style={{backgroundColor: '#003744', flex: 1}}>
      <View className="mt-16 justify-center items-center self-center">
        <Image
          source={require('../images/logo.png')}
          style={{height: 200, width: 200}}
        />
      </View>
      <Text className="text-white text-xl text-center font-bold">
        Please select your citation style
      </Text>
      <View className="bg-white w-30 h-12 rounded-lg mt-4 mx-6 justify-center">
        <Picker
          style={{fontWeight: '900', color: 'black'}}
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          <Picker.Item label="HARWARD" value="java" />
          <Picker.Item label="MLA" value="js" />
          <Picker.Item label="APA" value="python" />
          <Picker.Item label="CHICAGO" value="csharp" />
          <Picker.Item label="MHRA" value="ruby" />
        </Picker>
      </View>
      <TouchableOpacity
        className="bg-white w-30 h-12 rounded-lg mt-4 mx-6 flex flex-row items-center "
        onPress={() => navigation.navigate('Categories')}>
        <View className="justify-center" style={{backgroundColor: '#0688A3'}}>
          <Icon
            name="bars"
            style={{color: 'white', fontSize: 30, padding: 10}}
          />
        </View>
        <Text className="text-xl font-extrabold text-black   ml-2 justify-center items-center">
          Reference List
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-white w-30 h-12 rounded-lg mt-4 mx-6 flex flex-row items-center "
        onPress={() => navigation.navigate('Citation')}>
        <View className="justify-center" style={{backgroundColor: '#0688A3'}}>
          <Icon
            name="download"
            style={{color: 'white', fontSize: 30, padding: 10}}
          />
        </View>
        <Text className="text-xl text-black font-extrabold  ml-2 justify-center items-center">
          In-text citation
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// const App = () => {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
// <MainScreen/>
//     </GestureHandlerRootView>
//   );
// };

// export default App;

// MainScreen.js
// import React, { useState } from 'react';
// import { View, Modal, Text, StyleSheet } from 'react-native';
// import { PanGestureHandler, State } from 'react-native-gesture-handler';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

// const MainScreen = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const translation = useSharedValue({ x: 0, y: 0 });

//   const targetPosition = { x: 100, y: 100 }; // Set your target position

//   const onGestureEvent = Animated.event(
//     [{ nativeEvent: { translationX: translation.x, translationY: translation.y } }],
//     { useNativeDriver: false }
//   );

//   const onHandlerStateChange = event => {
//     if (event.nativeEvent.state === State.END) {
//       if (Math.abs(translation.value.x - targetPosition.x) < 10 && Math.abs(translation.value.y - targetPosition.y) < 10) {
//         setModalVisible(true);
//       }
//       translation.value = { x: withSpring(0), y: withSpring(0) }; // Reset position
//     }
//   };

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [
//       { translateX: translation.value.x },
//       { translateY: translation.value.y }
//     ]
//   }));

//   return (
//     <View style={styles.container}>
//       <PanGestureHandler
//         onGestureEvent={onGestureEvent}
//         onHandlerStateChange={onHandlerStateChange}
//       >
//         <Animated.View style={[styles.draggable, animatedStyle]}>
//           <Text>Drag me!</Text>
//         </Animated.View>
//       </PanGestureHandler>

//       <View style={[styles.target, { left: targetPosition.x, top: targetPosition.y }]}>
//         <Text>Target</Text>
//       </View>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>Matched!</Text>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   draggable: {
//     width: 100,
//     height: 100,
//     backgroundColor: 'skyblue',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   target: {
//     width: 100,
//     height: 100,
//     backgroundColor: 'lightgreen',
//     position: 'absolute',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
// });
