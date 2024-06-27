import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

export default function Citation() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  return (
    <View className="flex-1" style={{backgroundColor: '#003644'}}>
      <Text className="text-white text-xl text-center font-bold mt-10">
        SELECT CATEGORY
      </Text>
      <TouchableOpacity
        className="bg-white w-30 h-12 rounded-lg mt-4 mx-6 flex flex-row items-center "
        onPress={() => navigation.navigate('Blank')}>
        <View
          className="justify-center w-14"
          style={{backgroundColor: '#0688A3'}}>
          <Icon
            name="user"
            style={{
              color: 'white',
              fontSize: 30,
              padding: 10,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
          />
        </View>
        <Text className="text-xl text-black font-extrabold   ml-2 justify-center items-center">
          Single Author
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-white w-30 h-12 rounded-lg mt-4 mx-6 flex flex-row items-center "
        onPress={() => navigation.navigate('Blank')}>
        <View className="justify-center" style={{backgroundColor: '#0688A3'}}>
          <Icon
            name="users"
            style={{color: 'white', fontSize: 30, padding: 10}}
          />
        </View>
        <Text className="text-xl text-black font-extrabold   ml-2 justify-center items-center">
          Two Authors
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-white w-30 h-12 rounded-lg mt-4 mx-6 flex flex-row items-center "
        onPress={() => navigation.navigate('Blank')}>
        <View className="justify-center" style={{backgroundColor: '#0688A3'}}>
          <Icon
            name="users"
            style={{color: 'white', fontSize: 30, padding: 10}}
          />
        </View>
        <Text className="text-xl text-black font-extrabold   ml-2 justify-center items-center">
          Three Authors
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-white w-30 h-12 rounded-lg mt-4 mx-6 flex flex-row items-center"
        onPress={() => navigation.navigate('Blank')}>
        <View className="justify-center" style={{backgroundColor: '#0688A3'}}>
          <Icon
            name="users"
            style={{color: 'white', fontSize: 30, padding: 10}}
          />
        </View>
        <Text className="text-xl text-black font-extrabold   ml-2 justify-center items-center">
          More Than Three Authors
        </Text>
      </TouchableOpacity>
    </View>
  );
}
