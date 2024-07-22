import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default function BModal({modalVisible, setModalVisible}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            width: '80%',
            padding: 20,
            paddingVertical: 30,
          }}>
          <View className="border-b-black  border-b  my-0  pb-3">
            <Text className="text-center text-black text-3xl font-[900]">
              Format
            </Text>
          </View>
          <Text className="text-justify text-black text-lg font-extrabold  ">
            Author(s).Year of publication (in brackets) Book title in italics
            followed by a full stop. Edition(if not the first) e.g. 2nd ed.
            Place of publication followed by a colon: Publisher followed by a
            full stop.
          </Text>

          <TouchableOpacity
            className="my-2 w-8 h-8 rounded-full border-red-500  justify-center border-2  items-center absolute top-6 right-3"
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Icon name="times" color="red" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
