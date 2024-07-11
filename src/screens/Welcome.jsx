import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
// import {useRouter} from 'expo-router';
import {Picker} from '@react-native-picker/picker';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function Welcome() {
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
