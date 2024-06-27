import { View, Text, Image } from 'react-native'
import React from 'react'

export default function AboutPage() {
  return (
    <View className=" flex-1" style={{backgroundColor: "#003644"}}>
       {/* <Text style={{fontSize:25,color:'#0688A3',fontWeight:'500'}}>About </Text> */}
      <Text className='text-center text-white text-xl font-bold my-3'>About</Text>
      <Text className="text-white text-base justify-center items-center text-justify       mx-3 ">Teaching and learning citation and referencing can be challenging. Despite continued efforts, many students fail to grasp the proper syntax and continue to cite incorrectly. This smartphone application aids towards the teaching and learning of referencing and citing academic work.
It offers a ‘hands-on’ approach of practice. Users drag and drop the components in the correct sequence, check its accuracy and upon completion of a set of exercises, email the results to their tutors.
The application incorporates all the five major styles of referencing (Harvard, MLA, APA Chicago and MHRA) and hence is not subject-specific. It has been developed and designed so that it is simple, convenient and easy to use. There are no requirements to register or log in and neither does it require any other details of the user.
It is, and will always remain free to use with no intrusive ads and given that it is not subject, institution, country or region-specific, it will find wide global appeal amongst anyone involved in academic writing.</Text>
    </View>
  )
}