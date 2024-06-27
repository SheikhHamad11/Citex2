import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import NewsPaper from 'react-native-vector-icons/FontAwesome5';
import Header from '../components/Modal';
import {useNavigation} from '@react-navigation/native';
export default function Categories() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  return (
    <View className="flex-1" style={{backgroundColor: '#003644'}}>
      <Text className="text-white text-xl text-center font-bold mt-10">
        SELECT CATEGORY
      </Text>
      <TouchableOpacity
        className="bg-white w-30 h-12 rounded-lg mt-4 mx-6 flex flex-row items-center "
        onPress={() => navigation.navigate('Start')}>
        <View className="justify-center" style={{backgroundColor: '#0688A3'}}>
          <Icon
            name="book"
            style={{color: 'white', fontSize: 30, padding: 10}}
          />
        </View>
        <Text className="text-xl text-black font-extrabold   ml-2 justify-center items-center">
          Book
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-white w-30 h-12 rounded-lg mt-4 mx-6 flex flex-row items-center "
        onPress={() => navigation.navigate('Blank')}>
        <View className="justify-center" style={{backgroundColor: '#0688A3'}}>
          <Icon
            name="book"
            style={{color: 'white', fontSize: 30, padding: 10}}
          />
        </View>
        <Text className="text-xl text-black font-extrabold   ml-2 justify-center items-center">
          Edited Book
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-white w-30 h-12 rounded-lg mt-4 mx-6 flex flex-row items-center "
        onPress={() => navigation.navigate('Blank')}>
        <View
          className="justify-center w-12"
          style={{backgroundColor: '#0688A3'}}>
          <NewsPaper
            name="newspaper"
            style={{color: 'white', fontSize: 30, padding: 10}}
          />
        </View>
        <Text className="text-xl text-black font-extrabold   ml-2 justify-center items-center">
          Journal Article
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-white w-30 h-12 rounded-lg mt-4 mx-6 flex flex-row items-center"
        onPress={() => navigation.navigate('Blank')}>
        <View className="justify-center" style={{backgroundColor: '#0688A3'}}>
          <Icon
            name="globe"
            style={{color: 'white', fontSize: 30, padding: 10}}
          />
        </View>
        <Text className="text-xl text-black font-extrabold   ml-2 justify-center items-center">
          Web Resource
        </Text>
      </TouchableOpacity>
    </View>
  );
}
