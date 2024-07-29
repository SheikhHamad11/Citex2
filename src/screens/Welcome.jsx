import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
// import {useRouter} from 'expo-router';
import {Picker} from '@react-native-picker/picker';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/Loading';
const {height} = Dimensions.get('window');
export default function Welcome() {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState('Harvard');
  const [data, setData] = useState();
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    getData();
  }, []);

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
          // console.log(result);
          seterror(null);
          setloading(false);
          setData(result);
        })
        .catch(error => {
          console.log('error1', error);
          setloading(false);
          seterror(error);
        });
    } catch (err) {
      setloading(false);
      console.log('error2', err);
      seterror(err);
    }
  };

  {
    error && console.log(error);
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
          style={{color: 'black'}}
          selectedValue={selectedValue}
          dropdownIconColor={'black'}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          <Picker.Item label={'HARVARD'} value="harvard" />
          <Picker.Item label="MLA" value="mla" />
          <Picker.Item label="APA" value="apa" />
          <Picker.Item label="CHICAGO" value="chicago" />
          <Picker.Item label="MHRA" value="mhra" />
        </Picker>
      </View>

      <Types
        onPress={() =>
          navigation.navigate('Categories', {
            data: data?.reference_cats,
            selectedValue,
          })
        }
        icon="list"
        text="Reference List"
      />

      <Types
        onPress={() =>
          navigation.navigate('Citation', {
            data: data?.citation_cats,
            selectedValue,
          })
        }
        icon="text-width"
        text="In-text citation"
      />

      {loading && (
        <View
          style={{
            position: 'absolute',
            flex: 1,
            // backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
            width: '100%',
            height: height,
          }}>
          <Loading />
        </View>
      )}

      {error && (
        <View
          style={{
            position: 'absolute',
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 1,
            width: '100%',
            height: height,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text className="text-white text-xl text-center ">
            {/* {'Error : Could not fetch data'} */}
            {error.toString()}
          </Text>
        </View>
      )}
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
