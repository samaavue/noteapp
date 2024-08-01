import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, FlatList } from 'react-native';

export default function Tabs() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const addTodo = () => {
    if (text.trim()) {
      setTodos([...todos, text]);
      setText('');
    }
  };

  return (
    <View style={{ padding: 20, borderColor: 'white' }}>
      <Text style={{ fontSize: 24, color: 'white', marginBottom: 10 }}>Rotina da Manha</Text>
      <Image
        source={{ uri: 'https://i.ibb.co/g77M94S/heart-line.png' }}
        style={{ width: 50, height: 50, marginBottom: 20 }}
      />
      
      <TextInput
        style={{ borderWidth: 1, borderColor: 'grey', padding: 10, marginBottom: 10, color: 'white' }}
        placeholder="Add a new todo"
        placeholderTextColor="grey"
        value={text}
        onChangeText={setText}
      />
      
      <Button title="Add Todo" onPress={addTodo} />

      <FlatList
        data={todos}
        renderItem={({ item }) => <Text style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: 'grey', color: 'white' }}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}
