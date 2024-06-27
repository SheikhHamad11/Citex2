import { View, Text } from 'react-native'
import React from 'react'

export default function Blank() {
  return (
    <View style={{ backgroundColor: "#003644", flex: 1 }}>
      <Text className="text-white text-lg text-center font-bold mt-5">No questions found in selected category/sub-category.Please change category or question type.</Text>
    </View>
  )
}