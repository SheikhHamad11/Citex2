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
    <View style={{backgroundColor: '#003744', paddingBottom: 50, flex: 1}}>
      <View className="my-24 justify-center items-center self-center">
        <Image
          source={require('../images/logo1.png')}
          style={{height: 100, width: 300}}
        />
      </View>
      <Text className="text-white text-xl text-center font-bold mb-5">
        Please select your citation style
      </Text>
      <View className="bg-white w-30 h-12 rounded-lg mt-4 mx-6 justify-center">
        <Picker
          itemStyle={{fontWeight: 'bold'}}
          style={{color: 'black', fontWeight: 'bold'}}
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          <Picker.Item label={'HARVARD'} value="java" />
          <Picker.Item label="MLA" value="js" />
          <Picker.Item label="APA" value="python" />
          <Picker.Item label="CHICAGO" value="csharp" />
          <Picker.Item label="MHRA" value="ruby" />
        </Picker>
      </View>

      <Types
        onPress={() => navigation.navigate('Categories')}
        icon="bars"
        text="Reference List"
      />

      <Types
        onPress={() => navigation.navigate('Citation')}
        icon="download"
        text="In-text citation"
      />
    </View>
  );
}

const Types = ({onPress, icon, text}) => {
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
