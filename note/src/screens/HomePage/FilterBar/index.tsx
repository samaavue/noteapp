import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';

export default function FilterBar({ onSelectFilter }) {
  const filters = ['All', 'Todo', 'Important', 'General', 'Work', 'Personal', 'Shopping', 'Fitness'];
  const [pressedIndex, setPressedIndex] = useState(null);

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 10 }}>
      <View style={{ flexDirection: 'row' }}>
        {filters.map((filter, index) => {
          const isPressed = pressedIndex === index;
          return (
            <TouchableOpacity 
              key={index} 
              style={{ 
                paddingHorizontal: 20, 
                paddingVertical: 10, 
                borderColor: isPressed ? 'white' : 'grey', 
                borderWidth: 1, 
                borderRadius: 25, 
                marginRight: 10,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                backgroundColor: 'transparent'
              }}
              onPress={() => {
                setPressedIndex(index);
                onSelectFilter(filter);
              }}
            >
              <Text style={{ color: isPressed ? 'white' : 'grey', fontSize: 18 }}>{filter}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
