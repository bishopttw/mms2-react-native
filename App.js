import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View, Image, ImageBackground } from 'react-native';
import Todo from "./components/Todo";
import { SafeAreaView } from 'react-native/types_generated/index';

export default function App() {

  const[newTodo, setNewTodo] = useState('');
  const[todos, setTodos] = useState([]);

  let counter = 0;

  function handleInputchange(text){
    const  td = {todo: text, id: counter};
    setNewTodo(text);
  }

  function handleAddTodo(){
    setTodos(todos => [...todos, newTodo]);

    Alert.alert(
      'Add Todo',
      'Todo added successfully!',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ],
    );
  }

  function handleDeleteTodo(id){
    setTodos(ts => ts.filter(t => t.id !== id));
  }

  return (
    <SafeAreaView style={styles.app}>
    <View style ={styles.background}>
      <StatusBar style="auto"/>
      <ImageBackground style={styles.app} source={require('./assets/images/background.jpg')}>
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

      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('./assets/images/normalImg.jpg')}/>
      </View>

      </ImageBackground>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app:{
    flex: 1,
  },
  background:{
    flex: 1,
  },
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
  imageContainer:{
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: 'black',
  },
  image:{
    width: '100%',
    height: '100%'
  }
});
