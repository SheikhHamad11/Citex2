import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Welcome from './src/screens/Welcome';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Start from './src/screens/Start';
import Citation from './src/screens/Citation';
import Categories from './src/screens/Categories';
import Result from './src/screens/Result';
import SplashScreen from 'react-native-splash-screen';
import AboutPage from './src/screens/About';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from './src/components/Modal';
import Contact from './src/screens/Contact';
import ShareResults from './src/screens/ShareResults';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);
  const Stack = createStackNavigator();
  const Title = () => {
    return (
      <Image
        className=""
        source={require('./src/images/logo.png')}
        style={{height: 50, width: 100}}
      />
    );
  };
  return (
    <NavigationContainer>
      {/* <Start /> */}
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: () => <Title />,
          // headerLeft: null,
          ...TransitionPresets.SlideFromRightIOS, // Smooth transition
          // headerMode: 'none', // Disable header animation

          headerRight: () => (
            <View style={{}}>
              <TouchableOpacity
                className="p-3 w-20 left-3  rounded-full justify-center items-center"
                onPress={() => setModalVisible(true)}>
                <Icon name="ellipsis-v" size={25} color="black" />
              </TouchableOpacity>
            </View>
          ),
        }}>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Citation" component={Citation} />
        <Stack.Screen name="AboutPage" component={AboutPage} />
        <Stack.Screen name="Contact" component={Contact} />

        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen
          name="Result"
          options={{headerLeft: null}}
          component={Result}
        />
        <Stack.Screen name="ShareResults" component={ShareResults} />
      </Stack.Navigator>
      <Header modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </NavigationContainer>
  );
}
