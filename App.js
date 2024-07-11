import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Home from './src/screens/Welcome';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Start from './src/screens/Start';
import Citation from './src/screens/Citation';
import Categories from './src/screens/Categories';
import Result from './src/screens/Result';
import SplashScreen from 'react-native-splash-screen';
import Welcome from './src/screens/Welcome';
import AboutPage from './src/screens/About';
import Blank from './src/screens/NotFound';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from './src/components/Modal';
import Contact from './src/screens/Contact';
import ShareResults from './src/screens/ShareResults';
import NotFound from './src/screens/NotFound';
export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);
  const Stack = createNativeStackNavigator();
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
          headerLeft: null,

          headerRight: () => (
            <View style={{marginEnd: 20}}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
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
        <Stack.Screen name="NotFound" component={NotFound} />
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="Result" component={Result} />
        <Stack.Screen name="ShareResults" component={ShareResults} />
      </Stack.Navigator>
      <Header modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </NavigationContainer>
  );
}
