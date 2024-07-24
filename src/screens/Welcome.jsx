import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
// import {useRouter} from 'expo-router';
import {Picker} from '@react-native-picker/picker';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/Loading';

export default function Welcome() {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState('Harvard');
  const [data, setData] = useState();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  // Object.entries(data?.reference_cats).forEach(([key, value]) => {
  //   console.log(`Key: ${key}, Title: ${value.title}, Icon: ${value.icon}`);
  // });
  // console.log('data', data?.citation_cats);

  const getData = async () => {
    try {
      setloading(true);
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'text/plain');
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      await fetch(
        'https://citex.org.uk/citex-api.php?method=init_data',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result);
          setloading(false);

          setData(result);
        });
      setloading(false).catch(error => {
        console.log('error', error);
      });
    } catch (error) {
      setloading(false);
      console.log('error', error);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <View style={{backgroundColor: '#003744', paddingBottom: 50, flex: 1}}>
      <View className="my-16 justify-center items-center self-center">
        <Image
          source={require('../images/logoq.png')}
          style={{height: 200, width: 400}}
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
        onPress={() =>
          navigation.navigate('Categories', {data: data?.reference_cats})
        }
        icon="list"
        text="Reference List"
      />

      <Types
        onPress={() =>
          navigation.navigate('Citation', {data: data?.citation_cats})
        }
        icon="text-width"
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
