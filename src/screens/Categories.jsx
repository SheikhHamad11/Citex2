import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import NewsPaper from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
export default function Categories() {
  const navigation = useNavigation();
  return (
    <View className="flex-1" style={{backgroundColor: '#003644'}}>
      <Text className="text-white text-xl text-center font-bold mt-10">
        SELECT CATEGORY
      </Text>
      <Category
        onPress={() => navigation.navigate('Start')}
        icon="book"
        text="Book"
      />
      <Category
        onPress={() => navigation.navigate('NotFound')}
        icon="book"
        text="Edited Book"
      />
      <Category
        onPress={() => navigation.navigate('NotFound')}
        icon="book"
        text="Journal Article"
      />
      <Category
        onPress={() => navigation.navigate('NotFound')}
        icon="globe"
        text="Web Source"
      />
    </View>
  );
}

const Category = ({onPress, icon, text, navigation}) => {
  return (
    <TouchableOpacity
      className="bg-white w-30 h-12 rounded-lg mt-4 mx-6 flex flex-row items-center"
      onPress={onPress}>
      <View className="justify-center bg-[#0688A3] w-14 items-center">
        <Icon name={icon} style={{color: 'white', fontSize: 30, padding: 10}} />
      </View>
      <Text className="text-xl text-black font-[900]   ml-2 justify-center items-center">
        {text}
      </Text>
    </TouchableOpacity>
  );
};
