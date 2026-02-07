import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Todo from "./components/Todo";

export default function App() {

  const[newTodo, setNewTodo] = useState('');
  const[todos, setTodos] = useState([]);

  function handleInputchange(text){
    setNewTodo(text);
  }

  function handleAddTodo(){
    setTodos(todos => [...todos, newTodo]);
  }

  function handleDeleteTodo(id){
    setTodos(ts => ts.filter(t => t.id !== id));
  }

  return (
    <View>
      <View style={styles.inputcontainer}>
        <TextInput onChangeText={handleInputchange}
        style={styles.inputStyle}/>
        <Button onPress={handleAddTodo} title="ADD TODO"/>
      </View>

      <ScrollView>
        <View style={styles.todoContainer}>
          {todos.map(todo => <Todo onDelete={handleDeleteTodo} key={todo.id} todo={todo}/>)}
        </View>
      </ScrollView>
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
  }
});
