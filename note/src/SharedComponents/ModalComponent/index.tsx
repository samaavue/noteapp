import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Animated, Dimensions, Image } from 'react-native';

interface ModalComponentProps {
  visible: boolean;
  onClose: () => void;
  onSave: (text: string, color: string) => void;
  initialText: string;
  initialColor: string;
}

const colors = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#C9BAFF', '#FFBABA'];

const ModalComponent: React.FC<ModalComponentProps> = ({ visible, onClose, onSave, initialText, initialColor }) => {
  const [slideAnim] = useState(new Animated.Value(0));
  const [text, setText] = useState(initialText);
  const [selectedColor, setSelectedColor] = useState(initialColor);

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const slideUp = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0], // Adjust these values as per your requirement
  });

  const handleSave = () => {
    onSave(text, selectedColor);
  };

  const { height } = Dimensions.get('window');

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
        <Animated.View style={{
          width: '100%',
          height: height,
          padding: 20,
          backgroundColor: 'black',
          transform: [{ translateY: slideUp }]
        }}>
          <TextInput style={{
            width: '100%',
            height: '40%',
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 10,
            color: 'white',
            padding: 10,
            fontSize: 18,
            backgroundColor: '#8758FF',
            marginBottom: 20
          }} placeholder="Enter your note" value={text} onChangeText={setText} multiline />
          <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
            {colors.map((color) => (
              <TouchableOpacity key={color} onPress={() => setSelectedColor(color)} style={{ margin: 10, alignItems: 'center' }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: color,
                    opacity: selectedColor === color ? 1 : 0.5,
                    borderWidth: selectedColor === color ? 2 : 0,
                    borderColor: 'white',
                    borderRadius: 25,
                  }}
                />
                <Text style={{ color: selectedColor === color ? 'white' : 'grey', marginTop: 5 }}>{color}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <TouchableOpacity onPress={handleSave}>
              <Image
                source={{ uri: 'https://i.ibb.co/0mX4qMS/save-line.png' }}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <Image
                source={{ uri: 'https://i.ibb.co/r6X8kJ4/close-circle-line.png' }}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ModalComponent;
