import React, { useState } from 'react';
import { View, TouchableOpacity, Image, TextInput, Button, Text } from 'react-native';
import Modal from 'react-native-modal';

export default function BottomNavBar({ onAddText }) {
  const [selectedButton, setSelectedButton] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');

  const handleAddButtonPress = () => {
    setModalVisible(true);
  };

  const handleAddText = () => {
    if (inputText.trim()) {
      onAddText(inputText);
      setInputText('');
      setModalVisible(false);
    }
  };

  return (
    <View style={{
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 10,
    }}>
      <View style={{
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.5)', 
        borderRadius: 40,
        padding: 5,
      }}>
        <TouchableOpacity
          style={{
            width: 70,
            height: 70,
            borderRadius: 40,
            backgroundColor: selectedButton === 0 ? 'black' : 'rgba(128, 128, 128, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
          }}
          onPress={handleAddButtonPress}
        >
          <Image
            source={{ uri: 'https://i.ibb.co/GVcrg5R/add-line.png' }}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 70,
            height: 70,
            borderRadius: 40,
            backgroundColor: selectedButton === 1 ? 'black' : 'rgba(128, 128, 128, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
          }}
          onPress={() => setSelectedButton(1)}
        >
          <Image
            source={{ uri: 'https://i.ibb.co/Gd3X7M3/mic-line.png' }}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
      </View>
      
      <Modal
        isVisible={modalVisible}
        swipeDirection="down"
        onSwipeComplete={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View style={{
          backgroundColor: '#8758FF',
          padding: 22,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderColor: 'rgba(0, 0, 0, 0.1)',
        }}>
          <Text style={{ fontSize: 20, marginBottom: 12,color:'white' }}>Enter Text</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              backgroundColor: 'white',
              paddingHorizontal: 10,
              marginBottom: 10,
              width: '100%',
            }}
            placeholder="Enter text"
            value={inputText}
            onChangeText={setInputText}
          />
          
          <TouchableOpacity onPress={() => handleAddText("New Text")} style={{ marginTop: 20, alignSelf: 'center', padding: 10,  borderRadius: 10 }}>
              <Text style={{ color: 'white' }}>Add</Text>
            </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
