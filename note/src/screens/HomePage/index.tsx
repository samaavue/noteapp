import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileComp from './ProfileComp';
import Four from './Four';
import ExtraText from './ExtraText';
import FilterBar from './FilterBar';
import Tabs from './Tabs';
import BottomNavBar from '../../SharedComponents/BottomNavBar';
import ModalComponent from '../../SharedComponents/ModalComponent';

export default function HomePage() {
  const [lastTap, setLastTap] = useState(null);
  const timerRef = useRef(null);
  const [textItems, setTextItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [noteFilter, setNoteFilter] = useState('All');
  const [selectedFilter, setSelectedFilter] = useState('General');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');

  const handleDoubleTap = (index) => {
    const newTextItems = [...textItems];
    newTextItems.splice(index, 1);
    setTextItems(newTextItems);
  };

  const handleTap = (index) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300; // milliseconds

    if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
      clearTimeout(timerRef.current);
      handleDoubleTap(index);
    } else {
      setLastTap(now);
      timerRef.current = setTimeout(() => {
        console.log('Single tapped!');
      }, DOUBLE_PRESS_DELAY);
    }
  };

  const handleLongPress = (index) => {
    setCurrentNote(index);
    setEditedText(textItems[index].text);
    setSelectedColor(textItems[index].color);
    setEditMode(true);
    setModalVisible(true);
  };

  const handleSave = (text, color) => {
    const newTextItems = [...textItems];
    newTextItems[currentNote] = { text, color };
    setTextItems(newTextItems);
    setEditMode(false);
    setModalVisible(false);
    setCurrentNote(null);
    setEditedText('');
    setSelectedColor('#FFFFFF');
  };

  const handleCancel = () => {
    setEditMode(false);
    setModalVisible(false);
    setCurrentNote(null);
    setEditedText('');
    setSelectedColor('#FFFFFF');
  };

  const { width, height } = Dimensions.get('window');

  const handleAddText = (text) => {
    setTextItems([...textItems, { text, color: '#FFFFFF' }]);
  };

  const filteredTextItems = noteFilter === 'All' ? textItems : textItems.filter(item => item.filter === noteFilter);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      {editMode ? (
        <ModalComponent
          visible={modalVisible}
          onClose={handleCancel}
          onSave={handleSave}
          initialText={editedText}
          initialColor={selectedColor}
        />
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <ProfileComp />
              <Four />
            </View>
            <Text style={{ color: 'white', fontSize: 50, marginTop: 20, marginLeft: 10 }}>Minhas</Text>
            <Text style={{ color: 'white', fontSize: 50, marginLeft: 10 }}>Notas</Text>
            <FilterBar onSelectFilter={setNoteFilter} />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
              {filteredTextItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleTap(index)}
                  onLongPress={() => handleLongPress(index)}
                >
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: 'white',
                      margin: 10,
                      padding: 10,
                      borderRadius: 5,
                      width: width / 2 - 30,
                      height: height / 2 - 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: item.color,
                      borderRadius:30
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>{item.text}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <BottomNavBar onAddText={handleAddText} />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
