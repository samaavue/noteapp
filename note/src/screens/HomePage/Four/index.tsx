
import React from 'react';
import { View, Text, Image,TouchableOpacity } from 'react-native';


export default function Four() {
  return (
    <TouchableOpacity>
      <Image 
        style={{ height: 30, width: 30 ,marginTop:10,borderWidth:1,borderRadius:30,backgroundColor:'#323232'}}
        source={{ uri: 'https://i.ibb.co/80wgvtk/more-fill.png' }}
      />
    </TouchableOpacity>
  );
}
