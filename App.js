import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const[newTodo, setNewTodo] = useState('');
  const[todos, setTodos] = useState([]);
  function handleInputchange(text){
    setNewTodo(text);
  }

  function handleAddTodo(){
    setTodos(todos => [...todos, newTodo]);
  }

  return (
    <View>
      <View style={styles.inputcontainer}>
        <TextInput onChangeText={handleInputchange}
        style={styles.inputStyle}/>
        <Button onPress={handleAddTodo} title="ADD TODO"/>
      </View>

      <View style={styles.todoContainer}>
        {
          todos.map(todo => <View style={styles.todo} key={todo}>
            <Text>{todo}</Text>
          </View>)
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputcontainer: {
    flexDirection: 'row',
    marginTop: 50
  },
  inputStyle:{
    flex:1,
    borderWidth: 2,
    fontSize: 25
  },
  todoContainer:{
    gap:15,
    alignItems: 'center',
    paddingTop: 20
  },
  todo: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    width: '80%',
  }
});
