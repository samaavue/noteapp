import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export default function ProfileComp() {
  return (
    <TouchableOpacity>
        <View style={{flexDirection:'row'}}>
      <Image
        style={{
            
          height: 60,
          width: 60,
          marginLeft: 15,
          borderRadius: 50,
        }}
        source={{ uri: 'https://i.ibb.co/4WK1bZq/roarw.png' }}
      />
      <View style={{flexDirection:'col', marginTop:14 , marginLeft:10}}>
      <Text style={{fontSize:18 , color:'white'}}>User Name</Text>
      <Text style={{fontSize:13, color:'#3D3D3D'}}>User information</Text>
      </View>
      </View>
    </TouchableOpacity>
  );
}
