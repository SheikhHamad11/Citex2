import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import NewsPaper from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
export default function Categories({route}) {
  const {data, selectedValue} = route.params;
  // console.log('route.params', route);
  const navigation = useNavigation();
  {
    console.log(selectedValue);
  }
  return (
    <View className="flex-1" style={{backgroundColor: '#003644'}}>
      <Text className="text-white text-xl text-center font-bold mt-10">
        SELECT CATEGORY
      </Text>
      {data &&
        Object.entries(data).map(([key, val], index) => (
          <Category
            key={key}
            onPress={() =>
              navigation.navigate('Start', {id: key, selectedValue})
            }
            icon={val.icon.replace('fa-', '')}
            text={val.title}
          />
        ))}
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
